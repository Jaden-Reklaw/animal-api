export class MissingFieldError extends Error {
    constructor(fieldName: string) {
        super(`Missing required field: ${fieldName}`);
        this.name = "MissingFieldError";
    }
}

export class JSONError extends Error {
    constructor(message: string) {
        super(`JSON parsing error: ${message}`);
        this.name = "JSONError";
    }
}