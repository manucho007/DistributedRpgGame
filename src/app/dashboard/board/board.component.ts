import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../../core/firebase.service';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/user';
import {Board} from '../../interfaces/board';
import {AuthService} from '../../core/auth.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {



  board: Observable<Board>;
  currentUser: User;

  userScore = 0;

  constructor(private router: Router, public db: FirebaseService,
              public auth: AuthService) {

  }


   ngOnInit() {
     const url = window.location.pathname;
     const id = url.substring(url.lastIndexOf('/') + 1);
     this.board = this.db.doc$(`boards/${id}`);
  }

  OnSpinTheWheel() {
    this.auth.user.subscribe(user => {
      this.currentUser = user as User;
      const url = window.location.pathname;
      const id = url.substring(url.lastIndexOf('/') + 1);
      const prevScore = this.userScore;
      this.userScore = this.userScore + this.spinTheWheel();
      this.db.incrementUserScore('boards', id, user, this.userScore, prevScore);
    });
  }

  private spinTheWheel(): number {
    // some one please write logic to this part
    return 3;
  }


  endGame() {

    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
    this.db.update(`boards/${id}`, {isActive: false})
      .catch((err) => {
        console.log(err);
      });

    this.router.navigateByUrl('/scoreboard');

  }


}
