import express, { NextFunction, Request, Response } from 'express';
import { roomController } from './controllers/room';
import { authenticateToken } from './middleware/auth';
import { userController } from './controllers/user';
import { bookingController } from './controllers/booking';
import { contactController } from './controllers/contact';
import { APIError } from './utils/APIError';
import dotenv from "dotenv"
import { LoginController } from './controllers/login';
const mongoose = require("mongoose");

dotenv.config();

export const app = express();

const start = async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://Kevinky:${process.env.ATLAS_KEY}@kevin.cr5lhp0.mongodb.net/Hotel-Miranda`
      )
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};
  
start();


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/login', LoginController);
app.use('/rooms', authenticateToken, roomController);
app.use('/users', authenticateToken, userController);
app.use('/bookings', authenticateToken, bookingController);
app.use('/contact', authenticateToken, contactController);

app.get('/', (_req, res) => {
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

app.use((error: APIError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(error.status || 500).json({message: error.message || "Something went wrong", error: error.status})
});
