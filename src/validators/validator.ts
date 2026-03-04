import { Animal } from "../models/animal";
import { MissingFieldError } from "../errors/error";

export function validateAsAnimal(arg: any) {
    if ((arg as Animal).location == undefined) {
        throw new MissingFieldError('location')
    }
    if ((arg as Animal).name == undefined) {
        throw new MissingFieldError('name')
    }
    if ((arg as Animal).id == undefined) {
        throw new MissingFieldError('id')
    }
}