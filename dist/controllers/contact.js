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
exports.contactController = void 0;
const express_1 = __importDefault(require("express"));
const contact_1 = require("../services/contact");
exports.contactController = express_1.default.Router();
exports.contactController.get('/', (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contact_1.Contact.fetchAll();
        return res.status(200).json(contacts);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching contacts', error });
    }
}));
exports.contactController.get('/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const contact = yield contact_1.Contact.fetchOne(id);
        if (contact) {
            return res.status(200).json(contact);
        }
        else {
            return res.status(404).json({ message: `Contact with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error fetching contact #${id}`, error });
    }
}));
exports.contactController.post('/add', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactData = req.body;
        const newcontact = yield contact_1.Contact.add(contactData);
        return res.status(201).json(newcontact);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding new contact', error });
    }
}));
exports.contactController.delete('/delete/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedcontact = yield contact_1.Contact.delete(id);
        if (deletedcontact) {
            return res.status(200).json(deletedcontact);
        }
        else {
            return res.status(404).json({ message: `Contact with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error deleting contact #${id}`, error });
    }
}));
exports.contactController.put('/update/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const contactData = req.body;
    try {
        const updatedcontact = yield contact_1.Contact.update(id, contactData);
        if (updatedcontact) {
            return res.status(200).json(updatedcontact);
        }
        else {
            return res.status(404).json({ message: `Contact with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error updating contact #${id}`, error });
    }
}));
