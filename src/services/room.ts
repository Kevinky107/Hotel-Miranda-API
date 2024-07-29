import { Room as RoomType } from '../interfaces/Room';
import { RoomModel } from '../schemas/Room';

export class Room {

    static async fetchAll(): Promise<RoomType[]> {
        try {
            const rooms = await RoomModel.find().exec();
            return rooms;
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw new Error('Error fetching rooms');
        }
    }

    static async fetchOne(id: string): Promise<RoomType> {
        try {
            const room = await RoomModel.findById(id).exec();
            return room as RoomType;
        } catch (error) {
            console.error(`Error fetching room #${id}:`, error);
            throw new Error(`Error fetching room #${id}`);
        }
    }

    static async add(roomData: RoomType): Promise<RoomType> {
        try {
            const newroom = new RoomModel(roomData);
            const savedroom = await newroom.save();
            return savedroom as RoomType;
        } catch (error) {
            console.error('Error adding new room:', error);
            throw new Error('Error adding new room');
        }
    }

    static async delete(id: string): Promise<RoomType> {
        try {
            const deletedroom = await RoomModel.findByIdAndDelete(id).exec();
            return deletedroom as RoomType;
        } catch (error) {
            console.error(`Error deleting room #${id}:`, error);
            throw new Error(`Error deleting room #${id}`);
        }
    }

    static async update(id: string, roomData: Partial<RoomType>): Promise<RoomType> {
        try {
            const updatedroom = await RoomModel.findByIdAndUpdate(id, roomData, { new: true }).exec();
            return updatedroom as RoomType;
        } catch (error) {
            console.error(`Error updating room #${id}:`, error);
            throw new Error(`Error updating room #${id}`);
        }
    }

}