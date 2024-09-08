import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { CallStateService } from '@services/CallState.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
declare var connect: any;

@Component({
  selector: 'app-chat-land',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './chat-land.component.html',
  styleUrl: './chat-land.component.scss',
  providers: [MessageService]
})
export class ChatLandComponent implements OnInit {
  tabItems!: MenuItem[];
  currentContact: any;
  recallContactId: string | null = null;
  isCallAccepted: boolean = false;
  isCallMissed: boolean = false;
  isIncomingCall: boolean = false;
  endChatMessage: string | null = null;

  constructor(private callStateService: CallStateService, private toastr: MessageService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initCCP();
    this.fillMenu();
    this.subscribeToCallState();
    this.checkForMissedCall();
  }

  fillMenu() {
    this.tabItems = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/'] },
      { label: 'Profile', icon: 'pi pi-user', routerLink: ['/profile'] },
      { label: 'Settings', icon: 'pi pi-cog', routerLink: ['/settings'] }
    ];
  }

  initCCP(): void {
    const containerDiv = document.getElementById('ccpContainer');

    if (containerDiv) {
      try {
        connect.core.initCCP(containerDiv, {
          ccpUrl: 'https://agent24-dev.my.connect.aws/ccp-v2',
          loginPopup: true,
          region: 'us-east-1',
          softphone: {
            allowFramedSoftphone: true
          }
        });
      } catch (error) {
        console.error('Error initializing CCP:', error);
      }
    } else {
      console.error('CCP container not found');
    }

    this.checkForActiveContact();

    connect.contact((contact: { contactId: any; getStatus: () => { (): any; new(): any; type: any; }; onConnected: (arg0: () => void) => void; onAccepted: (arg0: () => void) => void; onEnded: (arg0: () => void) => void; onMissed: (arg0: () => void) => void; getContactId: () => string | null; }) => {
      this.currentContact = contact;
      if (contact.contactId) {
        this.callStateService.setCallMissed(true);
      }
      const contactState = contact.getStatus().type;
      console.log("contactState", contact.getStatus().type)
      if (contactState === connect.ContactStateType.INCOMING || contactState === connect.ContactStateType.CONNECTING) {
        this.callStateService.setIncomingCall(true);
        this.callStateService.setCallMissed(false);

      }

      // this.callStateService.setIncomingCall(true);

      contact.onConnected(() => {
        console.log('Contact connected');
        this.callStateService.setIncomingCall(false);
      });

      contact.onAccepted(() => {
        console.log('Contact accepted');
        this.callStateService.setCallAccepted(true);
        this.callStateService.setCallMissed(false);
        this.callStateService.setIncomingCall(false);
        this.callStateService.setRecallContactId(null);
        this.toastr.add({ severity: 'success', summary: 'Success', detail: 'Chat Accepted', });

      });

      contact.onEnded(() => {
        console.log('Contact ended');
        this.callStateService.setCallAccepted(false);
        this.callStateService.setIncomingCall(false);
        // this.callStateService.setCallMissed(false);
        this.callStateService.setEndChatNotification('Customer has left the chat.');
        this.toastr.add({ severity: 'info', summary: 'Info', detail: 'Customer has left the chat', sticky: true });

      });

      contact.onMissed(() => {
        console.log('Contact missed');
        this.callStateService.setCallMissed(true);
        this.callStateService.setCallAccepted(false);
        this.callStateService.setIncomingCall(false);
        this.callStateService.setRecallContactId(contact.getContactId());
      });
    });
  }


  checkForActiveContact(): void {
    connect.agent((agent: { getContacts: () => any; }) => {
      const contacts = agent.getContacts();
      contacts.forEach((contact: { getStatus: () => { (): any; new(): any; type: any; }; }) => {
        const contactState = contact.getStatus().type;
        if (contactState === connect.ContactStateType.CONNECTED) {
          this.currentContact = contact;
          this.callStateService.setCallAccepted(true);
          this.callStateService.setCallMissed(false);
        }
        if (contact.getStatus().type === connect.ContactStateType.CONNECTED) {
          this.currentContact = contact;
          this.callStateService.setCallAccepted(true);
        }
        if (contact.getStatus().type === connect.ContactStateType.MISSED) {
          this.currentContact = contact;
          this.callStateService.setCallMissed(true);
        }
      });
    });
  }

  checkForMissedCall(): void {
    if (this.isCallMissed) {
      this.callStateService.setIncomingCall(false);
    }
  }

  setAgentAvailable(): void {
    connect.agent((agent: { getAgentStates: () => any[]; setState: (arg0: any, arg1: { success: () => void; failure: (err: any) => void; }) => void; }) => {
      const availableState = agent.getAgentStates().find((state: { name: string; }) => state.name === 'Available');
      if (availableState) {
        agent.setState(availableState, {
          success: () => {
            console.log('Agent state set to Available');
            this.callStateService.resetState();
            this.checkForActiveContact();
          },
          failure: (err: any) => {
            console.error('Failed to set agent state:', err);
          }
        });
      } else {
        console.error('Available state not found');
      }
    });
  }

  acceptCall(): void {
    if (this.currentContact) {
      this.currentContact.accept({
        success: () => {
          console.log('Call accepted');
          this.callStateService.setCallAccepted(true);
          this.callStateService.setCallMissed(false);
          this.callStateService.setIncomingCall(false);
          this.callStateService.setRecallContactId(null);
          this.isCallAccepted = true;
          this.cd.markForCheck();
        },
        failure: (error: any) => {
          console.error('Error accepting call:', error);
        }
      });
    }
  }

  rejectCall(): void {
    if (this.currentContact) {
      this.callStateService.setRecallContactId(this.currentContact.getContactId());
      this.currentContact.reject({
        success: () => {
          console.log('Call rejected');
          this.callStateService.setCallMissed(true);
          this.callStateService.setCallAccepted(false);
          this.callStateService.setIncomingCall(false);
        },
        failure: (error: any) => {
          console.error('Error rejecting call:', error);
        }
      });
    }
  }

  endCall(): void {
    if (this.currentContact) {
      const agentConnection = this.currentContact.getAgentConnection();
      if (agentConnection) {
        agentConnection.destroy({
          success: () => {
            console.log('Call ended');
            this.callStateService.setCallAccepted(false);
            this.callStateService.setIncomingCall(false);
            // this.callStateService.setEndChatNotification('Customer has left the chat.');
            // this.toastr.add({ severity: 'info', summary: 'Info', detail: 'Customer has left the chat', sticky: true });
          },
          failure: (error: any) => {
            console.error('Error ending call:', error);
          }
        });
      } else {
        console.error('No agent connection found to end the call');
      }
    }
  }



  subscribeToCallState() {
    this.callStateService.isCallAccepted$.subscribe(isAccepted => this.isCallAccepted = isAccepted);
    this.callStateService.isCallMissed$.subscribe(isMissed => this.isCallMissed = isMissed);
    this.callStateService.isIncomingCall$.subscribe(isIncoming => this.isIncomingCall = isIncoming);
    this.callStateService.recallContactId$.subscribe(contactId => this.recallContactId = contactId);
    this.callStateService.endChatNotification$.subscribe(message => this.endChatMessage = message);
  }
}