import { User } from './user';

export interface Board {
    spins: number;
    startTime: number;
    endTime: number;
    users: {user: User, score: number}[];
    isActive: boolean;
}
