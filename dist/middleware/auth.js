"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const APIError_1 = require("../utils/APIError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, _res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        const error = new APIError_1.APIError("Token not found", 401);
        next(error);
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'secretKey', (err, user) => {
        if (err) {
            const error = new APIError_1.APIError(err, 401);
            next(error);
            return;
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
