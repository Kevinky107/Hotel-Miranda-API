import mongoose, { model } from 'mongoose';
import { Contact } from '../interfaces/Contact';
const { Schema } = mongoose;

const contactSchema = new Schema<Contact> ({
    date: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    archived: {
        type: Boolean,
        default: false
    }
})

export const ContactModel = model<Contact>('Contact', contactSchema);