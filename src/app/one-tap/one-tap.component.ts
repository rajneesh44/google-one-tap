import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-one-tap',
  templateUrl: './one-tap.component.html',
  styleUrls: ['./one-tap.component.css']
})
export class OneTapComponent implements OnInit {
  title = 'one-tap';
  $user: any;
  constructor(
    private authService: AuthService
  ) { }

  async ngOnInit():Promise<void> {
    console.log(this.authService.user);
   await this.authService.init();
    this.$user = this.authService.user;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
