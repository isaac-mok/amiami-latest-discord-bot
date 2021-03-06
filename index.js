"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var Database_1 = __importDefault(require("./Database"));
require("dotenv").config();
var discordClient = new discord_js_1.default.Client();
var database = new Database_1.default();
var channelRepository = database.getChannelRepository();
discordClient.on("ready", function () {
    console.log("Ready.");
});
discordClient.on("message", function (message) {
    var messageArray = message.content.split(/\s+/);
    if (messageArray[0] === "<@!817741317794693120>") {
        if (messageArray[1] === "join") {
            channelRepository.set(message.channel)
                .then(function () {
                message.channel.send("Okay. I will send updates here!");
            }).catch(function (err) {
                console.error(err);
                message.channel.send("Sorry :( There was an error.");
            });
        }
        else if (messageArray[1] === "unjoin") {
            channelRepository.delete(message.channel)
                .then(function () {
                message.channel.send("Got it. I won't send updates here anymore.");
            }).catch(function (err) {
                console.error(err);
                message.channel.send("Sorry :( There was an error.");
            });
        }
    }
});
discordClient.login(process.env.DISCORD_TOKEN);
