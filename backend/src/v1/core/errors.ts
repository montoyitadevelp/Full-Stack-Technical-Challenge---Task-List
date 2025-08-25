export class ApplicationError extends Error {
    public code: number;

    constructor(code: number, message: string) {
        super(message); 
        this.code = code;


        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}

export class BadRequestError extends ApplicationError {
    constructor(message: string) {
        super(400, message);

    }
}

export class UnauthorizedError extends ApplicationError {
    constructor(message = 'Unauthorized') {
        super(401, message);
    }
}

export class ForbiddenError extends ApplicationError {
    constructor(message = 'Forbidden') {
        super(403, message);
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message = 'Not Found') {
        super(404, message);
    }
}

export class MissingFieldError extends BadRequestError {
    constructor(fieldName: string) {
        super(`${fieldName} is required`);
    }
}

export class InternalError extends ApplicationError {
    constructor(message = 'Internal Server Error') {
        super(500, message);
    }
}

export class RepositoryMissingField extends BadRequestError {
    constructor() {
        super('Field missing');
    }
}
