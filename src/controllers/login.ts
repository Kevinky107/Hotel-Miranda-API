import express, { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";
import { APIError } from '../utils/APIError';
import { UserModel } from '../schemas/User';
import bcrypt from 'bcryptjs';

export const LoginController = express.Router();

interface userdata {
    email : string | null,
    password : string | null, 
    name: string | null,
    picture : string | null,
    _id : string | null
}

let userChecked: userdata = {email: null, password: null, name: null, picture: null, _id: null};

LoginController.post('/', async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const check = await checkUser(email, password)
    if (check) {
        const token = jwt.sign({ email, password }, process.env.TOKEN_SECRET || 'secretKey', { expiresIn: '1h' })
        userChecked.password = password;
        res.json({Token: token, User: userChecked})
    } else {
        const error = new APIError('Invalid credentials', 401);
        next(error);
    }
});

async function checkUser(email: string, password: string): Promise<boolean> {
    try {
        const user = await UserModel.findOne({email: email}).exec();
        if(user) {
            userChecked = {email: user.email, password: user.password, name: user.name, picture: user.picture, _id: String(user._id)};
            return await bcrypt.compare(password, user.password);
        }
        else
            return false  
    } catch (error) {
        console.error(`Error fetching user #${email}:`, error);
        throw new Error(`Error fetching user #${email}`);
    }
}