import { NewUser } from "./types";


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
  const dataType = {name: "string", phoneNumber: "number", address: "string"};
  for (let field of requiredFields) {
    if (user[field] === undefined || user[field] === "" || user[field] === null) {
      throw new UserDataValidationError(400, `Bad Request: User ${field} is required and cannot be (empty, null, or undefined).`);
    }

    if (typeof user[field] !== dataType[field]) {
      throw new UserDataValidationError(400, `Bad Request: User '${field}' must be a ${dataType[field]}`);
    }
  }
}