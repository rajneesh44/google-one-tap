import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import firebase from 'firebase';

declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;
  isOneTap = true;
  constructor(
    private fireAuth: AngularFireAuth,
    private changeDet: ChangeDetectorRef
  ) {
    this.fireAuth.user.subscribe(user => this.user);
  }

  async ngOnInit(): Promise<void> {
    await this.init();
  }

  async init(): Promise<void> {
    await this.onAuthStateChanged();
  }

  async onAuthStateChanged(): Promise<void> {
    await this.fireAuth.onAuthStateChanged((user) => {
      console.log(user);
      this.user = user;
      if (user) {
        console.log(user?.displayName);
        console.log(user?.email);
        console.log(user?.uid);
        console.log(user?.photoURL);
        console.log(this.user);
      }
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
        await this.handle(token);
      }
    });

    window.google.accounts.id.prompt((notification) => {
      console.log(notification.isNotDisplayed(), notification.isDisplayed());
      if ((notification.isNotDisplayed() || notification.isSkippedMoment())) {
        this.isOneTap = false;
        this.changeDet.detectChanges();
      }
    });
  }

  async handle(token: any): Promise<void> {

    const credential = firebase.auth.GoogleAuthProvider.credential(token.credential);
    await this.fireAuth.signInWithCredential(credential);
    this.isOneTap = true;
  }

}
