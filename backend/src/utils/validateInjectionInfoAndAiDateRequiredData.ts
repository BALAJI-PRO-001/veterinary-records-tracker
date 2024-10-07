import { InjectionInfoAndAiDate } from "./types";
import validateFieldsDataTypeAndValue from "./validateFieldsDataTypeAndValue";

class InjectionInfoAndAiDateDataValidationError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default function validateInjectionInfoAndAiDateRequiredData(injectionInfoAndAiDate: InjectionInfoAndAiDate): InjectionInfoAndAiDateDataValidationError | void { 
  if (Object.keys(injectionInfoAndAiDate).length !== 3) {
    throw new InjectionInfoAndAiDateDataValidationError(400, "Bad Request: Missing required injection info and ai dates data (name, price, givenAmount, pendingAmount, date).");
  }

  try {
    const fields = [
      {property: {name: "name", value: injectionInfoAndAiDate.name}, dataType: "string"},
      {property: {name: "price", value: injectionInfoAndAiDate.price}, dataType: "number"},
      {property: {name: "givenAmount", value: injectionInfoAndAiDate.givenAmount}, dataType: "number"},
      {property: {name: "pendingAmount", value: injectionInfoAndAiDate.pendingAmount}, dataType: "number"},
      {property: {name: "date", value: injectionInfoAndAiDate.date}, dataType: "string"}
    ];
    validateFieldsDataTypeAndValue(fields);
  } catch(err) {
    throw new InjectionInfoAndAiDateDataValidationError(400, "Bad Request: InjectionInfoAndAiDate ");
  }
}