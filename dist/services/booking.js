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
exports.Booking = void 0;
const Booking_1 = require("../schemas/Booking");
class Booking {
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield Booking_1.BookingModel.find().exec();
                return bookings;
            }
            catch (error) {
                console.error('Error fetching bookings:', error);
                throw new Error('Error fetching bookings');
            }
        });
    }
    static fetchOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield Booking_1.BookingModel.findById(id).exec();
                return booking;
            }
            catch (error) {
                console.error(`Error fetching booking #${id}:`, error);
                throw new Error(`Error fetching booking #${id}`);
            }
        });
    }
    static add(bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBooking = new Booking_1.BookingModel(bookingData);
                const savedBooking = yield newBooking.save();
                return savedBooking;
            }
            catch (error) {
                console.error('Error adding new booking:', error);
                throw new Error('Error adding new booking');
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedBooking = yield Booking_1.BookingModel.findByIdAndDelete(id).exec();
                return deletedBooking;
            }
            catch (error) {
                console.error(`Error deleting booking #${id}:`, error);
                throw new Error(`Error deleting booking #${id}`);
            }
        });
    }
    static update(id, bookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedBooking = yield Booking_1.BookingModel.findByIdAndUpdate(id, bookingData, { new: true }).exec();
                return updatedBooking;
            }
            catch (error) {
                console.error(`Error updating booking #${id}:`, error);
                throw new Error(`Error updating booking #${id}`);
            }
        });
    }
}
exports.Booking = Booking;
