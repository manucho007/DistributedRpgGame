import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../core/firebase.service';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/user';
import {Item} from '../../interfaces/item';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  users: Observable<User[]>;
  item: Item = {
    name: '555',
    value: 3
  };
  constructor(private route: ActivatedRoute, public db: FirebaseService) { }

  ngOnInit() {
    this.users = this.db.col$(`users`);
    console.log(this.users);
  }

  createNewGame() {
    /*this.db.add('items', this.item)
      .catch((err) => {
        console.log(err);
    });*/

    const users = this.db.col('users');
    console.log(users);
  }

}
