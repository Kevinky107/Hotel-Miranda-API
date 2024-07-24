import express, { Request, Response, NextFunction } from 'express'
import { User } from '../services/user';

export const userController = express.Router();

userController.get('/', (_req: Request, _res: Response, _next: NextFunction) => {
    const users = User.fetchAll();
    return _res.json(users)
})

userController.get('/:id', (_req: Request, _res: Response, _next: NextFunction) => {
    const id = _req.params.id;
    const users = User.fetchOne(id);
    return _res.json(users)
})