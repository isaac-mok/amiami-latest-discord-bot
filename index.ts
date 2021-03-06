import Discord from "discord.js";
import Database from "./Database";
require("dotenv").config();

const discordClient = new Discord.Client();
const database = new Database();
const channelRepository = database.getChannelRepository();

discordClient.on("ready", () => {
    console.log("Ready.");
});

discordClient.on("message", message => {
    let messageArray = message.content.split(/\s+/);
    if (messageArray[0] === "<@!817741317794693120>") {
        if (messageArray[1] === "join") {
            channelRepository.set(message.channel)
                .then(() => {
                    message.channel.send("Okay. I will send updates here!");
                }).catch(err => {
                    console.error(err);
                    message.channel.send("Sorry :( There was an error.");
                });
        } else if (messageArray[1] === "unjoin") {
            channelRepository.delete(message.channel)
                .then(() => {
                    message.channel.send("Got it. I won't send updates here anymore.");
                }).catch(err => {
                    console.error(err);
                    message.channel.send("Sorry :( There was an error.");
                });
        }
    }
});

discordClient.login(process.env.DISCORD_TOKEN);
