import contactData from '../data/comments.json'
import { Contact as Comment } from '../interfaces/Contact';

export class Contact {

    static fetchAll(): Comment[]{
        return contactData;
    }

    static fetchOne(id: string): Comment {
        return contactData.find (contact => `${contact.id}` === id) as Comment;
    }

}