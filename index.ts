import Discord from "discord.js";
import Database from "./Database";
import update from "./update";
import axios from "axios";
import { JSDOM } from "jsdom";
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

    if (message.content.search("gcode|scode") !== -1) {
        let queryParams = new URLSearchParams(message.content.substr(message.content.search("gcode|scode")).split(/\s+/)[0]);
        let code = "gcode=" + queryParams.get("gcode");
        if (code === "gcode=null") {
            code = "scode=" + queryParams.get("scode");
        }
        axios.get("https://api.amiami.com/api/v1.0/item?" + code + "&lang=eng", {
            headers: {
                "X-User-Key": "amiami_dev"
            }
        })
            .then(response => {
                if (response.data.hasOwnProperty("item")) {
                    let imageUrl = "https://img.amiami.com" + response.data.item.main_image_url;
                    message.channel.send(imageUrl);
                }
            }).catch(err => {
                console.error(err);
            })
    }
});

discordClient.login(process.env.DISCORD_TOKEN);

setInterval(() => { update(discordClient, database) }, 180000);
