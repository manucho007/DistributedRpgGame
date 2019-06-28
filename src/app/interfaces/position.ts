import { User } from './user';

export interface position{
    location:string[];
    loot:boolean;
    occupied:boolean;
    user:{uid:User};
}