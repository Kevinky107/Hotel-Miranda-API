import bookingData from '../data/bookings.json'
import { Booking as BookingType } from '../interfaces/Booking';

export class Booking {

    static fetchAll(): BookingType[] {
        return bookingData as BookingType[];
    }

    static fetchOne(id: string): BookingType {
        return bookingData.find (booking => `${booking.id}` === id) as BookingType;
    }

}