import { Channel as DiscordChannel } from 'discord.js';
import { DynamoDB, AWSError } from 'aws-sdk';
import { PromiseResult } from "aws-sdk/lib/request";

export default interface ChannelAdapterInterface {
    set(channel: DiscordChannel): Promise<PromiseResult<DynamoDB.PutItemOutput, AWSError>>;
    delete(channel: DiscordChannel): Promise<PromiseResult<DynamoDB.DeleteItemOutput, AWSError>>;
    all(): Promise<PromiseResult<DynamoDB.ScanOutput, AWSError>>;
}
