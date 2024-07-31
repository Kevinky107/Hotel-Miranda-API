import { Booking as BookingType } from '../interfaces/Booking';
import { BookingModel } from '../schemas/Booking';

export class Booking {

    static async fetchAll(): Promise<BookingType[]> {
        try {
            const bookings = await BookingModel.find().exec();
            return bookings;
        } catch (error) {
            console.error('Error fetching bookings:', error);
            throw new Error('Error fetching bookings');
        }
    }

    static async fetchOne(id: string): Promise<BookingType> {
        try {
            const booking = await BookingModel.findById(id).exec();
            return booking as BookingType;
        } catch (error) {
            console.error(`Error fetching booking #${id}:`, error);
            throw new Error(`Error fetching booking #${id}`);
        }
    }

    static async add(bookingData: BookingType): Promise<BookingType> {
        try {
            const newBooking = new BookingModel(bookingData);
            const savedBooking = await newBooking.save();
            return savedBooking as BookingType;
        } catch (error) {
            console.error('Error adding new booking:', error);
            throw new Error('Error adding new booking');
        }
    }

    static async delete(id: string): Promise<BookingType> {
        try {
            const deletedBooking = await BookingModel.findByIdAndDelete(id).exec();
            return deletedBooking as BookingType;
        } catch (error) {
            console.error(`Error deleting booking #${id}:`, error);
            throw new Error(`Error deleting booking #${id}`);
        }
    }

    static async update(id: string, bookingData: Partial<BookingType>): Promise<BookingType> {
        try {
            const updatedBooking = await BookingModel.findByIdAndUpdate(id, bookingData, { new: true }).exec();
            return updatedBooking as BookingType;
        } catch (error) {
            console.error(`Error updating booking #${id}:`, error);
            throw new Error(`Error updating booking #${id}`);
        }
    }

}