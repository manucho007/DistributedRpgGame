import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user';
import {Board} from '../../interfaces/board';
import {FirebaseService} from '../../core/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  gameStartTime: number;
  board: Board = {
    startTime: 0,
    endTime: 0,
    users: [],
    spins: 0,
    isActive: false,
  };
  gameID: string;

  constructor(public auth: AuthService, public db: FirebaseService,
              private router: Router) { }

  ngOnInit() {
  }

  onCreateNewBoard(): void {
    this.auth.user.subscribe(user => {
      this.currentUser = user as User;
      this.createNewBoard(this.currentUser);
    });

  }

  onJoinExistingGame(): void {
    console.log('im joining new game');
  // this details should be the new joining user's
    const user: User = {
      uid: 'some uid',
      email: 'some email',
      displayName: 'my display name',
      photoURL: 'url'

    };
    const gameid = 'IvpKvxid3gPPyf661RuX';
    this.db.updateFieldAry('boards', gameid, user);
    this.router.navigateByUrl(`/board/${gameid}`);
  }


  onClickScoreboard(): void {
    this.router.navigateByUrl('/scoreboard');
  }

  private createNewBoard(user) {
    // create new board
    this.gameStartTime = new Date().getTime();
    this.board.startTime = this.gameStartTime;
    this.board.endTime = this.gameStartTime + 5 * 60;
    this.board.users = [{user, score: 0}];
    this.board.isActive = true;

    this.db.add(`boards`, this.board)
      .then((board) => {
        console.log(board);
        this.gameID = board.id;
        this.router.navigateByUrl(`/board/${this.gameID}`);
      })
      .catch((err) => {
        console.log(err);
      });

  }
}
