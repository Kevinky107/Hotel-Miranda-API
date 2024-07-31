import mongoose, { model } from 'mongoose';
import { Room } from '../interfaces/Room';
const { Schema } = mongoose;

const roomSchema = new Schema<Room> ({
    name: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        enum: ['Suite', 'Single Bed', 'Double Bed', 'Double Superior'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    offer: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        default: []
    },
    available: {
        type: Boolean,
        default: true
    }
})

export const RoomModel = model<Room>('Room', roomSchema);