import express, { Request, Response, NextFunction } from 'express'
import { Booking } from '../services/booking';

export const bookingController = express.Router();

bookingController.get('/', (_req: Request, _res: Response, _next: NextFunction) => {
    const bookings = Booking.fetchAll();
    return _res.json(bookings)
})

bookingController.get('/:id', (_req: Request, _res: Response, _next: NextFunction) => {
    const id = _req.params.id;
    const bookings = Booking.fetchOne(id);
    return _res.json(bookings)
})