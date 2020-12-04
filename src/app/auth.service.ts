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
  isOneTap : boolean = false;
  constructor(
    private fireAuth: AngularFireAuth
  ) {
  }

  async init(): Promise<void> {
     // required for single time one tap
    console.log(window.localStorage.getItem('user'));  
    if(!window.localStorage.getItem('user')){
      console.log(window.google)
       window.onload = () => this.oneTap();
    }
    await this.onAuthStateChanged();


   
    
    window.google.accounts.id.prompt((notification) => {
      if ((notification.isNotDisplayed() || notification.isSkippedMoment())) {
        console.log('Incognito');
        console.log('just below incogn', this.isOneTap);
      }
    });
  }

  async onAuthStateChanged(){
    await this.fireAuth.onAuthStateChanged((user) => {
      this.user.next(user);
      this.isOneTap = true;
      if (!user) {
        window.google.accounts.id.prompt();
      }
    });
  }

  oneTap(){
    window.google.accounts.id.initialize({
      client_id: environment.client_id,
      callback: async(token:any) => {
        this.isOneTap = true;
        console.log("handler", this.isOneTap);
        window.localStorage.setItem('user',token);
        await  this.handle(token);
      }
    });
  }

  async handle(token:any): Promise<void> {
    const credential = firebase.auth.GoogleAuthProvider.credential(token.credential);
   await this.fireAuth.signInWithCredential(credential);
    this.isOneTap = true;
    console.log(this.isOneTap);
  }

  signOut(): void {
    this.fireAuth.signOut();
    window.localStorage.removeItem('user');
  }
}
