import  { App } from 'aws-cdk-lib';
import { DataStack } from './stacks/DataStack';
import { LambdaStack } from './stacks/LambdaStack';
import { RestApiStack } from './stacks/RestApiStack';

const app = new App();
new DataStack(app, 'DataStack');
const lambdaStack = new LambdaStack(app, 'LambdaStack');
new RestApiStack(app, 'RestApiStack', {
    lambdaIntegration: lambdaStack.lambdaIntegration
});