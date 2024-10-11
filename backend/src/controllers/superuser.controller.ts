import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { SQLITE3_DATABASE_DIR_PATH } from "../utils/constants";
import { access } from "fs/promises";
dotenv.config();


export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    const superUsers = [
      {
        email: process.env.SUPER_USER_1_EMAIL,
        password: process.env.SUPER_USER_1_PASSWORD
      },
      {
        email: process.env.SUPER_USER_2_EMAIL,
        password: process.env.SUPER_USER_2_PASSWORD
      }
    ];

    if (email !== superUsers[0].email && email !== superUsers[1].email) {
      return next(errorHandler(404, "Superuser not found: Invalid Email."));
    }

    if (
      email === superUsers[0].email && !bcryptjs.compareSync(password, superUsers[0].password as string) ||
      email === superUsers[1].email && !bcryptjs.compareSync(password, superUsers[1].password as string) 
    ) {
      return next(errorHandler(401, "Unauthorized: Invalid Password."))
    }

    const superUserAccessToken = jwt.sign({email: email}, process.env.JWT_SECRET_KEY as string);
    res.status(200).cookie("super_user_access_token", superUserAccessToken, {httpOnly: true}).json({
      success: true,
      statusCode: 200,
      message: "Superuser logged in successfully."
    });
  } catch(err) {
    next(err);
  }
} 


export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.status(200).clearCookie("super_user_access_token").json({
      success: true,
      statusCode: 200,
      message: "Superuser has been logged out successfully."
    });
  } catch(err) {
    next(err);
  }
}



export async function downloadDB(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await access(SQLITE3_DATABASE_DIR_PATH + "database.db");
    res.download(SQLITE3_DATABASE_DIR_PATH + "database.db");
  } catch(err) {
    next(errorHandler(404, "File not found. Unable to provide requested file."));
  }
}