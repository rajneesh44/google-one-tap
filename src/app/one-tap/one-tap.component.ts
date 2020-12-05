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
  NotisOneTap = false;
  constructor(private authService: AuthService) { }
  async ngOnInit(): Promise<void> {
    console.log(this.authService.user);
    await this.authService.init();
    console.log('consling', this.$user);
    this.$user = this.authService.user;
    if (this.$user){
      this.NotisOneTap = true;
    }
    console.log('assacscas', this.NotisOneTap);
    console.log('scscs', this.$user);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
