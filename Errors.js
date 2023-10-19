export class BadRequestError extends Error {
  constructor(err = {}, message = "Bad request") {
    super(message);
    this.name = "Bad Request";
    this.statusCode = 400;
    this.cause = err;
    this.stack = null;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends Error {
  constructor(err = {}, message = "Unauthorized") {
    super(message);
    this.name = "Unauthorized";
    this.statusCode = 401;
    this.cause = err;
    this.stack = null;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ForbiddenError extends Error {
  constructor(err = {}, message = "Forbidden") {
    super(message);
    this.name = "Forbidden";
    this.statusCode = 403;
    this.cause = err;
    this.stack = null;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends Error {
  constructor(err = {}, message = "Not found") {
    super(message);
    this.name = "NotFound";
    this.statusCode = 404;
    this.cause = err;
    this.stack = null;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ConflictError extends Error {
  constructor(err = {}, message = "Already exist") {
    super(message);
    this.name = "Conflict";
    this.statusCode = 409;
    this.cause = err;
    this.stack = null;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ImportFormatError extends Error {
  constructor(err = {}, message = "Import format error") {
    super(message);
    this.name = "Import Format Error";
    this.statusCode = 500;
    this.cause = err;
    this.stack = null;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class WhitelistServerError extends Error {
  constructor(err = {}, message = "Whitelist server error") {
    super(message);
    this.name = "Whitelist Server Error";
    this.statusCode = 500;
    this.cause = err;
    this.stack = null;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InternalServerError extends Error {
  constructor(err = {}, message = "Internal server error") {
    super(message);
    this.name = "Internal Server Error";
    this.statusCode = 500;
    this.cause = err;
    this.stack = null;
    Error.captureStackTrace(this, this.constructor);
  }
}
