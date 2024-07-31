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
exports.userController = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../services/user");
exports.userController = express_1.default.Router();
exports.userController.get('/', (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.fetchAll();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching users', error });
    }
}));
exports.userController.get('/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield user_1.User.fetchOne(id);
        if (user) {
            return res.status(200).json(user);
        }
        else {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error fetching user #${id}`, error });
    }
}));
exports.userController.post('/add', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const newuser = yield user_1.User.add(userData);
        return res.status(201).json(newuser);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding new user', error });
    }
}));
exports.userController.delete('/delete/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deleteduser = yield user_1.User.delete(id);
        if (deleteduser) {
            return res.status(200).json(deleteduser);
        }
        else {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error deleting user #${id}`, error });
    }
}));
exports.userController.put('/update/:id', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const userData = req.body;
    try {
        const updateduser = yield user_1.User.update(id, userData);
        if (updateduser) {
            return res.status(200).json(updateduser);
        }
        else {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: `Error updating user #${id}`, error });
    }
}));
