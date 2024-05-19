import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({"projectId":"adoptpetonline","appId":"1:807133708196:web:9ac7aa2d3957ca3aa04b31","databaseURL":"https://adoptpetonline-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"adoptpetonline.appspot.com","apiKey":"AIzaSyDbk8jcn8aUAzGZnSGkj-bwsPCptK1JhOo","authDomain":"adoptpetonline.firebaseapp.com","messagingSenderId":"807133708196"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
