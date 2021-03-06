"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemDynamoDbAdapter = /** @class */ (function () {
    function ItemDynamoDbAdapter(docClient) {
        this.docClient = docClient;
        this.tableName = "item";
    }
    ItemDynamoDbAdapter.prototype.set = function (url) {
        var params = {
            TableName: this.tableName,
            Item: {
                url: url,
            }
        };
        return this.docClient.put(params).promise();
    };
    ItemDynamoDbAdapter.prototype.get = function (url) {
        var params = {
            TableName: this.tableName,
            Key: {
                url: url,
            }
        };
        return this.docClient.get(params).promise();
    };
    return ItemDynamoDbAdapter;
}());
exports.default = ItemDynamoDbAdapter;
