import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
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
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp({"projectId":"juegosfera","appId":"1:829566684421:web:4477728900bfbdd0abfb6c","storageBucket":"juegosfera.appspot.com","apiKey":"AIzaSyANveHa_r7EPDYL2CV4WVCUMVy-Ejam7ks","authDomain":"juegosfera.firebaseapp.com","messagingSenderId":"829566684421","measurementId":"G-WSQTH2CSF0"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"proyecto-8fc22","appId":"1:697344517093:web:60c9f9ebc78f611f59c50c","databaseURL":"https://proyecto-8fc22-default-rtdb.firebaseio.com","storageBucket":"proyecto-8fc22.appspot.com","apiKey":"AIzaSyCXPCxXabKkO2YVuKYP4v4tReTqBdx77QE","authDomain":"proyecto-8fc22.firebaseapp.com","messagingSenderId":"697344517093","measurementId":"G-FZKGGYNTS3"}))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
