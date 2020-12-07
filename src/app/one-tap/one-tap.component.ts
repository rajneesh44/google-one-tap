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

  constructor(private authService: AuthService) { }
  async ngOnInit(): Promise<void> {
  }

  signOut(): void {
    this.authService.signOut();
  }
}
