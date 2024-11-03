import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { SQLITE3_DATABASE_DIR_PATH } from "../utils/constants";
import { access } from "fs/promises";
import { rename, unlink } from "fs";
import path from "path";
import upload from "../utils/multer";
import commandExecutor from "../utils/commandExecutor";
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



export async function downloadDatabase(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await access(SQLITE3_DATABASE_DIR_PATH + "database.db");
    res.download(SQLITE3_DATABASE_DIR_PATH + "database.db");
  } catch(err) {
    next(errorHandler(404, "File not found. Unable to provide requested file."));
  }
}



export async function updateDatabase(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return next(err);
      }  
      
      if (!req.file) {
        return next(errorHandler(400, "File not selected."))
      }

      access(SQLITE3_DATABASE_DIR_PATH + "database.db")
        .then(() => {
          unlink(SQLITE3_DATABASE_DIR_PATH + "database.db", (err) => {
            if (err) {
              throw err;
            }
          });

          const NEW_DB_FILE_PATH = path.join(__dirname, "../uploads/database.db");
          const OLD_DB_FILE_PATH = SQLITE3_DATABASE_DIR_PATH + "database.db";
          rename(NEW_DB_FILE_PATH, OLD_DB_FILE_PATH, (err) => {
            if (err) {
              throw err;
            }
          });

          res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Database updated successfully. Restarting the server.",
          });

          process.exit(0);
        })
        .catch((err) => {
          return next(errorHandler(404, "Database not found: Old database could not be found."));
        })
    });
  } catch(err) {
    next(err);
  }
}



export async function serverActions(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    console.log("HI");
  } catch(err) {
    next(err);
  }
}


export async function serverStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.status(200).json({
      success: true,
      message: "Server running without any error."
    });
  } catch(err) {
    next(err);
  }
}


export async function executeCommand(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
   const output = await commandExecutor.executeCommand();
   res.status(200).json({
     success: true,
     output: output
   });
  } catch(err) {
    next(err);
  }
}