import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import errorHandler from "./errorHandler";
dotenv.config();



function verifyAdminAuthenticationToken(req: Request, res: Response, next: NextFunction) {
  const adminAccessToken = req.cookies.admin_access_token;
  if (!adminAccessToken) {
    return next(errorHandler(401, "Unauthorized: Admin access token is missing in cookies."));
  }
  
  jwt.verify(adminAccessToken, process.env.JWT_SECRET_KEY as string, (err: jwt.VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
    if (err) {
      return next(errorHandler(403, "Forbidden: Invalid admin access token."));
    } 
    next();
  });
}



export default verifyAdminAuthenticationToken;