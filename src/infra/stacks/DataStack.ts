import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { getSuffixFromStack } from '../Util';

export class DataStack extends Stack {
    public readonly animalsTable: ITable;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        // Define your data stack resources here

        const suffix = getSuffixFromStack(this);

        this.animalsTable = new Table(this, 'AnimalsTable', {
            tableName: `animals-table-${suffix}`,
            partitionKey: { name: 'id', type: AttributeType.STRING },
            removalPolicy: RemovalPolicy.DESTROY
        });
    }
}