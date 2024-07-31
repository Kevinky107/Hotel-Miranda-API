import express, { Request, Response, NextFunction } from 'express'
import { Room } from '../services/room';

export const roomController = express.Router();

roomController.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        const rooms = await Room.fetchAll();
        return res.status(200).json(rooms);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching rooms', error });
    }
});

roomController.get('/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    try {
        const room = await Room.fetchOne(id);
        if (room) {
            return res.status(200).json(room);
        } else {
            return res.status(404).json({ message: `Room with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error fetching room #${id}`, error });
    }
});

roomController.post('/add', async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const roomData = req.body;
        const newroom = await Room.add(roomData);
        return res.status(201).json(newroom);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding new room', error });
    }
});

roomController.delete('/delete/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    try {
        const deletedroom = await Room.delete(id);
        if (deletedroom) {
            return res.status(200).json(deletedroom);
        } else {
            return res.status(404).json({ message: `Room with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error deleting room #${id}`, error });
    }
});

roomController.put('/update/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    const roomData = req.body;
    try {
        const updatedroom = await Room.update(id, roomData);
        if (updatedroom) {
            return res.status(200).json(updatedroom);
        } else {
            return res.status(404).json({ message: `Room with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error updating room #${id}`, error });
    }
});