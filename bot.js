const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');

require('dotenv').config()

// fetch data everytime bot refresh
fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=3")
    .then(res => res.text())
    .then(body => {
        fs.writeFile("./data/vaccine.txt", body, (err) => {
            if (err)
                console.log(err);
            else {
                console.log("[ " + Date.now() + " ] Succefully updated vaccine data!");
            }
        });
    });

// FETCH DATA IN INTERVAL TO data folder
setInterval(() => {
    fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=3")
        .then(res => res.text())
        .then(body => {
            fs.writeFile("./data/vaccine.txt", body, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("[ " + Date.now() + " ] Succefully updated vaccine data!");
                }
            });
        });
}, 360000);

const client = new Discord.Client();

// command collection
client.commands = new Discord.Collection();

// discord command handler
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// on bot start
client.on('ready', () => {
    console.log(`Bot logged in as ${client.user.tag}!`);
});

const prefix = process.env.PREFIX;

// message event
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args, client);
    } catch (error) {
        console.log(error);
    }
});


// log in the bot
client.login(process.env.TOKEN);