import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EmailAuthCredential } from '@angular/fire/auth';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';

const routes: Routes = [
  {path :'login', component:LoginComponent},
  {path :'register', component:RegisterComponent},
  {path :'forgotPassword', component:ForgotPasswordComponent},
  {path :'emailVerfication', component:EmailVerificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
