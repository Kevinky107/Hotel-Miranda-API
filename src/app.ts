import express, { NextFunction, Request, Response } from 'express';
import { roomController } from './controllers/room';
import { authenticateToken } from './middleware/auth';
import { userController } from './controllers/user';
import { bookingController } from './controllers/booking';
import { contactController } from './controllers/contact';
import { APIError } from './utils/APIError';
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"

dotenv.config();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.post('/login', (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (email === 'Kevinagudomontil@gmail.com' && password === '1234') {
        const token = jwt.sign({ email, password }, process.env.TOKEN_SECRET || 'secretKey')
        res.cookie('authorization', token, {httpOnly: true});
        res.json({ Login: 'Cookie setted successfully' });
    } else {
        const error = new APIError('Invalid credentials', 401);
        next(error);
    }
});

app.post('/logout', (_req: Request, res: Response, _next: NextFunction) => {
    res.clearCookie('authorization');
    res.json({ Logout: 'Cookie deleted successfully' });
});

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
                            <li><a href="/rooms/0">Room #0</a></li>
                            <li><a href="/rooms/20">Room #20</a></li>
                        </ul>
                    </div>
                    <div class="section">
                        <h3>USERS</h3>
                        <h4>/users/?id</h4>
                        <ul>
                            <li><a href="/users">All Users</a></li>
                            <li><a href="/users/0">User #0</a></li>
                            <li><a href="/users/1">User #1</a></li>
                        </ul>
                    </div>
                    <div class="section">
                        <h3>BOOKINGS</h3>
                        <h4>/bookings/?id</h4>
                        <ul>
                            <li><a href="/bookings">All Bookings</a></li>
                            <li><a href="/bookings/0">Booking #0</a></li>
                            <li><a href="/bookings/30">Booking #30</a></li>
                        </ul>
                    </div>
                    <div class="section">
                        <h3>CONTACT</h3>
                        <h4>/contact/?id</h4>
                        <ul>
                            <li><a href="/contact">All Comments</a></li>
                            <li><a href="/contact/0">Comment #0</a></li>
                            <li><a href="/contact/20">Comment #20</a></li>
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
