"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChannelDynamoDbAdapter = /** @class */ (function () {
    function ChannelDynamoDbAdapter(docClient) {
        this.docClient = docClient;
        this.tableName = "channel";
    }
    ChannelDynamoDbAdapter.prototype.set = function (channel) {
        var params = {
            TableName: this.tableName,
            Item: {
                channel_id: channel.id,
            }
        };
        return this.docClient.put(params).promise();
    };
    ChannelDynamoDbAdapter.prototype.delete = function (channel) {
        var params = {
            TableName: this.tableName,
            Key: {
                channel_id: channel.id
            }
        };
        return this.docClient.delete(params).promise();
    };
    ChannelDynamoDbAdapter.prototype.all = function () {
        var params = {
            TableName: this.tableName
        };
        return this.docClient.scan(params).promise();
    };
    return ChannelDynamoDbAdapter;
}());
exports.default = ChannelDynamoDbAdapter;
