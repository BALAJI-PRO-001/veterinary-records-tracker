import {NewCow } from "./types";



class CowDataValidationError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}



export default function validateCowRequiredData(cows: NewCow[]): CowDataValidationError | void {
  const requiredFields: (keyof NewCow)[] = ["name", "breed", "bullName", "injectionInfoAndAiDates"];

  if (cows.length === 0) {
    throw new CowDataValidationError(400, "Bad Request: Cows data must contain at least one cow entry.");
  }  

  for (let [currentCowIndex, cow] of Object.entries(cows)) {
    for (let field of requiredFields) {
      if (cow[field] === undefined || cow[field] === "" || cow[field] === null) {
        throw new CowDataValidationError(400, `Bad Request: Cow[${currentCowIndex}] ${field} is required and cannot be (empty, null, or undefined).`);
      }
    }

    if (cow.injectionInfoAndAiDates.length === 0) {
      throw new CowDataValidationError(400, `Bad Request: Cow[${currentCowIndex}] injectionInfoAndAiDates must contain at least one entry for each cow.`);
    }    

    for (let [index, { name, cost, date }] of Object.entries(cow.injectionInfoAndAiDates)) {
      if (!name || !cost || !date) {
        const missingField = !name ? 'injection name' : !cost ? 'injection cost' : 'ai date';
        throw new CowDataValidationError(400, `Bad Request: Cow[${currentCowIndex}] InjectionInfoAndAiDates[${index}] ${missingField} is required and cannot be (empty, null or undefined).`);
      }
    }
  }
}