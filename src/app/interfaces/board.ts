import { User } from './user';
import { Position } from './position';

export interface Board {
    steps: number;
    positions: Position[];
    timer: number;
    users: [{uid: User}];
}
