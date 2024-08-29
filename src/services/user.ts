import { pool } from '../utils/mySQLconnection';
import { User as UserType } from '../interfaces/User';
import bcrypt from 'bcryptjs';

export class User {


    static async fetchAll(): Promise<UserType[]> {
        try {
            const [users] = await pool.query(`SELECT * FROM Users`);
            return users as UserType[];
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users');
        }
    }

    static async fetchOne(id: string): Promise<UserType> {
        try {
            const [users] = await pool.query(`SELECT * FROM Users WHERE _id = ?`, [id]);
            return (users as UserType[])[0];
        } catch (error) {
            console.error(`Error fetching user #${id}:`, error);
            throw new Error(`Error fetching user #${id}`);
        }
    }

    static async fetchByEmail(email: string): Promise<UserType> {
        try {
            const [users] = await pool.query(`SELECT * FROM Users WHERE email = ?`, [email]);
            return (users as UserType[])[0];
        } catch (error) {
            console.error(`Error fetching user with email ${email}:`, error);
            throw new Error(`Error fetching user with email ${email}`);
        }
    }

    static async add(userData: UserType): Promise<UserType> {
        try {
            let { name, email, password, post, phone, picture, postdescription, startdate, state } = userData;
            password = await bcrypt.hash(password, 10)
            const values = [name, email, password, post, phone, picture, postdescription, startdate, state];
            
            const [result] = await pool.query(
                `INSERT INTO Users (name, email, password, post, phone, picture, postdescription, startdate, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                values
            );

            return (result as UserType[])[0];
        } catch (error) {
            console.error('Error adding new user:', error);
            throw new Error('Error adding new user');
        }
    }

    static async delete(id: string): Promise<UserType> {
        try {
            const [result] = await pool.query(`DELETE FROM Users WHERE _id = ?`, [id]) as any;
            return (result as UserType[])[0];
        } catch (error) {
            console.error(`Error deleting user #${id}:`, error);
            throw new Error(`Error deleting user #${id}`);
        }
    }

    static async update(id: string, userData: Partial<UserType>): Promise<UserType> {
        try {
            let { name, email, password, post, phone, postdescription, startdate, state } = userData;
            
            let setClause = '';
            const values: any[] = [];
    
            if (name !== undefined) {
                setClause += 'name = ?, ';
                values.push(name);
            }
            if (email !== undefined) {
                setClause += 'email = ?, ';
                values.push(email);
            }
            if (password !== undefined) {
                password = await bcrypt.hash(password, 10);
                setClause += 'password = ?, ';
                values.push(password);
            }
            if (post !== undefined) {
                setClause += 'post = ?, ';
                values.push(post);
            }
            if (phone !== undefined) {
                setClause += 'phone = ?, ';
                values.push(phone);
            }
            if (postdescription !== undefined) {
                setClause += 'postdescription = ?, ';
                values.push(postdescription);
            }
            if (startdate !== undefined) {
                setClause += 'startdate = ?, ';
                values.push(startdate);
            }
            if (state !== undefined) {
                setClause += 'state = ?, ';
                values.push(state);
            }
    
            setClause = setClause.trim().slice(0, -1);
    
            values.push(id);
    
            const query = `UPDATE Users SET ${setClause} WHERE _id = ?`;
    
            const [result] = await pool.query(query, values) as any;
    
            return result[0] as UserType;
        } catch (error) {
            console.error(`Error updating user #${id}:`, error);
            throw new Error(`Error updating user #${id}`);
        }
    }
}
