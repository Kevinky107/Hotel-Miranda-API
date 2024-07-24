import { NextFunction, Request, Response } from "express";
import { APIError } from "../utils/APIError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

export const authenticateToken = (_req: Request, _res: Response, _next: NextFunction): void => {
  const token = _req.cookies['authorization'];
  if (!token) {
    const error = new APIError("Token not found", 401)
    _next(error);
    return
  } 
    
  jwt.verify(token, process.env.TOKEN_SECRET || 'secretKey', (err: any, user: any) => {
    if (err) {
      const error = new APIError(err, 402)
      _next(error);
      return
    }

    _req.user = user
    _next();
  })
}