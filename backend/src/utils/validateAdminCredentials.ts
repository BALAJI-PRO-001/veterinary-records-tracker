import { Request, Response, NextFunction } from "express";
import errorHandler from "./errorHandler";

export default function validateAdminCredentials(req: Request, res: Response, next: NextFunction): void {
  const { email, password } = req.body;
  if (email === undefined && password === undefined) {
    return next(errorHandler(400, "Both email and password are required."));
  } 

  if (email === undefined) {
    return next(errorHandler(400, "Bad Request: Email is required."));
  }

  if (password === undefined) {
    return next(errorHandler(400, "Bad Request: Password is required."));
  }

  if (email === null) {
    return next(errorHandler(400, "Bad Request: Email cannot be null."));
  }

  if (password === null) {
    return next(errorHandler(400, "Bad Request: Password cannot be null."));
  }

  next();
}