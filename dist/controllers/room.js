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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomController = void 0;
const express_1 = __importDefault(require("express"));
const room_1 = require("../services/room");
exports.roomController = express_1.default.Router();
exports.roomController.get('/', (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield room_1.Room.fetchAll();
        return res.status(200).json(rooms);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching rooms', error });
    }
}));
exports.roomController.get('/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const room = yield room_1.Room.fetchOne(id);
        if (room) {
            return res.status(200).json(room);
        }
        else {
            return res.status(404).json({ message: `Room with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error fetching room #${id}`, error });
    }
}));
exports.roomController.post('/add', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomData = req.body;
        const newroom = yield room_1.Room.add(roomData);
        return res.status(201).json(newroom);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding new room', error });
    }
}));
exports.roomController.delete('/delete/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedroom = yield room_1.Room.delete(id);
        if (deletedroom) {
            return res.status(200).json(deletedroom);
        }
        else {
            return res.status(404).json({ message: `Room with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error deleting room #${id}`, error });
    }
}));
exports.roomController.put('/update/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const roomData = req.body;
    try {
        const updatedroom = yield room_1.Room.update(id, roomData);
        if (updatedroom) {
            return res.status(200).json(updatedroom);
        }
        else {
            return res.status(404).json({ message: `Room with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error updating room #${id}`, error });
    }
}));
