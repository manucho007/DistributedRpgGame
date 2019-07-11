import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onClickBoard(): void {
    this.router.navigateByUrl('/board');
  }

  onClickScoreboard(): void {
    this.router.navigateByUrl('/scoreboard');
  }
}
