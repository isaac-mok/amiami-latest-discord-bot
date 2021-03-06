"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
require('dotenv').config();
var discordClient = new discord_js_1.default.Client();
discordClient.on('message', function (message) {
    console.log(message.content);
});
discordClient.login(process.env.DISCORD_TOKEN);
