class HTTPError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HTTPError";
  }
}

function errorHandler(statusCode: number, message: string) {
  return new HTTPError(statusCode, message);
}

export default errorHandler;