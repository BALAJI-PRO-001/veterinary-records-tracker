class ValidateURLIdError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}


export default function validateURLId(id: any, name: string): ValidateURLIdError | void {
  const regex = /^[0-9]+$/;
  if (!regex.test(id)) {
    throw new ValidateURLIdError(400, `Bad Request: Invalid ${name} id in URL. The id must be a number, but '${id}' provided.`);
  }
  
  if (id <= 0) {
    throw new ValidateURLIdError(400, `Bad Request: Invalid ${name} id in URL. The id must be greater than 0.`);
  }
}