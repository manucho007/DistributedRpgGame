import { User } from './user';

export interface Board{
    steps:number;
    positions:Position[];
    timer:number;
    users:[{uid:User}]
}