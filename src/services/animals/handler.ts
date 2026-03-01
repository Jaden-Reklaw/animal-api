import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from "uuid";
import { HttpMethod } from "../../enums/httpMethod";

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    try {

        let message: string;

        switch (event.httpMethod) {
            case HttpMethod.GET:
                message = "Handling GET request";
                break;
            case HttpMethod.POST:
                message = "Handling POST request";
                break;
            case HttpMethod.PUT:
                message = "Handling PUT request";
                break;
            case HttpMethod.DELETE:
                message = "Handling DELETE request";
                break;
            default:
                message = "Handling unknown HTTP method";
                break;
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(message),
        };

        return response;
    } catch (error) {
        console.error("Error handling request:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    } finally {
        console.log("Request processing completed.");
    }

}