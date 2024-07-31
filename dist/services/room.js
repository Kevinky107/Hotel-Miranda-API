"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const Room_1 = require("../schemas/Room");
class Room {
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield Room_1.RoomModel.find().exec();
                return rooms;
            }
            catch (error) {
                console.error('Error fetching rooms:', error);
                throw new Error('Error fetching rooms');
            }
        });
    }
    static fetchOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield Room_1.RoomModel.findById(id).exec();
                return room;
            }
            catch (error) {
                console.error(`Error fetching room #${id}:`, error);
                throw new Error(`Error fetching room #${id}`);
            }
        });
    }
    static add(roomData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newroom = new Room_1.RoomModel(roomData);
                const savedroom = yield newroom.save();
                return savedroom;
            }
            catch (error) {
                console.error('Error adding new room:', error);
                throw new Error('Error adding new room');
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedroom = yield Room_1.RoomModel.findByIdAndDelete(id).exec();
                return deletedroom;
            }
            catch (error) {
                console.error(`Error deleting room #${id}:`, error);
                throw new Error(`Error deleting room #${id}`);
            }
        });
    }
    static update(id, roomData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedroom = yield Room_1.RoomModel.findByIdAndUpdate(id, roomData, { new: true }).exec();
                return updatedroom;
            }
            catch (error) {
                console.error(`Error updating room #${id}:`, error);
                throw new Error(`Error updating room #${id}`);
            }
        });
    }
}
exports.Room = Room;
