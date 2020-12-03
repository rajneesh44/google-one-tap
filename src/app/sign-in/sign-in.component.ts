import { Component, OnInit } from '@angular/core';
import { SignInService } from "../sign-in.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public signInService: SignInService) { }

  ngOnInit(): void {
  }

}
