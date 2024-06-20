import { Component } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, sendEmailVerification } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent {
  auth: Auth;
  constructor(private router: Router) {
    this.auth = getAuth();
    
    if(!this.auth.currentUser)
    {
       this.router.navigate([''])
    }else{
      onAuthStateChanged(this.auth,(user)=>{
        if(user?.emailVerified){
          this.router.navigate(['']);
        }
      });
    }
   
  
  }
  async sendEmail(){
    await sendEmailVerification(this.auth.currentUser!);
  }
}