import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, } from "rxjs/operators";
import { User } from "../interfaces/user";
import { auth } from "firebase/app";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          // Logged out
          return of(null)
        }
      })
    )
  }

  // Triggers the Provider's popup window and authenticates the user.
  // It returns a Promise that resolves with the auth credential.

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }


  // Email Sign up and login

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      // .then((user) => {
      //   return this.updateUserData(user) // if using firestore
      // })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => this.handleError(error));
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        return this.updateUserData(credential.user)
      })
      .catch(error => this.handleError(error));
  }

  // This is how we initialize custom data in Firestore.
  // The { merge: true } option is required to make this a non-destructive set for returning users.
  private updateUserData({ uid, email, displayName, photoURL }: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    const data = {
      uid,
      email,
      displayName,
      photoURL
    };
    return userRef.set(data, { merge: true });
  }

  // If error, console log and notify user
  private handleError(error) {
    console.error(error)
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
