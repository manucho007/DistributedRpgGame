import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  signInWithGoogle(): void {
    this.auth.googleLogin()
      .then(() => this.afterSignIn())
      .catch((err) => {
        console.log(err);
    });
     /* .then(() => this.afterSignIn());*/
  }

  /*signInWithEmail(): void {
    this.auth.emailLogin(this.user.email, 'some-w')
      .then(() => this.afterSignIn());
  }*/

  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigateByUrl('/home');
  }

}
