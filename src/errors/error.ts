export class MissingFieldError extends Error {
    constructor(fieldName: string) {
        super(`Missing required field: ${fieldName}`);
        this.name = "MissingFieldError";
    }
}