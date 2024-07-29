import mongoose, { model } from 'mongoose';
import { Booking } from '../interfaces/Booking';
const { Schema } = mongoose;

const bookingSchema = new Schema<Booking> ({
    guest: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    orderdate: {
        type: String,
        required: true
    },
    checkin: {
        type: String,
        required: true
    },
    checkout: {
        type: String,
        required: true
    },
    note: {
        type: String,
        default: null
    },
    roomtype: {
        type: String,
        required: true,
        enum: ['Suite', 'Single Bed', 'Double Bed', 'Double Superior']
    },
    roomid: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['check in', 'check out', 'in progress']
    }
})

export const BookingModel = model<Booking>('Booking', bookingSchema);