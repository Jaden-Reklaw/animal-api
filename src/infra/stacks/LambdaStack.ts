import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import path = require('node:path');
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';

interface LambdaStackProps extends StackProps {
    animalsTable: ITable;
}
export class LambdaStack extends Stack {

    public readonly lambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        // Define your Lambda function here
        const helloLambda = new LambdaFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'hello.main',
            code: Code.fromAsset(path.resolve(__dirname, '../../services')),
            environment: {
                TABLE_NAME: props.animalsTable.tableName
            }
        });

        this.lambdaIntegration = new LambdaIntegration(helloLambda);
    }
}