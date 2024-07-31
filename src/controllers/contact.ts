import express, { Request, Response, NextFunction } from 'express'
import { Contact } from '../services/contact';

export const contactController = express.Router();

contactController.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        const contacts = await Contact.fetchAll();
        return res.status(200).json(contacts);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching contacts', error });
    }
});

contactController.get('/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    try {
        const contact = await Contact.fetchOne(id);
        if (contact) {
            return res.status(200).json(contact);
        } else {
            return res.status(404).json({ message: `Contact with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error fetching contact #${id}`, error });
    }
});

contactController.post('/add', async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const contactData = req.body;
        const newcontact = await Contact.add(contactData);
        return res.status(201).json(newcontact);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding new contact', error });
    }
});

contactController.delete('/delete/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    try {
        const deletedcontact = await Contact.delete(id);
        if (deletedcontact) {
            return res.status(200).json(deletedcontact);
        } else {
            return res.status(404).json({ message: `Contact with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error deleting contact #${id}`, error });
    }
});

contactController.put('/update/:id', async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id;
    const contactData = req.body;
    try {
        const updatedcontact = await Contact.update(id, contactData);
        if (updatedcontact) {
            return res.status(200).json(updatedcontact);
        } else {
            return res.status(404).json({ message: `Contact with id ${id} not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: `Error updating contact #${id}`, error });
    }
});