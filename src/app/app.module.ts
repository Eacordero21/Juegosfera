import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { MainComponent } from './main/main.component';
import { DataService } from './services/data.service';  // Ensure correct path to DataService
import { environment } from '../environments/environment';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { TiendaComponent } from './tienda/tienda.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';


@NgModule({
  declarations: [AppComponent, RegistroComponent, LoginComponent,  MainComponent, TiendaComponent, NoticiasComponent, DescripcionComponent, FaqsComponent, AyudaComponent, NumberToArrayPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // Firebase initialization using the modular SDK
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),  // Provide Firebase Authentication
    provideFirestore(() => getFirestore()),  // Provide Firestore
    // Registering Service Worker for PWA capabilities
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
