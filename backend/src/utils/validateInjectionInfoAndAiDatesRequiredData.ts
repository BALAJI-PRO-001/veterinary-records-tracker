import { InjectionInfoAndAiDates } from "../utils/types";

class ValidationError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default function validateInjectionInfoAndAiDatesRequiredData(injectionInfoAndAiDates: InjectionInfoAndAiDates): ValidationError | void {
  if (!injectionInfoAndAiDates.name) {
    throw new ValidationError(400, "Bad Request: Injection name is required.");
  }

  if (!injectionInfoAndAiDates.cost) {
    throw new ValidationError(400, "Bad Request: Injection cost is required.");
  }

  if (!injectionInfoAndAiDates.date) {
    throw new ValidationError(400, "Bad Request: Ai date is required.");
  }
}