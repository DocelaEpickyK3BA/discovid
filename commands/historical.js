const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {
    name: 'historical',
    description: 'Statistic about covid-19',
    execute(message, args) {
        const query = args[0];


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

        if (!query) {
            const title = "Invalid Usage! ❌";
            const description = "Get historical data from country - `cs.historical country <country>`";

            return sendError(title, description);
        }

        // commands
        switch (query) {
            case "country":

                const countryquery = args[1];

                if (!countryquery) {
                    const title = "Invalid Usage! ❌";
                    const description = "Get historical data from country - `cs.historical country <country>`\n Get historical worldwide data - `cs.historical all` ";

                    return sendError(title, description);
                }

                fetch("https://disease.sh/v3/covid-19/historical/" + countryquery + "?lastdays=3")
                    .then(res => res.json())
                    .then(json => {

                        if (!json) {
                            const title = "Some error happened in fetching data! ❌";
                            const description = "Please try it again in 5 minutes";

                            return sendError(title, description);
                        } else {
                            // succefully fetched data about the country

                            let hembed = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setAuthor("Historical data about " + json.country, "https://cdn.discordapp.com/emojis/814136901664768031.png?v=1")
                                .setTimestamp()
                                .setFooter(message.author.username + "#" + message.author.discriminator)
                                .setDescription("**Province - ** `" + json.province + "`")

                            hembed.addField("ㅤ", "<:covid:814136901664768031> Cases")

                            Object.keys(json.timeline.cases).forEach(function (key) {
                                const date = key;
                                const cases = json.timeline.cases[key];

                                hembed.addField(date, "<:covid:814136901664768031> `" + cases + " cases`");
                            });

                            hembed.addField("ㅤ", "<:skull:814137879848550481> Deaths")

                            Object.keys(json.timeline.deaths).forEach(function (key) {
                                const date = key;
                                const deaths = json.timeline.deaths[key];

                                hembed.addField(date, "<:skull:814137879848550481> `" + deaths + " deaths`");
                            });

                            hembed.addField("ㅤ", "🧪 Recovered")

                            Object.keys(json.timeline.recovered).forEach(function (key) {
                                const date = key;
                                const recovered = json.timeline.recovered[key];

                                hembed.addField(date, "🧪 `" + recovered + " recovered`");
                            });

                            return message.channel.send(hembed)
                                .catch(err => {
                                    return;
                                })
                        }

                    });

                break;

            case "all":

                fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=3")
                .then(res => res.json())
                .then(json => {

                    if(!json) {
                        const title = "Failed to fetch the data! ❌";
                        const description = "Please try again in few minutes";

                       return sendError(title, description);
                    }

                    let embed = new Discord.MessageEmbed()
                    .setAuthor("Global Covid-19 Data", "https://cdn.discordapp.com/emojis/814136901664768031.png?v=1")
                    .setColor("RED")
                    .setTimestamp()
                    .setFooter(message.author.username + "#" + message.author.discriminator)

                    Object.keys(json.cases).forEach(function (key) {
                        const date = key;
                        const cases = json.cases[key];

                        embed.addField(date, "<:covid:814136901664768031> `" + cases + " cases`");
                    });

                    Object.keys(json.deaths).forEach(function (key) {
                        const date = key;
                        const deaths = json.deaths[key];

                        embed.addField(date, ":skull: `" + deaths + " deaths`");
                    });

                    Object.keys(json.recovered).forEach(function (key) {
                        const date = key;
                        const recovered = json.recovered[key];

                        embed.addField(date, ":test_tube: `" + recovered + " recovered`");
                    });


                    return message.channel.send(embed)
                    .catch(err => {
                        return;
                    })
                });

                break;
            default:
                const title = "Invalid Usage! ❌";
                const description = "Get historical data from country - `cs.historical country <country>`\n Get historical worldwide data - `cs.historical all` ";

                return sendError(title, description);
                break;
        }
    },
};