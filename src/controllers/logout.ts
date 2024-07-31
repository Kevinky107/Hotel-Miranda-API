import express, { Request, Response, NextFunction } from 'express'

export const LogoutController = express.Router();

LogoutController.post('/', (_req: Request, res: Response, _next: NextFunction) => {
    res.clearCookie('authorization');
    res.json({ Logout: 'Cookie deleted successfully' });
});