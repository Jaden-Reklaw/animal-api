import { handler } from "../src/services/animals/handler";

handler({
    httpMethod: "POST",
    body: JSON.stringify({ location: "New York" })
} as any, {} as any);