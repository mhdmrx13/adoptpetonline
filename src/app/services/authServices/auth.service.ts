import { Injectable, inject } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  UserCredential,
  User,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  applyActionCode
} from "firebase/auth";
import { UserAcc } from "../../interfaces/user-acc";
import { Router } from '@angular/router';
import { onAuthStateChanged, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router: Router = inject(Router);
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = getAuth();
  public userData?: UserAcc;

  constructor() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const docRef = doc(this.firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.userData = docSnap.data() as UserAcc;
        }
      }
    });
  }

  authState(): Observable<User | null> {
    return authState(this.auth);
  }

  private async sendVerificationEmail(): Promise<void> {
    try {
      const user = this.auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        window.alert('A verification email is sent, check your inbox.');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      window.alert('Une erreur s\'est produite lors de l\'envoi de l\'email de vérification.');
      throw new Error('Une erreur s\'est produite lors de l\'envoi de l\'email de vérification.');
    }
  }

  private async waitForEmailVerification(user: firebase.User): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const intervalId = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(intervalId);
          resolve();
        }
      }, 1000);
    });
  }

  async signUp(userAcc: UserAcc, pwd: string): Promise<void> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, userAcc.email, pwd);
      await updateProfile(userCredential.user, { displayName: userAcc.userName });
      await this.sendVerificationEmail();
      await setDoc(doc(this.firestore, 'users', userCredential.user.uid), userAcc);
    } catch (error) {
      console.error('Error during sign-up:', error);
      window.alert('Une erreur s\'est produite lors de l\'inscription.');
      throw new Error('Une erreur s\'est produite lors de l\'inscription.');
    }
  }

  async logIn(userAcc: UserAcc, pwd: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, userAcc.email, pwd);
    } catch (error) {
      console.error('Error during login:', error);
      window.alert('Error during login');
      throw new Error('Une erreur s\'est produite lors de la connexion.');
    }
  }

  async logOut(): Promise<void> {
    try {
      await signOut(this.auth);
      await this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      window.alert('Error during logout.');
      throw new Error('Une erreur s\'est produite lors de la déconnexion.');
    }
  }

  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      window.alert('Error sending password reset email.');
      throw new Error('Une erreur s\'est produite lors de l\'envoi de l\'email de réinitialisation de mot de passe.');
    }
  }

  async verifyEmail(oobCode: string): Promise<void> {
    try {
      await applyActionCode(this.auth, oobCode);
      window.alert('Email verified successfully. You can now log in.');
    } catch (error) {
      console.error('Error verifying email:', error);
      window.alert('Error verifying email.');
    }
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
        resolve(!!user);
      });
    });
  }
}
