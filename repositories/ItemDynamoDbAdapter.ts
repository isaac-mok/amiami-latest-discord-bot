import { DynamoDB } from "aws-sdk";
import ItemAdapterInterface from "./interfaces/ItemAdapterInterface";

export default class ItemDynamoDbAdapter implements ItemAdapterInterface {
    protected docClient;
    protected tableName;

    constructor(docClient: DynamoDB.DocumentClient) {
        this.docClient = docClient;
        this.tableName = "item";
    }

    set(url: String) {
        let params = {
            TableName: this.tableName,
            Item: {
                url: url,
            }
        }

        return this.docClient.put(params).promise();
    }

    get(url: String) {
        let params = {
            TableName: this.tableName,
            Key: {
                url: url,
            }
        }

        return this.docClient.get(params).promise();
    }
}
