import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from "uuid";

import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({});

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {

    const command = new ListBucketsCommand({});
    const buckets = (await s3Client.send(command)).Buckets;


    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello, World from Lambda!",
            requestId: context.awsRequestId,
            uniqueId: v4(),
            buckets: buckets
        }),
    };

    console.log("Event received:", event);
    return response;
}