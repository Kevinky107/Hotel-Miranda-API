import roomData from '../data/users.json'

export class Room {

    static fetchAll() {
        return roomData;
    }

    static fetchOne(id: string) {
        return roomData.find (room => `${room.id}` === id);
    }

}