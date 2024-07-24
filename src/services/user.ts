import userData from '../data/users.json'
import { User as UserType } from '../interfaces/User';

export class User {

    static fetchAll(): UserType[] {
        return userData as UserType[];
    }

    static fetchOne(id: string): UserType {
        return userData.find (user => `${user.id}` === id) as UserType;
    }

}