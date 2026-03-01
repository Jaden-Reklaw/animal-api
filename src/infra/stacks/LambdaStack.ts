import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path = require('path');
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

interface LambdaStackProps extends StackProps {
    animalsTable: ITable;
}

export class LambdaStack extends Stack {

    public readonly animalsLambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        // Define your Lambda function here
        const animalsLambda = new NodejsFunction(this, 'AnimalsLambda', {
            runtime: Runtime.NODEJS_22_X,
            handler: 'handler',
            entry: path.resolve(__dirname, '../../services/animals/handler.ts'),
            environment: {
                TABLE_NAME: props.animalsTable.tableName
            }
        });

        animalsLambda.addToRolePolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [props.animalsTable.tableArn],
            actions: [
                'dynamodb:PutItem',
                'dynamodb:Scan',
                'dynamodb:GetItem',
                'dynamodb:UpdateItem',
                'dynamodb:DeleteItem'
            ]
        }))



        this.animalsLambdaIntegration = new LambdaIntegration(animalsLambda);
    }
}