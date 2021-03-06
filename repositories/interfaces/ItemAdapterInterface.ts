import { DynamoDB, AWSError } from 'aws-sdk';
import { PromiseResult } from "aws-sdk/lib/request";

export default interface ItemAdapterInterface {
    set(url: String): Promise<PromiseResult<DynamoDB.PutItemOutput, AWSError>>;
    get(url: String): Promise<PromiseResult<DynamoDB.GetItemOutput, AWSError>>;
}
