import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



export default function privateRoute(req: Request, res: Response, next: NextFunction): void {
  const superUserAccessToken = req.cookies.super_user_access_token;
  if (!superUserAccessToken) {
    return res.redirect("/super-user/login");
  }

  jwt.verify(superUserAccessToken, process.env.JWT_SECRET_KEY as string, (err: jwt.VerifyErrors | null, decoded: jwt.JwtPayload | string | undefined) => {
    if (err) {
      return res.redirect("/super-user/login");
    } else {
      next();
    }
  });
}