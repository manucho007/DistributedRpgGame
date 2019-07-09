import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/auth.service";
@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  signInWithGoogle(): void {
    this.auth.googleLogin();
  }

}
