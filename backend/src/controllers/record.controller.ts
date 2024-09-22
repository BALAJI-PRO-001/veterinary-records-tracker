import { Request, Response, NextFunction } from "express";
import Record from "../models/record.model";
import errorHandler from "../utils/errorHandler";
import validateUserRequiredData from "../utils/validateUserRequiredData";
import validateCowRequiredData from "../utils/validateCowRequiredData";



export async function createNewRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user, cows } = req.body;
    if (!user || !cows) {
      return next(errorHandler(400, "Bad Request: User or cows data is missing."));
    }    

    try {
      validateUserRequiredData(user);
      validateCowRequiredData(cows);
    } catch(err) {
      return next(err);
    }

    
    const isPhoneNumberAlreadyInUse = await Record.isPhoneNumberAlreadyInUse(user.phoneNumber);
    if (isPhoneNumberAlreadyInUse) {
      return next(errorHandler(409, "Duplicate Key: Phone number is already in use by another record."));
    }

    const newRecord = await Record.createNewRecord(user, cows);
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: {
        record: newRecord
      }
    });
  } catch(err) {
    next(err);
  }
}



export async function getAllRecords(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const records = await Record.getAllRecords();
    res.json(records);
  } catch(err) {
    next(err);
  }
}