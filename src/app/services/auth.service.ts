import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {UserAcc} from "../interfaces/user-acc"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  
  auth = getAuth();
  signUp = (useAcc : UserAcc) => {
  createUserWithEmailAndPassword(this.auth, useAcc.email, useAcc.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  
}

