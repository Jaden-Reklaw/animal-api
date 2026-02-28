import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello, World from Lambda!",
            input: event,
        })
    };

    console.log("Event received:", event);
    return response;
}