import { Request, Response, NextFunction} from "express";
import validateFieldsDataTypeAndValue from "./validateFieldsDataTypeAndValue";
import errorHandler from "./errorHandler";



export default function validateSuperUserCredentials(req: Request, res: Response, next: NextFunction): void {
  try {
    if (Object.entries(req.body).length !== 2) {
      return next(errorHandler(400, "Bad Request: Both Superuser email and password is required."));
    }

    const fields = [
      {property: {name: "email", value: req.body.email}, dataType: "string"},
      {property: {name: "password", value: req.body.password}, dataType: "string"}
    ];
    validateFieldsDataTypeAndValue(fields);
    next();
  } catch(err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    next(errorHandler(400, "Bad Request: Superuser " + errMessage));

  }
}