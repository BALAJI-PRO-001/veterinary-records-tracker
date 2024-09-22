import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";


export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    if (email !== process.env.ADMIN_EMAIL) {
      return next(errorHandler(404, "Admin not found: Invalid email."));
    }

    if (!bcryptjs.compareSync(password, process.env.ADMIN_PASSWORD as string)) {
      return next(errorHandler(401, "Unauthorized: Invalid password."));
    }

    const adminAccessToken = jwt.sign({email: process.env.ADMIN_EMAIL}, process.env.JWT_SECRET_KEY as string);
    res.status(200).cookie("admin_access_token", adminAccessToken, {httpOnly: true}).json({
      success: true,
      statusCode: 200,
      message: "Admin logged in successfully."
    });
  } catch(err) {
    next(err);
  }
}



export async function logOut(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.status(200).clearCookie("admin_access_token").json({
      success: false,
      statusCode: 200,
      message: "Admin has been logged out successfully"
    });
  } catch(err) {
    next(err);
  }
}
