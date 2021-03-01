const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {
    send
} = require('process');

module.exports = {
    name: 'compare',
    description: 'Help menu',
    execute(message, args) {

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
                errorembed.setAuthor(title);
            }
            return message.channel.send(errorembed)
                .catch(err => {
                    return;
                })
        }

        const query = args[0];

        if (!query) {
            const title = "Choose one from menu ❌";
            const description = "Compare two countries - `cs.compare country <first country> <second country>`";
            return sendError(title, description);
        }

        switch (query) {
            case "country":

                const firstcountryquery = args[1];
                const secondcountryquery = args[2];

                // if user does not provide first or second country
                if (!firstcountryquery) {
                    const title = "Please provide first country ❌";
                    const description = "You did not provided first country!";
                    return sendError(title, description);
                } else if (!secondcountryquery) {
                    const title = "Please provide second country ❌";
                    const description = "You did not provided second country!";
                    return sendError(title, description);
                }

                // pass fetch countries

                fetch("https://disease.sh/v3/covid-19/countries/" + firstcountryquery + "," + secondcountryquery)
                    .then(res => res.json())
                    .then(json => {

                        if (!json) {
                            const title = "Failed to fetch the data ❌";
                            const description = "Please try again in few seconds!";
                            return sendError(title, description);
                        } else {
                            if (!json[1]) {
                                const title = "Failed to fetch the data ❌";
                                const description = "Please try again in few seconds!";
                                return sendError(title, description);
                            } else {
                                // both countries exist
                                const fiso = json[0].countryInfo.iso2.toLowerCase();
                                const siso = json[1].countryInfo.iso2.toLowerCase();

                                let embed = new Discord.MessageEmbed()
                                    .setAuthor("Comparing countries " + json[0].country + " and " + json[1].country, "https://cdn.discordapp.com/emojis/814136901664768031.png?v=1")
                                    .setColor("RED")
                                    .setTimestamp()
                                    .setFooter(message.author.username + "#" + message.author.discriminator)

                                    .addFields({
                                        name: json[0].country + " [ " + json[0].countryInfo.iso2 + " ]" + "  :flag_" + fiso + ":",
                                        value: ":busts_in_silhouette: **Population:** `" + json[0].population + "`\n<:covid:814136901664768031> **Cases:** `" + json[0].cases + "(+" + json[0].todayCases + ")`\n<:skull:814137879848550481> **Deaths:** `" + json[0].deaths + "(+" + json[0].todayDeaths + ")" + "`\n :test_tube: **Recovered:** `" + json[0].recovered + "(+" + json[0].todayRecovered + ")`\n:radioactive: **Active:** `" + json[0].active + "`\n:skull: **Critical:** `" + json[0].critical + "`",
                                        inline: true
                                    }, {
                                        name: json[1].country + " [ " + json[1].countryInfo.iso2 + " ]" + "  :flag_" + siso + ":",
                                        value: ":busts_in_silhouette: **Population:** `" + json[1].population + "`\n<:covid:814136901664768031> **Cases:** `" + json[1].cases + "(+" + json[1].todayCases + ")`\n<:skull:814137879848550481> **Deaths:** `" + json[1].deaths + "(+" + json[1].todayDeaths +")" + "`\n :test_tube: **Recovered: **`" + json[1].recovered + "(+" + json[1].todayRecovered + ")`\n:radioactive: **Active:** `" + json[0].active + "`\n:skull: **Critical:** `" + json[1].critical + "`",
                                        inline: true
                                    })

                                return message.channel.send(embed).catch(err => {
                                    return;
                                });
                            }
                        }

                    })

                break;

            default:
                const title = "Choose one from menu ❌";
                const description = "Compare two countries - `cs.compare country <first country> <second country>`";

                return sendError(title, description);
                break;
        }
    },
};