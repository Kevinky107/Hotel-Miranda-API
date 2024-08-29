import { pool } from '../utils/mySQLconnection';
import { Contact as ContactType } from '../interfaces/Contact';

export class Contact {

    static async fetchAll(): Promise<ContactType[]> {
        try {
            const [contacts] = await pool.query(`SELECT * FROM Contacts`) as any;
            return contacts as ContactType[];
        } catch (error) {
            console.error('Error fetching contacts:', error);
            throw new Error('Error fetching contacts');
        }
    }

    static async fetchOne(id: string): Promise<ContactType> {
        try {
            const [contacts] = await pool.query(`SELECT * FROM Contacts WHERE _id = ?`, [id]) as any;
            return (contacts as ContactType[])[0];
        } catch (error) {
            console.error(`Error fetching contact #${id}:`, error);
            throw new Error(`Error fetching contact #${id}`);
        }
    }

    static async add(contactData: ContactType): Promise<ContactType> {
        try {
            const { date, customer, email, phone, comment, archived } = contactData;
            const values = [date, customer, email, phone, comment, archived];
            
            const [result] = await pool.query(
                `INSERT INTO Contacts (date, customer, email, phone, comment, archived) VALUES (?, ?, ?, ?, ?, ?)`,
                values
            ) as any;

            return result[0];
        } catch (error) {
            console.error('Error adding new contact:', error);
            throw new Error('Error adding new contact');
        }
    }

    static async delete(id: string): Promise<ContactType> {
        try {
            const [result] = await pool.query(`DELETE FROM Contacts WHERE _id = ?`, [id]) as any;
            return result[0];
        } catch (error) {
            console.error(`Error deleting contact #${id}:`, error);
            throw new Error(`Error deleting contact #${id}`);
        }
    }

    static async update(id: string, contactData: Partial<ContactType>): Promise<ContactType> {
        try {
            const { date, customer, email, phone, comment, archived } = contactData;
            
            let setClause = '';
            const values: any[] = [];
            
            if (date !== undefined) {
                setClause += 'date = ?, ';
                values.push(date);
            }
            if (customer !== undefined) {
                setClause += 'customer = ?, ';
                values.push(customer);
            }
            if (email !== undefined) {
                setClause += 'email = ?, ';
                values.push(email);
            }
            if (phone !== undefined) {
                setClause += 'phone = ?, ';
                values.push(phone);
            }
            if (comment !== undefined) {
                setClause += 'comment = ?, ';
                values.push(comment);
            }
            if (archived !== undefined) {
                setClause += 'archived = ?, ';
                values.push(archived);
            }
    
            setClause = setClause.trim().slice(0, -1);
            
            values.push(id);
    
            const query = `UPDATE Contacts SET ${setClause} WHERE _id = ?`;
    
            const [result] = await pool.query(query, values) as any;
    
            return result[0] as ContactType;
        } catch (error) {
            console.error(`Error updating contact #${id}:`, error);
            throw new Error(`Error updating contact #${id}`);
        }
    }
}