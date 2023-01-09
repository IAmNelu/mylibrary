import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, User, GoogleAuthProvider } from '@angular/fire/auth';
import { doc, DocumentData, DocumentReference, Firestore, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// import * as auth from 'firebase/auth';
import { setDoc } from 'firebase/firestore';


@Injectable({ providedIn: 'root' })
export class AuthService {
  userData: User | undefined;
  constructor(public auth: Auth, public firestore: Firestore, public router: Router) {
    authState(auth).subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.initUserBooks(user.uid);
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  get user() {
    return this.isLoggedIn ? JSON.parse(localStorage.getItem('user')!) : null;
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
    try {
      const _ = await this.AuthLogin(new GoogleAuthProvider());
      while (!this.isLoggedIn) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      this.router.navigate(['/home', 'my-books']);
    } catch (error) {

    }
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
    const userData = {
      uid: user.uid,
      email: user.email,
    };
    return setDoc(userRef, userData, { merge: true });
  }

  async initUserBooks(uid: string) {
    const booksRef: DocumentReference<DocumentData> = doc(this.firestore,
      `books/${uid}`
    );
    const books = (await getDoc(booksRef)).data();

    if (books === undefined) {
      return setDoc(booksRef, { books: [], uid: uid }, { merge: true });
    }

  }

  // Sign out
  logOut() {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/', 'login']);
    });
  }

}