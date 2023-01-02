import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { doc, DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { setDoc } from 'firebase/firestore';

interface User {
  uid: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  userData: any;
  constructor(public auth: Auth, public firestore: Firestore, public router: Router) {

    authState(auth).subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  async signup(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      await this.login(email, password);
    } catch (error) {
      console.error(error);
    }
  }
  // Sign in with email/password
  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      this.setUserData(result.user);
      authState(this.auth).subscribe((user) => {
        if (user) {
          this.router.navigate(['my-books']);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  // Sign in with Google
  async googleAuth() {
    const res = await this.AuthLogin(new auth.GoogleAuthProvider());
    this.router.navigate(['my-books']);
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);


    return user !== null ? true : false;
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.router.navigate(['my-books']);
      this.setUserData(result.user);
    } catch (error) {
      window.alert(error);
    }
  }

  /* Setting up user data when sign in with username/password, 
sign up with username/password and sign in with social auth  
provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef: DocumentReference<DocumentData> = doc(this.firestore,
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
    };
    return setDoc(userRef, userData, { merge: true });
  }

  // Sign out
  logOut() {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/', 'login']);
    });
  }

}