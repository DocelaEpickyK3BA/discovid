const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const {
    send
} = require('process');

module.exports = {
    name: 'help',
    description: 'Help menu',
    execute(message, args) {
        let helpembed = new Discord.MessageEmbed()
        .setAuthor("DisCovid Covid-19 Commands", "https://cdn.discordapp.com/emojis/814136901664768031.png?v=1")
        .setColor("RED")
        .setDescription("**[somethinghere]** `Choose something from here`")
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/COVID-19_Outbreak_World_Map.svg/langen-1000px-COVID-19_Outbreak_World_Map.svg.png")

        .addField(":chart_with_downwards_trend: Covid-19 Statistics", "`cs.stats [ all / country / continent ]`")
        .addField(":trophy: Leaderboard", "`cs.leaderboard [ global / continent ]`")
        .addField(":test_tube: Vaccine", "`cs.vaccine [ all ]`")
        .addField(":date: Historical", "`cs.historical [ all / country ]`")
        .addField(":compass: Compare", "`cs.compare [ country ]`")
        .addField(":wrench: Bot related", "`cs.botrelated [ invite / botinfo / support ]`")

        .setFooter("Some data may be not accurate! & Requested by " + message.author.username + "#" + message.author.discriminator)

        return message.channel.send(helpembed)
        .catch(err => {
            return;
        })
    },
};