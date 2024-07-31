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
exports.Contact = void 0;
const Contact_1 = require("../schemas/Contact");
class Contact {
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield Contact_1.ContactModel.find().exec();
                return contacts;
            }
            catch (error) {
                console.error('Error fetching contacts:', error);
                throw new Error('Error fetching contacts');
            }
        });
    }
    static fetchOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield Contact_1.ContactModel.findById(id).exec();
                return contact;
            }
            catch (error) {
                console.error(`Error fetching contact #${id}:`, error);
                throw new Error(`Error fetching contact #${id}`);
            }
        });
    }
    static add(contactData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newcontact = new Contact_1.ContactModel(contactData);
                const savedcontact = yield newcontact.save();
                return savedcontact;
            }
            catch (error) {
                console.error('Error adding new contact:', error);
                throw new Error('Error adding new contact');
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedcontact = yield Contact_1.ContactModel.findByIdAndDelete(id).exec();
                return deletedcontact;
            }
            catch (error) {
                console.error(`Error deleting contact #${id}:`, error);
                throw new Error(`Error deleting contact #${id}`);
            }
        });
    }
    static update(id, contactData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedcontact = yield Contact_1.ContactModel.findByIdAndUpdate(id, contactData, { new: true }).exec();
                return updatedcontact;
            }
            catch (error) {
                console.error(`Error updating contact #${id}:`, error);
                throw new Error(`Error updating contact #${id}`);
            }
        });
    }
}
exports.Contact = Contact;
