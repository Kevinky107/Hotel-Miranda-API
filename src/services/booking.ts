import { pool } from '../utils/mySQLconnection';
import { Booking as BookingType } from '../interfaces/Booking';

export class Booking {

    static async fetchAll(): Promise<BookingType[]> {
        try {
            const [bookings] = await pool.query(`SELECT * FROM Bookings`) as any;
            return bookings as BookingType[];
        } catch (error) {
            console.error('Error fetching bookings:', error);
            throw new Error('Error fetching bookings');
        }
    }

    static async fetchOne(id: string): Promise<BookingType> {
        try {
            const [bookings] = await pool.query(`SELECT * FROM Bookings WHERE _id = ?`, [id]) as any;
            return (bookings as BookingType[])[0];
        } catch (error) {
            console.error(`Error fetching booking #${id}:`, error);
            throw new Error(`Error fetching booking #${id}`);
        }
    }

    static async add(bookingData: BookingType): Promise<BookingType> {
        try {
            const { guest, picture, orderdate, checkin, checkout, note, status, roomid } = bookingData;
            const values = [guest, picture, orderdate, checkin, checkout, note, status, roomid]
            
            const [result] = await pool.query(
                `INSERT INTO Bookings (guest, picture, orderdate, checkin, checkout, note, status, roomid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                values
            ) as any;

            return result[0];
        } catch (error) {
            console.error('Error adding new booking:', error);
            throw new Error('Error adding new booking');
        }
    }

    static async delete(id: string): Promise<BookingType> {
        try {
            const [result] = await pool.query(`DELETE FROM Bookings WHERE _id = ?`, [id]) as any;
            return result[0];
        } catch (error) {
            console.error(`Error deleting booking #${id}:`, error);
            throw new Error(`Error deleting booking #${id}`);
        }
    }

    static async update(id: string, bookingData: Partial<BookingType>): Promise<BookingType> {
        try {
            const { guest, picture, orderdate, checkin, checkout, note, status, roomid } = bookingData;
    
            let setClause = '';
            const values: any[] = [];
    
            if (guest !== undefined) {
                setClause += 'guest = ?, ';
                values.push(guest);
            }
            if (picture !== undefined) {
                setClause += 'picture = ?, ';
                values.push(picture);
            }
            if (orderdate !== undefined) {
                setClause += 'orderdate = ?, ';
                values.push(orderdate);
            }
            if (checkin !== undefined) {
                setClause += 'checkin = ?, ';
                values.push(checkin);
            }
            if (checkout !== undefined) {
                setClause += 'checkout = ?, ';
                values.push(checkout);
            }
            if (note !== undefined) {
                setClause += 'note = ?, ';
                values.push(note);
            }
            if (status !== undefined) {
                setClause += 'status = ?, ';
                values.push(status);
            }
            if (roomid !== undefined) {
                setClause += 'roomid = ?, ';
                values.push(roomid);
            }
    
            setClause = setClause.trim().slice(0, -1);
    
            values.push(id);
    
            const query = `UPDATE Bookings SET ${setClause} WHERE _id = ?`;
    
            const [result] = await pool.query(query, values) as any;
    
            return result[0];
        } catch (error) {
            console.error(`Error updating booking #${id}:`, error);
            throw new Error(`Error updating booking #${id}`);
        }
    }
}