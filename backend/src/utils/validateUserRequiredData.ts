import { NewUser } from "./types";


class UserDataValidationError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}


export default function validateUserRequiredData(user: NewUser): UserDataValidationError | void {
  const requiredFields: (keyof NewUser)[] = ["name", "phoneNumber", "address"];
  for (let field of requiredFields) {
    if (user[field] === undefined || user[field] === "" || user[field] === null) {
      throw new UserDataValidationError(400, `Bad Request: User ${field} is required and cannot be (empty, null, or undefined).`);
    }
  }
}