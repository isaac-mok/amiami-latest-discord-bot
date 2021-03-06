import { Credentials, DynamoDB } from "aws-sdk";
import ChannelDynamoDbAdapter from "./repositories/ChannelDynamoDbAdapter";
import ItemDynamoDbAdapter from "./repositories/ItemDynamoDbAdapter";
require('dotenv').config();

export default class Database {
    protected docClient;
    protected channelRepository?: ChannelDynamoDbAdapter;
    protected itemRepository?: ItemDynamoDbAdapter;

    constructor() {
        let awsAccessKey = process.env.AWS_ACCESS_KEY;
        let awsSecretKey = process.env.AWS_SECRET_KEY;
        if (typeof awsAccessKey === "undefined" || typeof awsSecretKey === "undefined") {
            throw Error("AWS credentials not set.");
        }

        let endpoint = process.env.DB_ENDPOINT;
        if (typeof endpoint === "undefined") {
            throw Error("Endpoint not set.");
        }

        let region = process.env.AWS_REGION;
        if (typeof region === "undefined") {
            throw Error("AWS region not set.");
        }

        this.docClient = new DynamoDB.DocumentClient({
            endpoint: endpoint,
            credentials: new Credentials(awsAccessKey, awsSecretKey),
            region: region
        });
    }

    getChannelRepository() {
        if (typeof this.channelRepository === "undefined") {
            this.channelRepository = new ChannelDynamoDbAdapter(this.docClient);
        }

        return this.channelRepository;
    }

    getItemRepository() {
        if (typeof this.itemRepository === "undefined") {
            this.itemRepository = new ItemDynamoDbAdapter(this.docClient);
        }

        return this.itemRepository;
    }
}
