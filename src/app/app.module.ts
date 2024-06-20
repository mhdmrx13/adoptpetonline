import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Updated imports
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdoptPetComponent } from './components/adopt-pet/adopt-pet.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    EmailVerificationComponent,
    NavbarComponent,
    SidebarComponent,
    AdoptPetComponent,
    AnimalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    FlexLayoutModule,
    MatSelectModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({
      projectId: "adoptpetonline",
      appId: "1:807133708196:web:9ac7aa2d3957ca3aa04b31",
      databaseURL: "https://adoptpetonline-default-rtdb.europe-west1.firebasedatabase.app",
      storageBucket: "adoptpetonline.appspot.com",
      apiKey: "AIzaSyDbk8jcn8aUAzGZnSGkj-bwsPCptK1JhOo",
      authDomain: "adoptpetonline.firebaseapp.com",
      messagingSenderId: "807133708196"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  firestore: Firestore = inject(Firestore);
  db = getFirestore(initializeApp({
    projectId: "adoptpetonline",
    appId: "1:807133708196:web:9ac7aa2d3957ca3aa04b31",
    databaseURL: "https://adoptpetonline-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "adoptpetonline.appspot.com",
    apiKey: "AIzaSyDbk8jcn8aUAzGZnSGkj-bwsPCptK1JhOo",
    authDomain: "adoptpetonline.firebaseapp.com",
    messagingSenderId: "807133708196"
  }));
}