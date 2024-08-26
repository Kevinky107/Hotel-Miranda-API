import mongoose, { model } from 'mongoose';
import { User } from '../interfaces/User';
import { APIError } from '../utils/APIError';
const { Schema } = mongoose;
import bcrypt from 'bcryptjs';

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

userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))
        return next();

    try{
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        if(error)
            next()
        else {
            const newError = new APIError("Error while encrypting the password", 500);
            next(newError);
        }

    } 
})

userSchema.pre("findOneAndUpdate", async function (next) {
    const update: any = this.getUpdate();

    if (update && update.password) {
        try {
            update.password = await bcrypt.hash(update.password, 10);
            this.setUpdate(update);
        } catch (error) {
            const newError = new APIError("Error while encrypting the password", 500);
            return next(newError);
        }
    }
    
    next();
});

export const UserModel = model<User>('User', userSchema);