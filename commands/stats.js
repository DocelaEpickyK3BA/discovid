const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {
    name: 'stats',
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

        // commands
        switch (query) {
            case "country":
                const countryquery = args[1];

                if (!countryquery) {
                    const title = "Please provide a country code or a name of country!❌";
                    const description = "ec. cs.stats continent CZ";
                    sendError(title, description);
                } else {
                    // country is defined

                    // fetch the data about the country
                    fetch("https://disease.sh/v3/covid-19/countries/" + countryquery)
                        .then(res => res.json())
                        .then(json => {

                            // check if json is defined and country exist in JSON object
                            if (!json || json.message == "Country not found or doesn't have any cases") {
                                const title = "Data about " + countryquery + " can't be found! ❌";
                                const description = "Make sure you entered country code like(CZ, FR) or right country name like Albania";

                                sendError(title, description);
                            } else {
                                // data exists, fetch data about vaccine
                                const vaccinedata = require('../data/vaccine.txt');

                                fs.readFile('./data/vaccine.txt', 'utf8', function (err, data) {
                                    if (err) {
                                        console.log(err);
                                        const title = "Some error happened in fetching vaccine data ❌";
                                        const description = "Contact K3BA#7862 for help!";

                                        sendError(title, description);
                                    } else {
                                        // not error with reading vaccine data parse it
                                        const parsedvaccinedata = JSON.parse(data);

                                        // find array with a right data for the country user selected
                                        const vdata = parsedvaccinedata.find(array => array.country === json.country);

                                        if (!vdata) {
                                            const title = "Some error happened in fetching vaccine data ❌";
                                            const description = "Contact K3BA#7862 for help!";

                                            sendError(title, description);
                                        } else {

                                            // array with vaccine data for the user country fetched

                                            let covidstatembed = new Discord.MessageEmbed()
                                                .setColor("RED")
                                                .setAuthor("Covid-19 Data for " + json.country + " ", "https://cdn.discordapp.com/emojis/814136901664768031.png?v=1")
                                                .setTimestamp()
                                                .setThumbnail(json.countryInfo.flag)
                                                .setFooter("Requested by " + message.author.username + "#" + message.author.discriminator)


                                                // data in footer
                                                .addFields({
                                                    name: '<:skull:814137879848550481> Deaths',
                                                    value: "**" + json.deaths + "**" + " (" + json.todayDeaths + "+)",
                                                    inline: true
                                                }, {
                                                    name: '🧪 Recovered',
                                                    value: '**' + json.recovered + '** ' + "(" + json.todayRecovered + "+)",
                                                    inline: true
                                                }, {
                                                    name: '<:covid2:814150830781104178> Active',
                                                    value: "**" + json.active + "**",
                                                    inline: true
                                                }, {
                                                    name: '<:covid:814136901664768031> Cases',
                                                    value: '**' + json.cases + '** ' + "(" + json.todayCases + "+)\n",
                                                    inline: true
                                                }, {
                                                    name: ':mask: Tests',
                                                    value: '**' + json.tests + "**",
                                                    inline: true
                                                }, )

                                                .addField("​", "🧪 Vaccine Data for ​" + json.country + ".")

                                            const newvaccinedata = vdata.timeline;

                                            Object.keys(newvaccinedata).forEach(function (key) {
                                                covidstatembed.addFields({
                                                    name: "Date: " + key,
                                                    value: "⚗️" + newvaccinedata[key] + " pieces",
                                                    inline: true
                                                })
                                            });


                                            return message.channel.send(covidstatembed)
                                                .catch(err => {
                                                    return;
                                                })

                                        }

                                        console.log(vdata);
                                    }
                                });
                            }
                        })
                }
                break;

            case "all":

                fetch("https://disease.sh/v3/covid-19/all")
                    .then(res => res.json())
                    .then(json => {

                        if (!json) {
                            const title = "Some error happened in fetching data! ❌";
                            const description = "Please try it again in 5 minutes";

                            sendError(title, description);
                        } else {

                            // Arguments: number to round, number of decimal places
                            function roundNumber(rnum, rlength) {
                                var novecislo = Math.round(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
                                return novecislo;
                            }

                            // count the percentage
                            const activepercentage = (json.active * 100) / json.population;
                            const criticalpercentage = (json.critical * 100) / json.population;
                            const testedpercentage = (json.tests * 100) / json.population;

                            const activep = (roundNumber(activepercentage, 3));
                            const criticalp = (roundNumber(criticalpercentage, 3));
                            const testedp = (roundNumber(testedpercentage, 3));

                            let embed = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTimestamp()
                                .setFooter(message.author.username + "#" + message.author.discriminator)
                                .setAuthor("Worldwide Covid-19 stats", "https://cdn.discordapp.com/emojis/814136901664768031.png?v=1")
                                .setDescription(":dna: Stats..")
                                .addFields({
                                        name: "<:covid2:814150830781104178> Cases",
                                        value: "**" + json.cases + "**(+" + json.todayCases + ")",
                                        inline: true
                                    }, {
                                        name: "<:skull:814137879848550481> Deaths",
                                        value: "**" + json.deaths + "**(+" + json.todayDeaths + ")",
                                        inline: true
                                    }, {
                                        name: "<:covid:814136901664768031> Recovered",
                                        value: "**" + json.recovered + "**(+" + json.todayRecovered + ")",
                                        inline: true
                                    },
                                    // second line
                                    {
                                        name: ":microbe: Active",
                                        value: "**" + json.active + "**" + "(" + activep + "%)",
                                        inline: true
                                    }, {
                                        name: ":dna: Critical",
                                        value: "**" + json.critical + "**" + "(" + criticalp + "%)",
                                        inline: true
                                    }, {
                                        name: ":test_tube: Tests",
                                        value: "**" + json.tests + "**" + "(" + testedp + "%)",
                                        inline: true
                                    }
                                )

                            return message.channel.send(embed)
                                .catch(err => {
                                    return;
                                })
                        }

                    });

                break;

            case "continent":
                const continentquery = args[1];

                if (!continentquery) {
                    const title = "Please provide a name of the continent! ❌";
                    const description = "ec. cs.stats continent europe";
                   return sendError(title, description);
                }

                fetch("https://disease.sh/v3/covid-19/continents/" + continentquery)
                    .then(res => res.json())
                    .then(json => {

                        if (!json || json.message == "Continent not found or doesn't have any cases") {

                            const title = "Continent not found, or does not have any cases! ❌";
                            const description = "Please check if you provided a valid continent..";

                           return sendError(title, description);

                        } else {

                            // continent found

                            let covidembed = new Discord.MessageEmbed()
                                .setAuthor(json.continent, "https://cdn.discordapp.com/emojis/814136901664768031.png?v=1")
                                .setColor("RED")
                                .setTimestamp()
                                .setFooter(message.author.username + "#" + message.author.discriminator)
                                .setDescription("**Lat** - `" + json.continentInfo.lat + "` **Long** - `" + json.continentInfo.long + "`\n\n Stats :dna:")

                                .addFields(
                                    // first line
                                    {
                                        name: "<:covid2:814150830781104178> Cases",
                                        value: "**" + json.cases + "**(+" + json.todayCases + ")",
                                        inline: true
                                    }, {
                                        name: "<:skull:814137879848550481> Deaths",
                                        value: "**" + json.deaths + "**(+" + json.todayDeaths + ")",
                                        inline: true
                                    }, {
                                        name: "<:covid:814136901664768031> Recovered",
                                        value: "**" + json.recovered + "**(+" + json.todayRecovered + ")",
                                        inline: true
                                    },
                                    // second line
                                    {
                                        name: ":microbe: Active",
                                        value: json.active,
                                        inline: true
                                    }, {
                                        name: ":dna: Critical",
                                        value: json.critical,
                                        inline: true
                                    }, {
                                        name: ":test_tube: Tests",
                                        value: json.tests,
                                        inline: true
                                    }
                                )

                            return message.channel.send(covidembed)
                                .catch(err => {
                                    return;
                                })
                        }

                    });


                break;

            default:
                const title = "Use 'all', 'continent' or 'country' ❌";
               return sendError(title)
                break;
        }
    },
};