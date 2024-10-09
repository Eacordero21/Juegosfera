import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServiceWorkerModule } from '@angular/service-worker';
<<<<<<< HEAD
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TiendaComponent } from './tienda/tienda.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    MainComponent
  ],
=======
import { ReactiveFormsModule } from '@angular/forms';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
>>>>>>> 35b3c02bc67fc7849e6ef85f9ac2147febdda389
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // Correct Firebase initialization using the modular SDK
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    // Registering Service Worker for PWA capabilities
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
