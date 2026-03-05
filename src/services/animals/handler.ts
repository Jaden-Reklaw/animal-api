import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { HttpMethod } from "../../enums/httpMethod";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getAnimals, getAnimal, postAnimal, updateAnimal, deleteAnimal } from "./data";
import { JSONError, MissingFieldError } from "../../errors/error";

const ddbClient = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    try {

        let response: APIGatewayProxyResult;

        switch (event.httpMethod) {
            case HttpMethod.GET:
                if (event.queryStringParameters && 'id' in event.queryStringParameters)
                    response = await getAnimal(event, ddbDocClient);
                else
                    response = await getAnimals(ddbDocClient);
                return response;
            case HttpMethod.POST:
                response = await postAnimal(event, ddbDocClient);
                return response;
            case HttpMethod.PUT:
                response = await updateAnimal(event, ddbDocClient);
                return response;
            case HttpMethod.DELETE:
                response = await deleteAnimal(event, ddbDocClient);
                return response
            default:
                response = {
                    statusCode: 400,
                    body: JSON.stringify({ message: "Handling unknown HTTP method" }),
                };
                break;
        }

        return response;
    } catch (error) {
        console.error("Error handling request:", error);
        if (error instanceof MissingFieldError) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.message }),
            };
        }
        if (error instanceof JSONError) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.message }),
            };
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    } finally {
        console.log("Request processing completed.");
    }

}