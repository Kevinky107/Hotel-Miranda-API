import express, { Request, Response, NextFunction } from 'express'
import { Room } from '../services/room';

export const roomController = express.Router();

roomController.get('/', (_req: Request, _res: Response, _next: NextFunction) => {
    const rooms = Room.fetchAll();
    return _res.json(rooms)
})

roomController.get('/:id', (_req: Request, _res: Response, _next: NextFunction) => {
    const id = _req.params.id;
    const rooms = Room.fetchOne(id);
    return _res.json(rooms)
})