import { Request, Response, NextFunction } from "express";
import Record from "../models/record.model";
import errorHandler from "../utils/errorHandler";
import validateUserRequiredData from "../utils/validateUserRequiredData";
import validateCowRequiredData from "../utils/validateCowRequiredData";
import validateInjectionInfoAndAiDatesRequiredData from "../utils/validateInjectionInfoAndAiDatesRequiredData";
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
      return next(errorHandler(400, errMessage));
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



export async function addNewInjectionInfoAndAiDatesToCow(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    validateInjectionInfoAndAiDatesRequiredData(req.body);

    if (typeof req.body.cost !== "number") {
      return next(errorHandler(400, "Bad Request: Injection cost must be a valid number."));
    }

    await Record.addNewInjectionInfoAndAiDatesToCow(Number(cowId), req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: `New injection info and AI dates have been successfully created for cow id: ${cowId}.`
    });
  } catch(err) {
    next(err);
  }
}



export async function removeInjectionInfoAndAiDatesFromCow(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    const isInjectionInfoAndAiDatesRecordAvailable = await Record.hasInjectionInfoAndAiDatesRecord(Number(id));
    if (!isInjectionInfoAndAiDatesRecordAvailable) {
      return next(errorHandler(404, "Injection info and ai dates record not found for the specific id: " + id));
    }

    await Record.removeInjectionInfoAndAiDatesFromCow(Number(id));
    res.status(204).json({});
  } catch(err) {
    next(err);
  }
}



export async function updateRecord(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    validateURLId(userId, "user");

    const isRecordExists = await Record.hasUserRecord(Number(userId));
    if (!isRecordExists) {
      return next(errorHandler(404, "Record not found for the specified user id: " + userId));
    }

    if (Object.keys(req.body).length == 0) {
      return next(errorHandler(400, "Bad Request: Cannot update data because the provided input is empty."));
    }

    const { user, cows } = req.body;

    if (user && user.id) {
      return next(errorHandler(400, "Bad Request: Cannot update user id."));
    }

    if (cows && cows.length > 0) {
      for (let [currentCowIndex, cow] of Object.entries(cows) as unknown as any) {
        if (!cow.id) {
          return next(errorHandler(400, `Bad Request: Cow[${currentCowIndex}] id is required and cannot be (empty, null or undefined).`));
        }

        const isCowRecordAvailable = await Record.hasCowRecord(cow.id);
        if (!isCowRecordAvailable) {
          return next(errorHandler(404, "Cow record not found for the specific cow id: " + cow.id));
        }

        if (cow.injectionInfoAndAiDates) {
          for (let [index, injectionInfoAndAiDates] of Object.entries(cow.injectionInfoAndAiDates) as unknown as any) {
            if (!injectionInfoAndAiDates.id) {
              return next(errorHandler(400, `Bad Request: Cow[${currentCowIndex}] InjectionInfoAndAiDates[${index}] id is required and cannot be (empty, null or undefined).`));
            }
  
            const isInjectInfoAndAiDatesRecordAvailable = await Record.hasInjectionInfoAndAiDatesRecord(injectionInfoAndAiDates.id);
            if (!isInjectInfoAndAiDatesRecordAvailable) {
              return next(errorHandler(404, "Injection info and ai dates record not found for the specific id " + injectionInfoAndAiDates.id));
            }
          }  
        }
      }
    }

    const updatedRecord = await Record.updateRecord({user: {id: userId, ...user}, cows: cows});

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        record: updatedRecord
      }
    });
  } catch(err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    if (errMessage.includes("SQLITE_CONSTRAINT: UNIQUE constraint failed: users.phone_number")) {
      return next(errorHandler(409, "Duplicate Key: Phone number is already in use by another record."));
    }
    console.log(err);
    next(err);
  }
}