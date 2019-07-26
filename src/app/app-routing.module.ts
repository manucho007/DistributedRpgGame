import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { BoardComponent } from './dashboard/board/board.component';
import {UserLoginComponent} from './user/user-login/user-login.component';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import {ScoreBoardComponent} from './dashboard/scoreboard/scoreboard.component';
import {CountdownModule} from 'ngx-countdown';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: UserLoginComponent },
  { path: `board/:id`, component: BoardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'scoreboard', component: ScoreBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule, CountdownModule],
  exports: [RouterModule],
  providers: [AngularFirestoreModule],
  declarations: [HomeComponent, BoardComponent, ScoreBoardComponent]
})
export class AppRoutingModule { }
