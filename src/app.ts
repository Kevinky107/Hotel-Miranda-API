import express, { NextFunction, Request, Response } from 'express';
import { roomController } from './controllers/room';
import { authenticateToken } from './middleware/auth';
import { userController } from './controllers/user';
import { bookingController } from './controllers/booking';
import { contactController } from './controllers/contact';
import { APIError } from './utils/APIError';
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import { LoginController } from './controllers/login';
import { LogoutController } from './controllers/logout';
const mongoose = require("mongoose");

dotenv.config();

export const app = express();

const start = async () => {
    try {
      await mongoose.connect(
        "mongodb://localhost:27017/hotel-miranda"
      )
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};
  
start();


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/login', LoginController);
app.use('/logout', LogoutController);
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
                <div class="form-container">
                    <form method="post" action="/login">
                        <input type="email" name="email" value="Kevinagudomontil@gmail.com" placeholder="Email" />
                        <input type="password" name="password" value="1234" placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                    <form method="post" action="/logout">
                        <button type="submit">Logout</button>
                    </form>
                </div>
                <div class="sections">
                    <div class="section">
                        <h3>ROOMS</h3>
                        <h4>/rooms/?id</h4>
                        <ul>
                            <li><a href="/rooms">All Rooms</a></li>
                        </ul>
                        <h4>/rooms/?id</h4>
                        <ul>
                            <li><a href="/rooms">All Rooms</a></li>
                        </ul>
                    </div>
                    <div class="section">
                        <h3>USERS</h3>
                        <h4>/users/?id</h4>
                        <ul>
                            <li><a href="/users">All Users</a></li>
                        </ul>
                    </div>
                    <div class="section">
                        <h3>BOOKINGS</h3>
                        <h4>/bookings/?id</h4>
                        <ul>
                            <li><a href="/bookings">All Bookings</a></li>
                        </ul>
                    </div>
                    <div class="section">
                        <h3>CONTACT</h3>
                        <h4>/contact/?id</h4>
                        <ul>
                            <li><a href="/contact">All Comments</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </body>
    `);
});

app.use((error: APIError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(error.status || 500).json({message: error.message || "Something went wrong", error: error.status})
});
