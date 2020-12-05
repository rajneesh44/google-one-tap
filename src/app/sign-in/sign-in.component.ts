import { Component, OnInit } from '@angular/core';
// import { SignInService } from '../sign-in.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';

declare const gapi: any;


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  auth2: any;
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.googleInit();
  }

  googleInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.client_id,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  attachSignin(element): void {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

// ngAfterViewInit(): void{
//       this.googleInit();
// }

}
