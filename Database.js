"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = require("aws-sdk");
var ChannelDynamoDbAdapter_1 = __importDefault(require("./repositories/ChannelDynamoDbAdapter"));
var ItemDynamoDbAdapter_1 = __importDefault(require("./repositories/ItemDynamoDbAdapter"));
require('dotenv').config();
var Database = /** @class */ (function () {
    function Database() {
        var awsAccessKey = process.env.AWS_ACCESS_KEY;
        var awsSecretKey = process.env.AWS_SECRET_KEY;
        if (typeof awsAccessKey === "undefined" || typeof awsSecretKey === "undefined") {
            throw Error("AWS credentials not set.");
        }
        var endpoint = process.env.DB_ENDPOINT;
        if (typeof endpoint === "undefined") {
            throw Error("Endpoint not set.");
        }
        var region = process.env.AWS_REGION;
        if (typeof region === "undefined") {
            throw Error("AWS region not set.");
        }
        this.docClient = new aws_sdk_1.DynamoDB.DocumentClient({
            endpoint: endpoint,
            credentials: new aws_sdk_1.Credentials(awsAccessKey, awsSecretKey),
            region: region
        });
    }
    Database.prototype.getChannelRepository = function () {
        if (typeof this.channelRepository === "undefined") {
            this.channelRepository = new ChannelDynamoDbAdapter_1.default(this.docClient);
        }
        return this.channelRepository;
    };
    Database.prototype.getItemRepository = function () {
        if (typeof this.itemRepository === "undefined") {
            this.itemRepository = new ItemDynamoDbAdapter_1.default(this.docClient);
        }
        return this.itemRepository;
    };
    return Database;
}());
exports.default = Database;
