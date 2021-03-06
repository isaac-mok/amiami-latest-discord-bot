"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = require("jsdom");
var axios_1 = __importDefault(require("axios"));
function update(discordClient, database) {
    var _loop_1 = function (i) {
        setInterval(function () { retrieve(i, discordClient, database); }, 5000);
    };
    for (var i = 0; i < 4; i++) {
        _loop_1(i);
    }
}
exports.default = update;
function retrieve(page, discordClient, database) {
    axios_1.default.get("https://www.amiami.com/files/eng/new_items/100" + page + ".html")
        .then(function (response) {
        var dom = new jsdom_1.JSDOM(response.data);
        var urlList = Array.from(dom.window.document.querySelectorAll("li>a")).map(function (node) {
            return node.getAttribute("href");
        });
        send(urlList, 0, discordClient, database);
    }).catch(function (err) {
        console.error(err);
    });
}
function send(urlList, index, discordClient, database) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var itemRepository, channelRepository, url, item, channels;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    itemRepository = database.getItemRepository();
                    channelRepository = database.getChannelRepository();
                    url = urlList[index];
                    if (!(typeof url === "string")) return [3 /*break*/, 3];
                    return [4 /*yield*/, itemRepository.get(url)];
                case 1:
                    item = _b.sent();
                    if (!!item.hasOwnProperty("Item")) return [3 /*break*/, 3];
                    itemRepository.set(url);
                    return [4 /*yield*/, channelRepository.all()];
                case 2:
                    channels = _b.sent();
                    if (channels.hasOwnProperty('Items')) {
                        (_a = channels.Items) === null || _a === void 0 ? void 0 : _a.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var channel;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, discordClient.channels.fetch(item.channel_id)];
                                    case 1:
                                        channel = _a.sent();
                                        if (channel.isText()) {
                                            channel.send("https://www.amiami.com" + url);
                                        }
                                        ;
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    _b.label = 3;
                case 3:
                    if (index <= urlList.length - 1) {
                        setTimeout(function () { send(urlList, index + 1, discordClient, database); }, 3000);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
