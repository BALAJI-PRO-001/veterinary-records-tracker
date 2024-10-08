import { NewUser } from "./types";
import validateFieldsDataTypeAndValue from "./validateFieldsDataTypeAndValue";


class UserDataValidationError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}


export default function validateUserRequiredData(user: NewUser): UserDataValidationError | void {

  if (Object.keys(user).length !== 3) {
    throw new UserDataValidationError(400, "Bad Request: Missing required user data (name, phoneNumber, address).");
  }

  const requiredFields: (keyof NewUser)[] = ["name", "phoneNumber", "address"];
  for (let field of requiredFields) {
    if (!user[field]) {
      throw new UserDataValidationError(400, `Bad Request: The User '${field}' field is required but missing.`);
    }
  }

  const fields = [
    {property: {name: "name", value: user.name}, dataType: "string"},
    {property: {name: "phoneNumber", value: user.phoneNumber}, dataType: "number"},
    {property: {name: "address", value: user.address},dataType: "string"}
  ];

  try {
    validateFieldsDataTypeAndValue(fields);
  } catch(err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    throw new UserDataValidationError(400, "Bad Request: User " + errMessage);
  }
}