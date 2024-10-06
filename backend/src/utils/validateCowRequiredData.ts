import { NewCow } from "./types";
import validateFieldDataType from "./validateFieldDataType";
import validateFieldValues from "./validateFieldValues";



class CowDataValidationError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}



export default function validateCowRequiredData(cows: NewCow[]): CowDataValidationError | void {
  if (cows.length === 0) {
    throw new CowDataValidationError(400, "Bad Request: Cows data must contain at least one cow entry.");
  }  

  for (let [currentCowIndex, cow] of Object.entries(cows)) {
    if (Object.keys(cow).length === 0) {
      throw new CowDataValidationError(400, `Bad Request: Cow[${currentCowIndex}] missing required cow data (name, breed, bullName, injectionInfoAndAiDates).`);
    }

    const fields = [
      {property: {name: "name", value: cow.name}, dataType: "string"},
      {property: {name: "breed", value: cow.breed}, dataType: "string"},
      {property: {name: "bullName", value: cow.bullName}, dataType: "string"},
      {property: {name: "injectionInfoAndAiDates", value: cow.injectionInfoAndAiDates}, dataType: "object"},
    ];

    try {
      validateFieldDataType(fields);
      validateFieldValues(cow);
    } catch(err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      throw new CowDataValidationError(400, `Bad Request: Cow[${currentCowIndex}] ` + errMessage);
    }

    if (cow.injectionInfoAndAiDates.length === 0) {
      throw new CowDataValidationError(400, `Bad Request: Cow[${currentCowIndex}] injectionInfoAndAiDates must contain at least one entry for each cow.`);
    }  

    for (let [currentIndex, injectionInfoAndAiDate] of Object.entries(cow.injectionInfoAndAiDates)) {
      if (Object.keys(injectionInfoAndAiDate).length === 0) {
        throw new CowDataValidationError(400, `Bad Request: InjectionInfoAndAiDate[${currentIndex}] missing required data (name, price, givenAmount, date).`);
      }

      try {
        const fields = [
          {property: {name: "name", value: injectionInfoAndAiDate.name}, dataType: "string"},
          {property: {name: "cost", value: injectionInfoAndAiDate.cost},  dataType: "number"},
          {property: {name: "date", value: injectionInfoAndAiDate.date}, dataType: "string"},
        ];
        validateFieldDataType(fields);
        validateFieldValues(injectionInfoAndAiDate);
      } catch(err) {
        const errMessage = err instanceof Error ? err.message : String(err);
        throw new CowDataValidationError(400, `Bad Request: Cow[${currentCowIndex}] InjectionInfoAndAiDates[${currentIndex}] ` + errMessage);
      }
    }
  }
}