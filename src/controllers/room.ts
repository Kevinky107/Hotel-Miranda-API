import express, { Request, Response, NextFunction } from 'express'
import { Room } from '../services/room';

export const roomController = express.Router();

roomController.get('/', (req, res, next) => {
    const rooms = Room.fetchAll();
    return res.json({rooms})
})