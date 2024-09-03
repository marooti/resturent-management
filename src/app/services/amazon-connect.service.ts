// amazon-connect.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmazonConnectService {

  constructor(private http: HttpClient) { }

  initializeCCP(containerId: string): void {
    const container = document.getElementById(containerId);
    if (container && (window as any).connect && (window as any).connect.core) {
      (window as any).connect.core.initCCP(container, {
        ccpUrl: 'https://agentconnect.my.connect.aws/ccp-v2',
        loginPopup: true,
        loginPopupAutoClose: true,
        loginPopupTimeout: 10000,
        region: 'us-east-1'
      });
    } else {
      console.error('Amazon Connect CCP is not available');
    }
  }
}