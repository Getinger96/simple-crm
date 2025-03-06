import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"crm-simple-101a9","appId":"1:972689343742:web:3e84991786fc4f73da11af","storageBucket":"crm-simple-101a9.firebasestorage.app","apiKey":"AIzaSyALTmCCTXpADhyUHgjZE96hDIF0_J9bsMw","authDomain":"crm-simple-101a9.firebaseapp.com","messagingSenderId":"972689343742"})), provideFirestore(() => getFirestore())]
};
