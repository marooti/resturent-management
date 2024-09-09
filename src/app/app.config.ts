import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCfA98PJoMHAc8jmzocSy6z9eY57cmZqPM",
  authDomain: "tempo-28dab.firebaseapp.com",
  databaseURL: "https://tempo-28dab-default-rtdb.firebaseio.com",
  projectId: "tempo-28dab",
  storageBucket: "tempo-28dab.appspot.com",
  messagingSenderId: "345249527520",
  appId: "1:345249527520:web:e538f94c4bc6121c45c285",
  measurementId: "G-SXWQVZDTT0"
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideRouter(routes),
    provideClientHydration(),
    provideToastr({
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      disableTimeOut: 'extendedTimeOut',
      tapToDismiss: false,
      timeOut: 3000,
      easeTime: 400,
      positionClass: 'toast-top-right',
    }), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({ "projectId": "tempo-28dab", "appId": "1:345249527520:web:e538f94c4bc6121c45c285", "databaseURL": "https://tempo-28dab-default-rtdb.firebaseio.com", "storageBucket": "tempo-28dab.appspot.com", "apiKey": "AIzaSyCfA98PJoMHAc8jmzocSy6z9eY57cmZqPM", "authDomain": "tempo-28dab.firebaseapp.com", "messagingSenderId": "345249527520", "measurementId": "G-SXWQVZDTT0" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())
  ]
};
