import mongoose, { model } from 'mongoose';
import { User } from '../interfaces/User';
const { Schema } = mongoose;

const userSchema = new Schema<User> ({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    post: {
        type: String,
        enum: ['Manager', 'Room Service', 'Reception'],
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    postdescription: {
        type: String,
        required: true
    },
    startdate: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }
})

export const UserModel = model<User>('User', userSchema);