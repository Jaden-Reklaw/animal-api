import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path = require('path');

interface LambdaStackProps extends StackProps {
    animalsTable: ITable;
}
export class LambdaStack extends Stack {

    public readonly lambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        // Define your Lambda function here
        const helloLambda = new NodejsFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'handler',
            entry: path.resolve(__dirname, '../../services/hello.ts'),
            environment: {
                TABLE_NAME: props.animalsTable.tableName
            }
        });

        this.lambdaIntegration = new LambdaIntegration(helloLambda);
    }
}