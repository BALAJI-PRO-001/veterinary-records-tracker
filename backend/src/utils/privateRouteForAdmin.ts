import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



export default function privateRouteForAdmin(req: Request, res: Response, next: NextFunction): void {
  const adminAccessToken = req.cookies.admin_access_token;
  if (!adminAccessToken) {
    return res.redirect("/");
  }

  jwt.verify(adminAccessToken, process.env.JWT_SECRET_KEY as string, (err: jwt.VerifyErrors | null, decoded: jwt.JwtPayload | string | undefined) => {
    if (err) {
      return res.redirect("/");
    } else {
      next();
    }
  });
}