import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface RestApiStackProps extends StackProps {
    animalsLambdaIntegration: LambdaIntegration; 
}

export class RestApiStack extends Stack {
    constructor(scope: Construct, id: string, props: RestApiStackProps) {
        super(scope, id, props);
        // Define your REST API stack resources here

        const api = new RestApi(this, 'AnimalsApi');
        const animalsResource = api.root.addResource('animals');
        animalsResource.addMethod('GET', props.animalsLambdaIntegration);
        animalsResource.addMethod('POST', props.animalsLambdaIntegration);
        animalsResource.addMethod('PUT', props.animalsLambdaIntegration);
        animalsResource.addMethod('DELETE', props.animalsLambdaIntegration);
    }
}