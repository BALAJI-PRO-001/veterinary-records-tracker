import { NewUser } from "./types";


class ValidationError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}


export default function validateUserRequiredData(user: NewUser): ValidationError | void {
  const requiredFields: (keyof NewUser)[] = ["name", "phoneNumber", "address"];
  for (let field of requiredFields) {
    if (user[field] === undefined) {
      throw new ValidationError(400, `Bad Request: User ${field} is required.`);
    }

    if (user[field] === "") {
      throw new ValidationError(400, `Bad Request: User ${field} cannot be empty.`);
    }

    if (user[field] === null || user[field] === undefined) {
      throw new ValidationError(400, `Bad Request: User ${field} cannot be null.`)
    }
  }
}