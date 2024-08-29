import { pool } from '../utils/mySQLconnection';
import { Room as RoomType } from '../interfaces/Room';

export class Room {

    static async fetchAll(): Promise<RoomType[]> {
        try {
            const [rooms] = await pool.query(`
                SELECT 
                    Rooms.*,
                    (SELECT GROUP_CONCAT(DISTINCT rooms_images.url) 
                    FROM rooms_images 
                    WHERE rooms_images.room_id = Rooms._id) AS images,
                    (SELECT GROUP_CONCAT(DISTINCT amenities.name) 
                    FROM amenities 
                    WHERE amenities.room_id = Rooms._id) AS amenities
                FROM 
                    Rooms
                GROUP BY 
                    Rooms._id`) as any;
            
            const transformedRooms = rooms.map((room: any) => ({
                ...room,
                images: room.images ? room.images.split(',') : [],
                amenities: room.amenities ? room.amenities.split(',') : []
            }));
            
            return transformedRooms as RoomType[];
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw new Error('Error fetching rooms');
        }
    }

    static async fetchOne(id: string): Promise<RoomType> {
        try {
            const [room] = await pool.query(`
            SELECT 
                Rooms.*,
                (SELECT GROUP_CONCAT(DISTINCT rooms_images.url) 
                FROM rooms_images 
                WHERE rooms_images.room_id = Rooms._id) AS images,
                (SELECT GROUP_CONCAT(DISTINCT amenities.name) 
                FROM amenities 
                WHERE amenities.room_id = Rooms._id) AS amenities
            FROM 
                Rooms
            WHERE 
                Rooms._id = ?`, [id]) as any;
            
            const transformedRoom = {
                ...room[0],
                images: room[0].images ? room[0].images.split(',') : [],
                amenities: room[0].amenities ? room[0].amenities.split(',') : []
            };
            
            return transformedRoom as RoomType;
        } catch (error) {
            console.error(`Error fetching room #${id}:`, error);
            throw new Error(`Error fetching room #${id}`);
        }
    }

    static async add(roomData: RoomType): Promise<RoomType> {
        try {
            const { name, type, price, offer, available, } = roomData;
            
            const values = [name, type, price, offer, available];
            
            const [result] = await pool.query(
                `INSERT INTO Rooms (name, type, price, offer, available) VALUES (?, ?, ?, ?, ?)`,
                values
            ) as any;

            return result[0];
        } catch (error) {
            console.error('Error adding new room:', error);
            throw new Error('Error adding new room');
        }
    }

    static async delete(id: string): Promise<RoomType> {
        try {
            const [result] = await pool.query(`DELETE FROM Rooms WHERE _id = ?`, [Number(id)]) as any;
            return result[0];
        } catch (error) {
            console.error(`Error deleting room #${id}:`, error);
            throw new Error(`Error deleting room #${id}`);
        }
    }

    static async update(id: string, roomData: Partial<RoomType>): Promise<RoomType> {
        try {
            const { name, type, price, offer, available } = roomData;

            let setClause = '';
            const values: any[] = [];
            
            if (name !== undefined) {
                setClause += 'name = ?, ';
                values.push(name);
            }
            if (type !== undefined) {
                setClause += 'type = ?, ';
                values.push(type);
            }
            if (price !== undefined) {
                setClause += 'price = ?, ';
                values.push(price);
            }
            if (offer !== undefined) {
                setClause += 'offer = ?, ';
                values.push(offer);
            }
            if (available !== undefined) {
                setClause += 'available = ?, ';
                values.push(available);
            }

            setClause = setClause.trim().slice(0, -1);
            
            values.push(id);

            const query = `UPDATE Rooms SET ${setClause} WHERE _id = ?`;

            const [result] = await pool.query(query, values) as any;

            return result[0];
        } catch (error) {
            console.error(`Error updating room #${id}:`, error);
            throw new Error(`Error updating room #${id}`);
        }
    }
}
