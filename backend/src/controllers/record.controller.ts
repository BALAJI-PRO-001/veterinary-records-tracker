import { Request, Response, NextFunction } from "express";
import Record from "../models/record.model";
import errorHandler from "../utils/errorHandler";
import validateUserRequiredData from "../utils/validateUserRequiredData";
import validateCowRequiredData from "../utils/validateCowRequiredData";
import validateInjectionInfoAndAiDateRequiredData from "../utils/validateInjectionInfoAndAiDateRequiredData";
import validateURLId from "../utils/validateURLId";


export async function createNewRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user, cows } = req.body;
    if (!user || !cows) {
      return next(errorHandler(400, "Bad Request: User or cows data is missing."));
    }    

    validateUserRequiredData(user);
    validateCowRequiredData(cows);

    try {
      const isPhoneNumberAlreadyInUse = await Record.isPhoneNumberAlreadyInUse(user.phoneNumber);
      if (isPhoneNumberAlreadyInUse) {
        return next(errorHandler(409, "Duplicate Key: Phone number is already in use by another record."));
      }
    } catch(err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      return next(errorHandler(400, "Bad Request: " + errMessage));
    }

    await Record.createNewRecord({user: user, cows: cows});
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "New record created successfully."
    });
  } catch(err) {
    next(err);
  }
}



export async function getAllRecords(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const records = await Record.getAllRecords();
    res.status(200).json({
      success: true,
      statusCode: 200,
      length: records.length,
      data: {
        records: records
      }
    });
  } catch(err) {
    next(err);
  }
}



export async function getRecordByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId } = req.params;
    validateURLId(userId, "user");

    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "Record not found for the specified user id: " + userId));
    }

    const record = await Record.getRecordByUserId(Number(userId));
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        record: record
      }
    });
  } catch(err) {
    next(err);
  }
}



export async function deleteAllRecords(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await Record.deleteAllRecords();
    res.status(204).json({});
  } catch(err) {
    next(err);
  }
}



export async function deleteRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId } = req.params;
    validateURLId(userId, "user");

    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "Record not found for the specified user id: " + userId));
    }
    await Record.deleteRecordByUserId(Number(userId));
    res.status(204).json({});
  } catch(err) {
    next(err);
  }
}



export async function addNewCowToUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId } = req.params;
    validateURLId(userId, "user");
    
    const isRecordExists = await Record.hasUserRecord(Number(userId));
    if (!isRecordExists) {
      return next(errorHandler(404, "User record not found for the specified user id: " + userId));
    }

    validateCowRequiredData([req.body]);

    await Record.addNewCowToUser(Number(userId), req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `A new cow record successfully created for user id: ${userId}`
    });
  } catch(err) {
    next(err);
  }
}



export async function deleteCowFromUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId, cowId } = req.params;
    validateURLId(userId, "user");
    validateURLId(cowId, "cow");

    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "User record not found for the specified user id: " + userId));
    }

    const isCowRecordAvailable = await Record.hasCowRecord(Number(cowId));
    if (!isCowRecordAvailable) {
      return next(errorHandler(404, "Cow record not found for the specified cow id: " + cowId));
    }

    await Record.deleteCowFromUser(Number(cowId));
    res.status(204).json({});
  } catch(err) {
    next(err);
  }
}



export async function addNewInjectionInfoAndAiDateToCow(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId, cowId } = req.params;
    validateURLId(userId, "user");
    validateURLId(cowId, "cow");

    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "User record not found for the specified user id: " + userId));
    }

    const isCowRecordAvailable = await Record.hasCowRecord(Number(cowId));
    if (!isCowRecordAvailable) {
      return next(errorHandler(404, "Cow record not found for the specified cow id: " + cowId));
    }

    validateInjectionInfoAndAiDateRequiredData(req.body);

    if (typeof req.body.cost !== "number") {
      return next(errorHandler(400, "Bad Request: Injection cost must be a valid number."));
    }

    await Record.addNewInjectionInfoAndAiDateToCow(Number(cowId), req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `New injection info and AI dates have been successfully created for cow id: ${cowId}.`
    });
  } catch(err) {
    next(err);
  }
}



export async function removeInjectionInfoAndAiDateFromCow(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId, cowId, id } = req.params;
    validateURLId(userId, "user");
    validateURLId(cowId, "cow");
    validateURLId(id, "injectInfoAndAiDates");

    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "User record not found for the specified user id: " + userId));
    }

    const isCowRecordAvailable = await Record.hasCowRecord(Number(cowId));
    if (!isCowRecordAvailable) {
      return next(errorHandler(404, "Cow record not found for the specified cow id: " + cowId));
    }

    const isInjectionInfoAndAiDateRecordAvailable = await Record.hasInjectionInfoAndAiDateRecord(Number(id));
    if (!isInjectionInfoAndAiDateRecordAvailable) {
      return next(errorHandler(404, "Injection info and ai dates record not found for the specific id: " + id));
    }

    await Record.removeInjectionInfoAndAiDateFromCow(Number(id));
    res.status(204).json({});
  } catch(err) {
    next(err);
  }
}




export async function updateUserRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
  try { 
    const { userId } = req.params;
    validateURLId(userId, "user");

    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "User record not found for the specified user id: " + userId));
    }

    if (req.body.id) {
      return next(errorHandler(400, "Bad Request: Cannot update user id."));
    }

    if (req.body && Object.keys(req.body).length === 0) {
      return next(errorHandler(400, "Bad Request: Update failed, no data provided for update."));
    }

    const updatedUser = await Record.updateUserRecordById(Number(userId), req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        user: updatedUser
      }
    });
  } catch(err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    if (errMessage.includes("Phone number must be a valid number with exactly 10 digits.")) {
      return next(errorHandler(400, "Bad Request: " + errMessage));
    }

    if (errMessage.includes("SQLITE_CONSTRAINT: UNIQUE constraint failed: users.phone_number")) {
      return next(errorHandler(409, "Duplicate Key: Phone number is already in use by another record."));
    }
    next(err);
  }
}



export async function updateCowRecord(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, cowId } = req.params;
    validateURLId(userId, "user");
    validateURLId(cowId, "cow");

    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "User record not found for the specified user id: " + userId));
    }

    const isCowRecordAvailable = await Record.hasCowRecord(Number(cowId));
    if (!isCowRecordAvailable) {
      return next(errorHandler(404, "Cow record not found for the specified cow id: " + cowId));
    }

    if (req.body.id) {
      return next(errorHandler(400, "Bad Request: Cannot update cow id."));
    }

    if (req.body && Object.keys(req.body).length === 0) {
      return next(errorHandler(400, "Bad Request: Update failed, no data provided for update."));
    }

    const updatedCow = await Record.updateCowRecordById(Number(cowId), req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        cow: updatedCow
      }
    });
  } catch(err) {
    next(err);
  }
}



export async function updateInjectionInfoAndAiDate(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, cowId, id } = req.params;
    validateURLId(userId, "user");
    validateURLId(cowId, "cow");
    validateURLId(id, "inject info and ai dates");

    const isUserRecordAvailable = await Record.hasUserRecord(Number(userId));
    if (!isUserRecordAvailable) {
      return next(errorHandler(404, "User record not found for the specified user id: " + userId));
    }

    const isCowRecordAvailable = await Record.hasCowRecord(Number(cowId));
    if (!isCowRecordAvailable) {
      return next(errorHandler(404, "Cow record not found for the specified cow id: " + cowId));
    }

    const isInjectionInfoAndAiDateRecordAvailable = await Record.hasInjectionInfoAndAiDateRecord(Number(id));
    if (!isInjectionInfoAndAiDateRecordAvailable) {
      return next(errorHandler(404, "Injection info and ai dates record not found for the specific id: " + id));
    }

    if (req.body.id) {
      return next(errorHandler(400, "Bad Request: Cannot update injection info ai dates id."));
    }

    if (req.body && Object.keys(req.body).length === 0) {
      return next(errorHandler(400, "Bad Request: Update failed, no data provided for update."));
    }

    const updatedInjectionInfoAndAiDate = await Record.updateInjectionInfoAndAiDate(Number(id), req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        injectionInfoAndAiDate: updatedInjectionInfoAndAiDate
      }
    })
  } catch(err) {
    next(err);
  }
}