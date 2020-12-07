import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule, ɵAngularFireSchedulers } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { OneTapComponent } from './one-tap/one-tap.component';
import { SignInService } from './sign-in.service';
import { GsignInOnlyComponent } from './gsign-in-only/gsign-in-only.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    OneTapComponent,
    GsignInOnlyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CommonModule
  ],
  providers: [AuthService, SignInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
