import { Injectable, OnInit } from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

declare var window : any;

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  user = new BehaviorSubject<any>(this.fireAuth.currentUser);
  constructor(
    private fireAuth: AngularFireAuth
  ) {
    this.init();
  }

  init(): void {
    console.log(this.user);
    window.onload = () => {
      console.log(window.google)
      window.google.accounts.id.initialize({
        client_id: environment.client_id,
        callback: (token:any) => {
          this.handle(token);
        }
      });
    };
    this.fireAuth.onAuthStateChanged((user) => {
      this.user.next(user);
      if (!user) {
        window.google.accounts.id.prompt();
      }
    });
  }

  handle(token:any): void {
    const credential = firebase.auth.GoogleAuthProvider.credential(token.credential);
    this.fireAuth.signInWithCredential(credential);
  }

  signOut(): void {
    this.fireAuth.signOut();
  }
}
