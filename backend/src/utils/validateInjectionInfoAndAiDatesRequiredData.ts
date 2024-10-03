import { InjectionInfoAndAiDates } from "../utils/types";

class ValidationError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default function validateInjectionInfoAndAiDatesRequiredData(injectionInfoAndAiDates: InjectionInfoAndAiDates): ValidationError | void { 
  if (Object.keys(injectionInfoAndAiDates).length !== 3) {
    throw new ValidationError(400, "Bad Request: Missing required injection info and ai dates data (name, cost, date).");
  }

  if (injectionInfoAndAiDates.name === "" || injectionInfoAndAiDates.name === null || injectionInfoAndAiDates.name === undefined) {
    throw new ValidationError(400, "Bad Request: Injection name is required and cannot be (empty, null or undefined).");
  }

  if (!injectionInfoAndAiDates.cost) {
    throw new ValidationError(400, "Bad Request: Injection cost is required and cannot be (empty, null or undefined).");
  }

  if (!injectionInfoAndAiDates.date) {
    throw new ValidationError(400, "Bad Request: Injection date is required and cannot be (empty, null or undefined).");
  }
}