import { Request, Response, NextFunction } from "express";
import errorHandler from "./errorHandler";
import validateFieldDataType from "./validateFieldDataType";
import validateFieldValues from "./validateFieldValues";

export default function validateAdminCredentials(req: Request, res: Response, next: NextFunction): void {
  try {
    const fields = [
      {property: {name: "email", value: req.body.email}, dataType: "string"},
      {property: {name: "password", value: req.body.password}, dataType: "string"}
    ];
    validateFieldDataType(fields);
    validateFieldValues(req.body);
    next();
  } catch(err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    next(errorHandler(400, "Bad Request: Admin " + errMessage));
  }
}