import { Request, Response, NextFunction } from "express";
import errorHandler from "./errorHandler";

export default function validateAdminCredentials(req: Request, res: Response, next: NextFunction): void {
  const { email, password } = req.body;
  if (email === undefined && password === undefined) {
    return next(errorHandler(400, "Bad Request: Both email and password are required."));
  } 

  if (email === undefined || email === "" || email === null) {
    return next(errorHandler(400, "Bad Request: Email is required and cannot be (empty, null, or undefined)."));
  }

  if (password === undefined || password === "" || password === null) {
    return next(errorHandler(400, "Bad Request: Password is required and cannot be (empty, null, or undefined)."));
  }

  next();
}