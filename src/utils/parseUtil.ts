import { JSONError } from "../errors/error";

export function parseJSON(arg: string) {
    try {
        return JSON.parse(arg);
    } catch (error) {
        throw new JSONError(error.message)
    }
}