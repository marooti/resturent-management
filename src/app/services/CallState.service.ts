import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallStateService {
  private isCallAcceptedSubject = new BehaviorSubject<boolean>(false);
  private isCallMissedSubject = new BehaviorSubject<boolean>(false);
  private isIncomingCallSubject = new BehaviorSubject<boolean>(false);
  private recallContactIdSubject = new BehaviorSubject<string | null>(null);
  private endChatNotificationSubject = new BehaviorSubject<string | null>(null); // New

  isCallAccepted$ = this.isCallAcceptedSubject.asObservable();
  isCallMissed$ = this.isCallMissedSubject.asObservable();
  isIncomingCall$ = this.isIncomingCallSubject.asObservable();
  recallContactId$ = this.recallContactIdSubject.asObservable();
  endChatNotification$ = this.endChatNotificationSubject.asObservable(); // New

  setCallAccepted(isAccepted: boolean) {
    this.isCallAcceptedSubject.next(isAccepted);
  }

  setCallMissed(isMissed: boolean) {
    this.isCallMissedSubject.next(isMissed);
  }

  setIncomingCall(isIncoming: boolean) {
    this.isIncomingCallSubject.next(isIncoming);
    console.log("isIncoming",isIncoming)
  }

  setRecallContactId(contactId: string | null) {
    this.recallContactIdSubject.next(contactId);
  }

  setEndChatNotification(message: string | null) {
    this.endChatNotificationSubject.next(message); // New
  }

  resetState() {
    this.setCallAccepted(false);
    this.setCallMissed(false);
    this.setIncomingCall(false);
    this.setRecallContactId(null);
    this.setEndChatNotification(null); // New
  }
}