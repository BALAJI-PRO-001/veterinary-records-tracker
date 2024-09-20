import { Request, Response, NextFunction } from "express";
import errorHandler from "./errorHandler";

export default function validateAdminCredentials(req: Request, res: Response, next: NextFunction): void {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(errorHandler(400, "Both email and password are required."));
  } 

  if (!email) {
    return next(errorHandler(400, "Email is required."));
  }

  if (!password) {
    return next(errorHandler(400, "Password is required."));
  }

  next();
}