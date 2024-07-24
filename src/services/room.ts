import roomData from '../data/rooms.json'
import { Room as RoomType } from '../interfaces/Room';

export class Room {

    static fetchAll(): RoomType[] {
        return roomData as RoomType[] ;
    }

    static fetchOne(id: string): RoomType {
        return roomData.find (room => `${room.id}` === id) as RoomType;
    }

}