import express, { Request, Response, NextFunction } from 'express'
import { Booking } from '../services/booking';

export const bookingController = express.Router();

bookingController.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        const bookings = await Booking.fetchAll();
        return res.status(200).json(bookings);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching bookings', error });
    }
});

bookingController.get('/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    try {
        const booking = await Booking.fetchOne(id);
        if (booking) {
            return res.status(200).json(booking);
        } else {
            return res.status(404).json({ message: `Booking with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error fetching booking #${id}`, error });
    }
});

bookingController.post('/add', async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const bookingData = req.body;
        const newBooking = await Booking.add(bookingData);
        return res.status(201).json(newBooking);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding new booking', error });
    }
});

bookingController.delete('/delete/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    try {
        const deletedBooking = await Booking.delete(id);
        if (deletedBooking) {
            return res.status(200).json(deletedBooking);
        } else {
            return res.status(404).json({ message: `Booking with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error deleting booking #${id}`, error });
    }
});

bookingController.put('/update/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    const bookingData = req.body;
    try {
        const updatedBooking = await Booking.update(id, bookingData);
        if (updatedBooking) {
            return res.status(200).json(updatedBooking);
        } else {
            return res.status(404).json({ message: `Booking with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error updating booking #${id}`, error });
    }
});