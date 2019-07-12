import { User } from './user';

export interface Position {
    location: string[];
    loot: boolean;
    occupied: boolean;
    user: {uid: User};
}
