const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {
    send
} = require('process');

module.exports = {
    name: 'vaccine',
    description: 'Covid-19 Leaderboard',
    execute(message, args) {

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
                errorembed.setAuthor(title);
            }
            return message.channel.send(errorembed)
                .catch(err => {
                    return;
                })
        }

        const query = args[0];

        if (!query) {
            const title = "Please select 'all'❌";
            const description = "**cs.vaccine all** - `Get vaccine pieces data!`";

            sendError(title, description);
        } else {

            switch (query) {
                case "all":

                    fetch("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=9")
                        .then(res => res.json())
                        .then(json => {

                            if (!json) {
                                const title = "Failed to fetch data❌";
                                const description = "Please try again in few minutes!";

                                sendError(title, description);
                            } else {

                                let vaccineembed = new Discord.MessageEmbed()
                                    .setColor("GREEN")
                                    .setTimestamp()
                                    .setFooter(message.author.username + "#" + message.author.discriminator)
                                    .setAuthor("Number of vaccine pieces in the world 🦠")

                                    Object.keys(json).forEach(function (key) {
                                        vaccineembed.addFields({
                                            name: "Date: " + key,
                                            value: "⚗️" + json[key] + " pieces",
                                            inline: true
                                        })
                                    });

                                    return message.channel.send(vaccineembed)
                                    .catch(err => {
                                        return;
                                    })
                            }

                        });

                    break;

                default:
                    const title = "Please select 'all'❌";
                    const description = "**cs.vaccine all** - `Get vaccine pieces data!`";
        
                    sendError(title, description);
                    break;
            }

        }
    },
};