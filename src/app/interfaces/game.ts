import { User } from './user';
import { Item } from './item';

export interface Game{
    idGame:string;
    idUser:{uid:User};
    gold:number;
    bucket:Item[]
}