import express, { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";
import { APIError } from '../utils/APIError';
import { UserModel } from '../schemas/User';
import bcrypt from 'bcryptjs';

export const LoginController = express.Router();

LoginController.post('/', async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const check = await checkUser(email, password)
    if (check) {
        const token = jwt.sign({ email, password }, process.env.TOKEN_SECRET || 'secretKey', { expiresIn: '1h' })
        req.headers['Authorization'] = `Bearer ${token}`
        res.json({Token: token})
    } else {
        const error = new APIError('Invalid credentials', 401);
        next(error);
    }
});

async function checkUser(email: string, password: string): Promise<boolean> {
    try {
        const user = await UserModel.findOne({email: email}).exec();
        if(user)
            return await bcrypt.compare(password, user.password);
        else
            return false  
    } catch (error) {
        console.error(`Error fetching user #${email}:`, error);
        throw new Error(`Error fetching user #${email}`);
    }
}