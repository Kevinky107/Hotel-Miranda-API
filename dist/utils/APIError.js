"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.APIError = APIError;
