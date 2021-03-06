import { DynamoDB } from "aws-sdk";
import { Channel as DiscordChannel } from "discord.js";
import ChannelAdapterInterface from "./interfaces/ChannelAdapterInterface";

export default class ChannelDynamoDbAdapter implements ChannelAdapterInterface {
    protected docClient;
    protected tableName;

    constructor(docClient: DynamoDB.DocumentClient) {
        this.docClient = docClient;
        this.tableName = "channel";
    }

    set(channel: DiscordChannel) {
        let params = {
            TableName: this.tableName,
            Item: {
                channel_id: channel.id,
            }
        }

        return this.docClient.put(params).promise();
    }

    delete(channel: DiscordChannel) {
        let params = {
            TableName: this.tableName,
            Key: {
                channel_id: channel.id
            }
        }

        return this.docClient.delete(params).promise();
    }

    all() {
        let params = {
            TableName: this.tableName
        }

        return this.docClient.scan(params).promise();
    }
}
