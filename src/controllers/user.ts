import express, { Request, Response, NextFunction } from 'express'
import { User } from '../services/user';

export const userController = express.Router();

userController.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        const users = await User.fetchAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching users', error });
    }
});

userController.get('/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    try {
        const user = await User.fetchOne(id);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error fetching user #${id}`, error });
    }
});

userController.post('/add', async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const userData = req.body;
        const newuser = await User.add(userData);
        return res.status(201).json(newuser);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding new user', error });
    }
});

userController.delete('/delete/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    try {
        const deleteduser = await User.delete(id);
        if (deleteduser) {
            return res.status(200).json(deleteduser);
        } else {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error deleting user #${id}`, error });
    }
});

userController.put('/update/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    const userData = req.body;
    try {
        const updateduser = await User.update(id, userData);
        if (updateduser) {
            return res.status(200).json(updateduser);
        } else {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error updating user #${id}`, error });
    }
});