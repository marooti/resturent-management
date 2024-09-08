import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'amazon-connect-streams';

@Injectable({
  providedIn: 'root'
})
export class AmazonConnectService {
  private ccpInitialized = false;
  private incomingChatSubject = new Subject<any>();
  public incomingChat$ = this.incomingChatSubject.asObservable();
  private processedChatIds = new Set<string>();
  private agentNameSubject = new Subject<string>();
  private callStateSubject = new Subject<{ chatId: string, state: string }>();
  private missedChats = new Set<string>();

  constructor() {}

  initializeCCP(ccpElement: HTMLElement): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.ccpInitialized) {
        connect.core.initCCP(ccpElement, {
          ccpUrl: "https://agent24-dev.my.connect.aws/ccp-v2", // Replace with your CCP URL
          loginPopup: false,
          loginPopupAutoClose: false,
          region: "us-east-1",
          ccpLoadTimeout: 150000,
        });

        // Subscribe to contact events
        connect.contact((contact: any) => {
          this.handleIncomingContact(contact);
        });

        // Subscribe to agent state changes
        connect.agent((agent: any) => {
          agent.onEnqueuedNextState(() => {
            console.log('Agent has enqueued the next state.');
            const nextState = agent.getNextState();
            if (nextState) {
              console.log('Next state selected:', nextState);
            }
          });
        });

        // Listen for contact view changes
        connect.core.onViewContact((event) => {
          const contactId = event.contactId;
          if (!contactId) {
            // Active contact is unset, handle the recall scenario
            console.log('No active contact. Performing recall...');
            this.handleRecall();
          } else {
            // A new contact is set as active
            this.updateContactView(contactId);
          }
        });

        console.log('CCP initialized successfully');
        this.ccpInitialized = true;
        resolve();
      } else {
        console.warn('CCP iframe already initialized');
        resolve();
      }
    });
  }

  handleIncomingContact(contact: any): void {
    const chatId = contact.getContactId();
    if (!chatId) {
      console.error('Contact ID not available');
      return;
    }

    if (!this.processedChatIds.has(chatId) || this.missedChats.has(chatId)) {
      contact.onIncoming(() => {
        if (!this.isCallActive()) {
          this.incomingChatSubject.next(contact);
        }
        this.processedChatIds.add(chatId);
        this.missedChats.delete(chatId);
      });
    }

    contact.onRefresh(() => {
      if (!this.processedChatIds.has(chatId) && !this.isCallActive()) {
        this.incomingChatSubject.next(contact);
        console.log('Contact refreshed:', contact);
      }
    });

    contact.onAccepted(() => {
      this.processedChatIds.add(chatId);
      this.callStateSubject.next({ chatId, state: 'Accepted' });
      localStorage.setItem('activeChatId', chatId);
    });

    contact.onRejected(() => {
      this.processedChatIds.add(chatId);
      this.callStateSubject.next({ chatId, state: 'Rejected' });
      this.missedChats.add(chatId);
      localStorage.removeItem('activeChatId');
    });

    contact.onMissed(() => {
      this.callStateSubject.next({ chatId: contact?.getContactId(), state: 'Missed' });
      this.missedChats.add(chatId);
      console.log('Contact missed by the agent');
      localStorage.removeItem('activeChatId');
    });

    contact.onEnded(() => {
      contact.clear();
      console.log('Contact ended and ACW cleared.');
    });
  }

  isCallActive(): boolean {
    let isActive = false;
    this.callStateSubject.subscribe(({ state }) => {
      isActive = state === 'Accepted';
    });
    return isActive;
  }

  acceptChat(contact: any): void {
    if (!contact || !contact.getContactId()) {
      console.error('Cannot accept chat: Contact does not exist.');
      return;
    }

    try {
      contact.accept();
      console.log('Chat accepted successfully');
      this.callStateSubject.next({ chatId: contact.getContactId(), state: 'Accepted' });
      localStorage.setItem('activeChatId', contact.getContactId());
    } catch (error) {
      console.error('Failed to accept chat', error);
    }
  }

  rejectChat(contact: any): void {
    if (!contact || !contact.getContactId()) {
      console.error('Cannot reject chat: Contact does not exist.');
      return;
    }

    try {
      contact.reject();
      console.log('Chat rejected successfully');
      this.callStateSubject.next({ chatId: contact.getContactId(), state: 'Rejected' });
      localStorage.removeItem('activeChatId');
    } catch (error) {
      console.error('Failed to reject chat', error);
    }
  }

  closeCurrentContact() {
    const activeChatId = localStorage.getItem('activeChatId');
    if (activeChatId) {
      connect.contact((contact) => {
        if (contact.getContactId() === activeChatId) {
          contact.clear({
            success: () => {
              console.log('Contact closed successfully');
              localStorage.removeItem('activeChatId');
              this.handleRecall();
            },
            failure: (err) => {
              console.error('Failed to close the contact:', err);
            }
          });
        }
      });
    } else {
      console.error('No active chat ID found in local storage.');
    }
}

handleRecall() {
  // Use connect.agent to subscribe to the agent initialization and get the Agent object
  connect.agent((agent) => {
    // Get the next available state for the agent
    const nextState = agent.getAgentStates().find(state => state.name === 'Available'); // Ensure the state name matches correctly

    if (nextState) {
      // Set the agent state to trigger recall
      agent.setState(nextState, {
        success: () => {
          console.log('Agent state set successfully to recall contact.');
        },
        failure: (err) => {
          console.error('Failed to set agent state:', err);
        }
      }, { enqueueNextState: false }); // The enqueueNextState option is provided separately as the third argument
    } else {
      console.error('No available state found for the agent.');
    }
  });
}




  setAgentNextState(agent: any, nextState: any) {
    try {
      agent.setState(nextState, { enqueueNextState: true });
      console.log('Next state enqueued for the agent:', nextState);
    } catch (error) {
      console.error('Failed to set next state for the agent', error);
    }
  }

  getAgentName$() {
    return this.agentNameSubject.asObservable();
  }

  getCallState$() {
    return this.callStateSubject.asObservable();
  }

  resetContactView() {
    console.log('Contact view reset.');
  }

  updateContactView(contactId: string) {
    console.log('Contact view updated for contact:', contactId);
  }
}