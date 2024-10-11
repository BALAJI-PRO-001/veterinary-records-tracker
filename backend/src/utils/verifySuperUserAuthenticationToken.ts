import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import errorHandler from "./errorHandler";
dotenv.config();



export default function validateSuperUserAuthenticationToken(req: Request, res: Response, next: NextFunction): void {
  const superUserAccessToken = req.cookies.super_user_access_token;
  if (!superUserAccessToken) {
    return next(errorHandler(401, "Unauthorized: Superuser access token is missing in cookies."));
  }

  jwt.verify(superUserAccessToken, process.env.JWT_SECRET_KEY as string, (err: jwt.VerifyErrors | null, decoded: jwt.JwtPayload | string | undefined) => {
    if (err) {
      return next(errorHandler(403, "Forbidden: Invalid superuser access token."));
    } else {
      next();
    }
  });
}