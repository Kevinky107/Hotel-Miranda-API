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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const room_1 = require("./controllers/room");
const auth_1 = require("./middleware/auth");
const user_1 = require("./controllers/user");
const booking_1 = require("./controllers/booking");
const contact_1 = require("./controllers/contact");
const dotenv_1 = __importDefault(require("dotenv"));
const login_1 = require("./controllers/login");
const mongoose = require("mongoose");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(`mongodb+srv://Kevinky:${process.env.ATLAS_KEY}@kevin.cr5lhp0.mongodb.net/Hotel-Miranda`);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
start();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use('/login', login_1.LoginController);
exports.app.use('/rooms', auth_1.authenticateToken, room_1.roomController);
exports.app.use('/users', auth_1.authenticateToken, user_1.userController);
exports.app.use('/bookings', auth_1.authenticateToken, booking_1.bookingController);
exports.app.use('/contact', auth_1.authenticateToken, contact_1.contactController);
exports.app.get('/', (_req, res) => {
    return res.send(`
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>HOTEL MIRANDA API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    text-align: center;
                }
                .container {
                    padding: 20px;
                }
                h2 {
                    color: #333;
                    padding-top: 2em;
                    padding-bottom: 1em;
                }
                .form-container {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .form-container input, .form-container button {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .form-container button {
                    background-color: #f08dd9;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
                .form-container button:hover {
                    background-color: #d46abb;
                }
                .sections {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                .section {
                    background-color: white;
                    padding: 20px;
                    margin: 10px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 200px;
                }
                .section h3 {
                    color: #f08dd9;
                }
                .section ul {
                    list-style: none;
                    padding: 0;
                }
                .section ul li {
                    margin: 5px 0;
                }
                .section ul li a {
                    text-decoration: none;
                    color: #f08dd9;
                }
                .section ul li a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>HOTEL MIRANDA API</h2>
                <div class="sections">
                    <div class="section">
                        <h3>ROOMS</h3>
                        <h4>/rooms</h4>
                        <h4>/rooms/:id</h4>
                        <h4>/rooms/add</h4>
                        <h4>/rooms/delete/:id</h4>
                        <h4>/rooms/update/:id</h4>
                    </div>
                    <div class="section">
                        <h3>USERS</h3>
                        <h4>/users/?id</h4>
                        <h4>/users/:id</h4>
                        <h4>/users/add</h4>
                        <h4>/users/delete/:id</h4>
                        <h4>/users/update/:id</h4>
                    </div>
                    <div class="section">
                        <h3>BOOKINGS</h3>
                        <h4>/bookings/?id</h4>
                        <h4>/bookings/:id</h4>
                        <h4>/bookings/add</h4>
                        <h4>/bookings/delete/:id</h4>
                        <h4>/bookings/update/:id</h4>
                    </div>
                    <div class="section">
                        <h3>CONTACT</h3>
                        <h4>/contact/?id</h4>
                        <h4>/contact/:id</h4>
                        <h4>/contact/add</h4>
                        <h4>/contact/delete/:id</h4>
                        <h4>/contact/update/:id</h4>
                    </div>
                </div>
            </div>
        </body>
    `);
});
exports.app.use((error, _req, res, _next) => {
    res.status(error.status || 500).json({ message: error.message || "Something went wrong", error: error.status });
});
