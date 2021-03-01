const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {
    send
} = require('process');

module.exports = {
    name: 'botrelated',
    description: 'Bot related commands',
    execute(message, args, client) {

        // error embed function
        async function sendError(title, description) {
            let errorembed = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor(title)
                .setTimestamp()
                .setFooter(message.author.username + "#" + message.author.username)

            if (description) {
                errorembed.setDescription(description);
            }

            if (title) {
                errorembed.setAuthor(title, "https://cdn.discordapp.com/emojis/814136901664768031.png?v=1");
            }
            return message.channel.send(errorembed)
                .catch(err => {
                    return;
                })
        }

        const query = args[0];

        if (!query) {
            const title = "Menu of the Botrelated commands ";
            const description = "**Botinfo** - `cs.botrelated botinfo`\n **support server - **`cs.botrelated support`";

            return sendError(title, description);
        }

        switch (query) {
            case "botinfo":
                let botinfoembed = new Discord.MessageEmbed()
                .setColor("GREY")    
                .setAuthor("Botinfo Command 🔧")
                .setDescription(`**Latency: ** ${message.createdTimestamp - Date.now()}ms
                **Watching: **${client.guilds.cache.size} guilds **and**  ${client.users.cache.size} users
                **Api Latency - **${client.ws.ping}ms`)
                .setFooter(message.author.username + "#" + message.author.discriminator)
                return message.channel.send(botinfoembed)
                .catch(err => {
                    return;
                })
                break;

            default:
                const title = "Menu of the Botrelated commands ";
                const description = "**Botinfo** - `cs.botrelated botinfo`";

                return sendError(title, description);
                break;
        }
    },
};