import { Injectable, OnInit } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;
  isOneTap = false;

  constructor(
    private fireAuth: AngularFireAuth
  ) {
    this.fireAuth.user.subscribe(user => this.user);
  }

  async init(): Promise<void> {
    // required for single time one tap
    // console.log(window.localStorage.getItem('user'));
    // if(!window.localStorage.getItem('user')){
    //   console.log(window.google)
    await this.onAuthStateChanged();



  }
  async onAuthStateChanged(): Promise<void> {
    await this.fireAuth.onAuthStateChanged((user) => {
      console.log(user);
      this.user = user;
      console.log(user?.displayName);
      console.log(user?.email);
      console.log(user?.uid);
      console.log(user?.photoURL);
      // console.log('user = ', user);
      this.isOneTap = true;
      if (!user) {
        console.log('onetap block');
        this.oneTap();
      } else {
        this.isOneTap = false;
      }
    });
  }
  oneTap(): void {
    window.google.accounts.id.initialize({
      client_id: environment.client_id,
      cancel_on_tap_outside: false,
      callback: async (token: any) => {
        this.isOneTap = true;
        console.log('handler', this.isOneTap);
        // window.localStorage.setItem('user',token);
        await this.handle(token);
      }
    });

    window.google.accounts.id.prompt((notification) => {
      console.log(notification);
      if ((notification.isNotDisplayed() || notification.isSkippedMoment())) {
        console.log('Incognito');
        console.log('just below incogn', this.isOneTap);
      }
    });
  }


  async handle(token: any): Promise<void> {

    const credential = firebase.auth.GoogleAuthProvider.credential(token.credential);
    await this.fireAuth.signInWithCredential(credential);
    this.isOneTap = true;
  }

  signOut(): void {
    this.fireAuth.signOut();
    // window.localStorage.removeItem('user');
  }
}
