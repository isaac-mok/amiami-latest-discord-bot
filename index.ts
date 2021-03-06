import Discord from 'discord.js';
require('dotenv').config();

const discordClient = new Discord.Client();

discordClient.on('message', message => {
    console.log(message.content);
});

discordClient.login(process.env.DISCORD_TOKEN);
