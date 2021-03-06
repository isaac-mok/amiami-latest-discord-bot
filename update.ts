import { JSDOM } from "jsdom";
import { Client as DiscordClient, ChannelManager } from "discord.js";
import Database from "./Database";
import axios from "axios";

export default function update(discordClient: DiscordClient, database: Database) {
    for (let i = 0; i < 4; i++) {
        setInterval(() => { retrieve(i, discordClient, database) }, 5000);
    }
}

function retrieve(page: Number, discordClient: DiscordClient, database: Database) {
    axios.get(`https://www.amiami.com/files/eng/new_items/100${page}.html`)
        .then(response => {
            let dom = new JSDOM(response.data);
            let urlList = Array.from(dom.window.document.querySelectorAll("li>a")).map(node => {
                return node.getAttribute("href");
            });
            
            send(urlList, 0, discordClient, database);
        }).catch(err => {
            console.error(err);
        });
}

async function send(urlList: Array<String | null>, index: number, discordClient: DiscordClient, database: Database) {
    let itemRepository = database.getItemRepository();
    let channelRepository = database.getChannelRepository();

    let url = urlList[index];

    if (typeof url === "string") {
        let item = await itemRepository.get(url);

        if (! item.hasOwnProperty("Item")) {
            itemRepository.set(url);
        }

        let channels = await channelRepository.all();

        if (channels.hasOwnProperty('Items')) {
            channels.Items?.forEach(async item => {
                let channel = await discordClient.channels.fetch(item.channel_id);
                if (channel.isText()) {
                    channel.send("https://www.amiami.com" + url);
                };
            });
        }
    }

    if (index <= urlList.length - 1) {
        setTimeout(() => { send(urlList, index + 1, discordClient, database)}, 3000);
    }
}
