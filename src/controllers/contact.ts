import express, { Request, Response, NextFunction } from 'express'
import { Contact } from '../services/contact';

export const contactController = express.Router();

contactController.get('/', (_req: Request, _res: Response, _next: NextFunction) => {
    const contacts = Contact.fetchAll();
    return _res.json(contacts)
})

contactController.get('/:id', (_req: Request, _res: Response, _next: NextFunction) => {
    const id = _req.params.id;
    const contacts = Contact.fetchOne(id);
    return _res.json(contacts)
})