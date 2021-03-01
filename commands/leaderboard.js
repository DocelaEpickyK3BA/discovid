const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {
    send
} = require('process');

module.exports = {
    name: 'leaderboard',
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
            const title = "Please select 'global' or 'continent'❌";
            const description = "**cs.leaderboard global** - `Get global leaderboard!`\n **cs.leaderboard continent** - `Get leaderboard for continents`";

            sendError(title, description);
        } else {

            switch (query) {

                case "global":
                    // global leaderboard

                    fetch("https://disease.sh/v3/covid-19/countries")
                        .then(res => res.json())
                        .then(state => {

                            if (!state) {
                                const title = "Failed to fetch the data ❌";
                                const description = "We can't fetch the data right now!";

                                sendError(title, description);
                            } else {

                                let sorted = state.sort(function (a, b) {
                                    return b.cases - a.cases
                                });

                                let leaderboard = new Discord.MessageEmbed()
                                    .setColor("RED")
                                    .setTimestamp()
                                    .setFooter(message.author.username + "#" + message.author.discriminator)
                                    .setAuthor("Worldwide Leaderboard", "https://cdn.discordapp.com/emojis/814136901664768031.png?v=1")

                                    .addField("#1 " + sorted[0].country, "<:covid:814136901664768031> **Cases:** `" + sorted[0].cases + "(+" + sorted[0].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[0].deaths + "(+" + sorted[0].todayDeaths + ")`")

                                    .addField("#2 " + sorted[1].country, "<:covid:814136901664768031> **Cases:** `" + sorted[1].cases + "(+" + sorted[1].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[1].deaths + "(+" + sorted[1].todayDeaths + ")`")

                                    .addField("#3 " + sorted[2].country, "<:covid:814136901664768031> **Cases:** `" + sorted[2].cases + "(+" + sorted[2].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[2].deaths + "(+" + sorted[2].todayDeaths + ")`")

                                    .addField("#4 " + sorted[3].country, "<:covid:814136901664768031> **Cases:** `" + sorted[3].cases + "(+" + sorted[3].todayCases + ")`\n<:covid2:814150830781104178> **Deaths:** `" + sorted[3].deaths + "(+" + sorted[3].todayDeaths + ")`")

                                    .addField("#5 " + sorted[4].country, "<:covid:814136901664768031> **Cases:** `" + sorted[4].cases + "(+" + sorted[4].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[4].deaths + "(+" + sorted[4].todayDeaths + ")`")

                                    .addField("#6 " + sorted[5].country, "<:covid:814136901664768031> **Cases:** `" + sorted[5].cases + "(+" + sorted[5].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[5].deaths + "(+" + sorted[5].todayDeaths + ")`")

                                    .addField("#7 " + sorted[6].country, "<:covid:814136901664768031> **Cases:** `" + sorted[6].cases + "(+" + sorted[6].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[6].deaths + "(+" + sorted[6].todayDeaths + ")`")

                                    .addField("#8 " + sorted[7].country, "<:covid:814136901664768031> **Cases:** `" + sorted[7].cases + "(+" + sorted[7].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[7].deaths + "(+" + sorted[7].todayDeaths + ")`")

                                    .addField("#9 " + sorted[8].country, "<:covid:814136901664768031> **Cases:** `" + sorted[8].cases + "(+" + sorted[8].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[8].deaths + "(+" + sorted[8].todayDeaths + ")`")

                                    .addField("#10 " + sorted[9].country, "<:covid:814136901664768031> **Cases:** `" + sorted[9].cases + "(+" + sorted[9].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[9].deaths + "(+" + sorted[9].todayDeaths + ")`")


                                return message.channel.send(leaderboard)
                                    .catch(err => {
                                        return;
                                    })

                            }
                        })

                    break;

                case "continent":
                    // continent leaderboard

                    fetch("https://disease.sh/v3/covid-19/continents")
                        .then(res => res.json())
                        .then(state => {
                            
                            if (!state) {
                                const title = "Failed to fetch the data ❌";
                                const description = "We can't fetch the data right now!";

                                sendError(title, description);
                            } else {

                                let sorted = state.sort(function (a, b) {
                                    return b.cases - a.cases
                                });

                                let leaderboard = new Discord.MessageEmbed()
                                    .setColor("RED")
                                    .setTimestamp()
                                    .setFooter(message.author.username + "#" + message.author.discriminator)
                                    .setAuthor("Worldwide Continent Leaderboard", "https://cdn.discordapp.com/emojis/814136901664768031.png?v=1")

                                    .addField("#1 " + sorted[0].continent, "<:covid:814136901664768031> **Cases:** `" + sorted[0].cases + "(+" + sorted[0].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[0].deaths + "(+" + sorted[0].todayDeaths + ")`")

                                    .addField("#2 " + sorted[1].continent, "<:covid:814136901664768031> **Cases:** `" + sorted[1].cases + "(+" + sorted[1].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[1].deaths + "(+" + sorted[1].todayDeaths + ")`")

                                    .addField("#3 " + sorted[2].continent, "<:covid:814136901664768031> **Cases:** `" + sorted[2].cases + "(+" + sorted[2].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[2].deaths + "(+" + sorted[2].todayDeaths + ")`")

                                    .addField("#4 " + sorted[3].continent, "<:covid:814136901664768031> **Cases:** `" + sorted[3].cases + "(+" + sorted[3].todayCases + ")`\n<:covid2:814150830781104178> **Deaths:** `" + sorted[3].deaths + "(+" + sorted[3].todayDeaths + ")`")

                                    .addField("#5 " + sorted[4].continent, "<:covid:814136901664768031> **Cases:** `" + sorted[4].cases + "(+" + sorted[4].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[4].deaths + "(+" + sorted[4].todayDeaths + ")`")

                                    .addField("#6 " + sorted[5].continent, "<:covid:814136901664768031> **Cases:** `" + sorted[5].cases + "(+" + sorted[5].todayCases + ")`\n <:covid2:814150830781104178> **Deaths:** `" + sorted[5].deaths + "(+" + sorted[5].todayDeaths + ")`")


                                return message.channel.send(leaderboard)
                                    .catch(err => {
                                        return;
                                    })
                            }

                        })


                    break;

                default:
                    const title = "Please select 'global' or 'continent'❌";
                    const description = "**Global** - `Get global leaderboard!`\n **Continent** - `Get leaderboard for continents`";

                    sendError(title, description);
                    break;
            }

        }
    },
};