import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserAcc } from '../../interfaces/user-acc';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userAcc: UserAcc = { email: '', password: '' };
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      cPwd: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signup() {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.value.email;
      const password = this.registrationForm.value.pwd;
      const confirmPassword = this.registrationForm.value.cPwd;

      if (password === confirmPassword) {
        this.userAcc.email = email;
        this.userAcc.password = password;
        console.log(this.userAcc.email);
        this.authService.signUp(this.userAcc);
      } else {
        console.error("Passwords do not match.");
      }
    } else {
      console.error("Form is invalid.");
    }
  }
}
