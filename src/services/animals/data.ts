import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { 
    DynamoDBDocumentClient, 
    GetCommand, 
    ScanCommand, 
    PutCommand, 
    UpdateCommand,
    DeleteCommand
 } from "@aws-sdk/lib-dynamodb";

export async function postAnimal(event: APIGatewayProxyEvent, ddbClient: DynamoDBDocumentClient): Promise<APIGatewayProxyResult> {

    const randomId = v4().toUpperCase();
    const item = JSON.parse(event.body);
    item.id = randomId;

    const result = await ddbClient.send(new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: item
    }));
    console.log(result);

    return {
        statusCode: 201,
        body: JSON.stringify({ id: randomId })
    }
}

export async function getAnimals(ddbClient: DynamoDBDocumentClient): Promise<APIGatewayProxyResult> {
    const result = await ddbClient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME
    }));

    return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
    }
}

export async function getAnimal(event: APIGatewayProxyEvent, ddbClient: DynamoDBDocumentClient): Promise<APIGatewayProxyResult> {
    const animalId = event.queryStringParameters['id'];
    const getItemResponse = await ddbClient.send(new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id: animalId }
    }))
    if (getItemResponse.Item) {
        return {
            statusCode: 200,
            body: JSON.stringify(getItemResponse.Item)
        }
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify(`Animal with id ${animalId} not found!`)
        }
    }
}

export async function updateAnimal(event: APIGatewayProxyEvent, ddbClient: DynamoDBDocumentClient): Promise<APIGatewayProxyResult> {

    if (event.queryStringParameters && ('id' in event.queryStringParameters) && event.body) {

        const parsedBody = JSON.parse(event.body);
        const animalId = event.queryStringParameters['id'];
        const requestBodyKey = Object.keys(parsedBody)[0];
        const requestBodyValue = parsedBody[requestBodyKey];

        const updateResult = await ddbClient.send(new UpdateCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id': animalId
            },
            UpdateExpression: 'set #zzzNew = :new',
            ExpressionAttributeValues: {
                ':new': requestBodyValue
                },
            ExpressionAttributeNames: {
                '#zzzNew': requestBodyKey
            },
            ReturnValues: 'UPDATED_NEW'
        }));

        return {
            statusCode: 204,
            body: JSON.stringify(updateResult)
        }

    }
    return {
        statusCode: 400,
        body: JSON.stringify('Please provide right args!!')
    }

}

export async function deleteAnimal(event: APIGatewayProxyEvent, ddbClient: DynamoDBDocumentClient): Promise<APIGatewayProxyResult> {

    if (event.queryStringParameters && ('id' in event.queryStringParameters)) {
        const animalId = event.queryStringParameters['id'];
        
        await ddbClient.send(new DeleteCommand({
            TableName: process.env.TABLE_NAME,
            Key: { 'id': animalId }
        }));
        
        return {
            statusCode: 204,
            body: JSON.stringify({})
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify('Please provide right args!!')
    }
}