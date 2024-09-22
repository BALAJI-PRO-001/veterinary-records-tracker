import {NewCow } from "./types";



class ValidationError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}


export default function validateCowRequiredData(cows: NewCow[]): ValidationError | void {
  const requiredFields: (keyof NewCow)[] = ["name", "breed", "bullName", "injectionInfoAndAiDates"];

  for (let [currentCowIndex, cow] of Object.entries(cows)) {
    for (let field of requiredFields) {
      if (!cow[field]) {
        throw new ValidationError(400, `Bad Request: Cow[${currentCowIndex}] ${field} is required.`);
      }
    }

    for (let [index, { name, cost, date }] of Object.entries(cow.injectionInfoAndAiDates)) {
      if (!name || !cost || !date) {
        const missingField = !name ? 'injection name' : !cost ? 'injection cost' : 'ai date';
        throw new ValidationError(400, `Bad Request: Cow[${currentCowIndex}] InjectionInfoAndAiDates[${index}] ${missingField} is required.`);
      }
    }
  }
}