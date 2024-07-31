import { Contact as Comment } from '../interfaces/Contact';
import { ContactModel } from '../schemas/Contact';

export class Contact {

    static async fetchAll(): Promise<Comment[]> {
        try {
            const contacts = await ContactModel.find().exec();
            return contacts;
        } catch (error) {
            console.error('Error fetching contacts:', error);
            throw new Error('Error fetching contacts');
        }
    }

    static async fetchOne(id: string): Promise<Comment> {
        try {
            const contact = await ContactModel.findById(id).exec();
            return contact as Comment;
        } catch (error) {
            console.error(`Error fetching contact #${id}:`, error);
            throw new Error(`Error fetching contact #${id}`);
        }
    }

    static async add(contactData: Comment): Promise<Comment> {
        try {
            const newcontact = new ContactModel(contactData);
            const savedcontact = await newcontact.save();
            return savedcontact as Comment;
        } catch (error) {
            console.error('Error adding new contact:', error);
            throw new Error('Error adding new contact');
        }
    }

    static async delete(id: string): Promise<Comment> {
        try {
            const deletedcontact = await ContactModel.findByIdAndDelete(id).exec();
            return deletedcontact as Comment;
        } catch (error) {
            console.error(`Error deleting contact #${id}:`, error);
            throw new Error(`Error deleting contact #${id}`);
        }
    }

    static async update(id: string, contactData: Partial<Comment>): Promise<Comment> {
        try {
            const updatedcontact = await ContactModel.findByIdAndUpdate(id, contactData, { new: true }).exec();
            return updatedcontact as Comment;
        } catch (error) {
            console.error(`Error updating contact #${id}:`, error);
            throw new Error(`Error updating contact #${id}`);
        }
    }

}