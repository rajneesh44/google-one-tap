import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'one-tap';
  $user: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.authService.user);
    this.$user = this.authService.user;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
