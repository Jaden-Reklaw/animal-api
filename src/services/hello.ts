import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from "uuid"; 

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello, World from Lambda!",
            requestId: context.awsRequestId,
            uniqueId: v4()
        }),
    };

    console.log("Event received:", event);
    return response;
}