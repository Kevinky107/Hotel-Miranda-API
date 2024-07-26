import { NextFunction, Request, Response } from "express";
import { APIError } from "../utils/APIError";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, _res: Response, next: NextFunction): void => {
  const token = req.cookies['authorization'];
  if (!token) {
    const error = new APIError("Token not found", 401)
    next(error);
    return
  } 
    
  jwt.verify(token, process.env.TOKEN_SECRET || 'secretKey', (err: any, user: any) => {
    if (err) {
      const error = new APIError(err, 401)
      next(error);
      return
    }

    req.user = user
    next();
  })
}