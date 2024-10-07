import { Request, Response, NextFunction } from "express";
import errorHandler from "./errorHandler";
import validateFieldsDataTypeAndValue from "./validateFieldsDataTypeAndValue";

export default function validateAdminCredentials(req: Request, res: Response, next: NextFunction): void {
  try {
    if (Object.entries(req.body).length === 0) {
      return next(errorHandler(400, "Bad Request: Both admin email and password is required."));
    }

    if (!req.body.email) {
      return next(errorHandler(400, "Bad Request: Admin email is required and cannot be (empty, null or undefined)."));
    }

    if (!req.body.password) {
      return next(errorHandler(400, "Bad Request: Admin password is required and cannot be (empty, null or undefined)."))
    }

    const fields = [
      {property: {name: "email", value: req.body.email}, dataType: "string"},
      {property: {name: "password", value: req.body.password}, dataType: "string"}
    ];
    validateFieldsDataTypeAndValue(fields);
    next();
  } catch(err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    next(errorHandler(400, "Bad Request: Admin " + errMessage));
  }
}