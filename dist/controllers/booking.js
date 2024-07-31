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
exports.bookingController = void 0;
const express_1 = __importDefault(require("express"));
const booking_1 = require("../services/booking");
exports.bookingController = express_1.default.Router();
exports.bookingController.get('/', (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_1.Booking.fetchAll();
        return res.status(200).json(bookings);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching bookings', error });
    }
}));
exports.bookingController.get('/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const booking = yield booking_1.Booking.fetchOne(id);
        if (booking) {
            return res.status(200).json(booking);
        }
        else {
            return res.status(404).json({ message: `Booking with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error fetching booking #${id}`, error });
    }
}));
exports.bookingController.post('/add', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingData = req.body;
        const newBooking = yield booking_1.Booking.add(bookingData);
        return res.status(201).json(newBooking);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding new booking', error });
    }
}));
exports.bookingController.delete('/delete/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedBooking = yield booking_1.Booking.delete(id);
        if (deletedBooking) {
            return res.status(200).json(deletedBooking);
        }
        else {
            return res.status(404).json({ message: `Booking with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error deleting booking #${id}`, error });
    }
}));
exports.bookingController.put('/update/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const bookingData = req.body;
    try {
        const updatedBooking = yield booking_1.Booking.update(id, bookingData);
        if (updatedBooking) {
            return res.status(200).json(updatedBooking);
        }
        else {
            return res.status(404).json({ message: `Booking with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error updating booking #${id}`, error });
    }
}));
