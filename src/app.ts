import express, { NextFunction, Request, Response } from 'express';
import { roomController } from './controllers/room';
import { authenticateToken } from './middleware/auth';
import { userController } from './controllers/user';
import { bookingController } from './controllers/booking';
import { contactController } from './controllers/contact';
import { APIError } from './utils/APIError';
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser'

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.post('/login', (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;
    if (email === 'Kevinagudomontil@gmail.com' && password === '1234') {
        const token = jwt.sign({ email, password }, process.env.TOKEN_SECRET || 'secretKey')
        res.cookie('authorization', token, {httpOnly: true})
        res.redirect("/")
        return
    } else {
        const error = new APIError('Invalid credentials', 403);
        _next(error)
        return
    }
});

app.post('/logout', (_req: Request, res: Response, _next: NextFunction) => {
    res.clearCookie('authorization');
    res.redirect('/');
});

app.use('/rooms', authenticateToken, roomController);
app.use('/users', authenticateToken, userController);
app.use('/bookings', authenticateToken, bookingController);
app.use('/contact', authenticateToken, contactController);

app.get('/', (_req, _res) => {
    return _res.send(`
        <br></br>
        <div style="text-align: center">
            <h2>HOTEL MIRANDA API</h2>
            <br></br>
            <form style="display: inline-flex;" method="post" action="/login">
                <input style="margin-inline: 5px" type="email" name="email" value="Kevinagudomontil@gmail.com"/>
                <input style="margin-inline: 5px" type="password" name="password" value="1234"/>
                <button style="margin-inline: 5px" type="submit">login</button>
            </form>
            <form style="display: inline-flex;" method="post" action="/logout">
                <button type="submit">logout</button>
            </form>
        </div>
        <div style="width: 100%;display: inline-flex; justify-content: center; text-align: center; margin: auto">
            <div style="padding: 1em;">
                <h3>ROOMS</h3>
                <h4>/rooms/?id</h4>
                <ul style="list-style: none; padding: 0;">
                    <li><a href="/rooms">All Rooms</a></li>
                    <li><a href="/rooms/0">Room #0</a></li>
                    <li><a href="/rooms/20">Room #20</a></li>
                </ul>
            </div>
            <div style="padding: 1em;">
                <h3>USERS</h3>
                <h4>/users/?id</h4>
                <ul style="list-style: none; padding: 0;">
                    <li><a href="/users">All Users</a></li>
                    <li><a href="/users/0">Users #0</a></li>
                    <li><a href="/users/1">Users #1</a></li>
                </ul>
            </div>
            <div style="padding: 1em;">
                <h3>BOOKINGS</h3>
                <h4>/bookings/?id</h4>
                <ul style="list-style: none; padding: 0;">
                    <li><a href="/bookings">All Bookings</a></li>
                    <li><a href="/bookings/0">Bookings #0</a></li>
                    <li><a href="/bookings/30">Bookings #30</a></li>
                </ul>
            </div>
            <div style="padding: 1em;">
                <h3>CONTACT</h3>
                <h4>/contact/?id</h4>
                <ul style="list-style: none; padding: 0;">
                    <li><a href="/contact">All Comments</a></li>
                    <li><a href="/contact/0">Comment #0</a></li>
                    <li><a href="/contact/20">Comment #20</a></li>
                </ul>
            </div>
        </div>
    `);
});

app.use((_error: APIError, _req: Request, _res: Response, _next: NextFunction) => {
    _res.status(_error.status || 500).json({message: _error.message || "Something went wrong", error: _error.status})
});
