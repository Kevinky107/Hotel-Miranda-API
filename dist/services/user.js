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
exports.User = void 0;
const User_1 = require("../schemas/User");
class User {
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.UserModel.find().exec();
                return users;
            }
            catch (error) {
                console.error('Error fetching users:', error);
                throw new Error('Error fetching users');
            }
        });
    }
    static fetchOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.UserModel.findById(id).exec();
                return user;
            }
            catch (error) {
                console.error(`Error fetching user #${id}:`, error);
                throw new Error(`Error fetching user #${id}`);
            }
        });
    }
    static add(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newuser = new User_1.UserModel(userData);
                const saveduser = yield newuser.save();
                return saveduser;
            }
            catch (error) {
                console.error('Error adding new user:', error);
                throw new Error('Error adding new user');
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteduser = yield User_1.UserModel.findByIdAndDelete(id).exec();
                return deleteduser;
            }
            catch (error) {
                console.error(`Error deleting user #${id}:`, error);
                throw new Error(`Error deleting user #${id}`);
            }
        });
    }
    static update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateduser = yield User_1.UserModel.findByIdAndUpdate(id, userData, { new: true }).exec();
                return updateduser;
            }
            catch (error) {
                console.error(`Error updating user #${id}:`, error);
                throw new Error(`Error updating user #${id}`);
            }
        });
    }
}
exports.User = User;
