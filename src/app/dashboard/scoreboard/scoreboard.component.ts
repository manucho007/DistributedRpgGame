import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../interfaces/board';
import { FirebaseService } from '../../core/firebase.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreBoardComponent implements OnInit {

  boards: Observable<Board[]>;
  constructor(public db: FirebaseService) { }
  counter = 1;
  ngOnInit() {
    let tmp = this.db.colWithIds$('baords')
    console.log("this is the collection", tmp);
    this.boards = this.db.colWithIds$(`boards`);

  }
}
