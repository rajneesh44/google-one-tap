import { Component, OnInit } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
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
    if (this.authService.isOneTap) {
      console.log('signIn with onetap');
    } else {
      console.log('singIn');
    }
    console.log('assacscas', this.NotisOneTap);
    console.log('scscs', this.$user);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
