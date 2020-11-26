const Discord = require('discord.js');
const client = new Discord.Client();
const getRandomFruitsName = require('random-fruits-name');
const config = require('./config.json');
var channelID;
var interval;
var prefix = config.prefix;

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: `${prefix}help`}, status: 'online' });
    setInterval(setPresence, 900000);
});


client.on("message", (message) => {

    message.content = message.content.toLowerCase();

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content === `${prefix}help`) {
        const embed = new Discord.MessageEmbed()
            .setColor('#202225')
            .setTitle('Commands List')
            .addFields(
                { name: '🏓 **Ping**‎', value: '`-ping`  Pong?!?! Test speeds or see if I am alive.'},
                { name: '🍅 **Random Fruit**', value: '`-fruit`  Gives the name of a random fruit from God knows where.' },
                { name: '😁 **Coming soon**', value: '*new commands being added soon!*' },
                { name: "Disord.js Guide", value: "[mmmm yes hover text](https://discordjs.guide/ 'hover text work?')"},
                { name: "Discord.js Catalog", value: "[ew boring lists](https://discord.js.org/#/ 'click me to get access to extreme boredom!')"},
                { name: "NPS", value: "[NPS Catalog](https://www.npmjs.com/)"})
            .setDescription("Bot prefix: `"+ prefix + "`")
            .setFooter("If you need assistance, do not hesitate to contact me. I won't respond though.");
        message.channel.send(embed);
    }
    if(message.content === `${prefix}fruit`) {
        const embed = new Discord.MessageEmbed()
            .setColor('#31d4cd')
            .setTitle(getRandomFruitsName());
        message.channel.send(embed);
    }
    if(message.content === `${prefix}ping`) {
        message.channel.send("pong!");
    }
    if(message.content.startsWith(`${prefix}spam`)) {
        channelID = message.channel.id;
        interval = setInterval(test, 1000);
    }
        else if(message.content === `${prefix}stop`) {
            clearInterval(interval);
        }
});

function setPresence() {
    client.user.setPresence({ activity: { name:`${prefix}help`}, status: 'online' });
}

function test() {
    client.channels.cache.get(channelID).send("the end is nearing");
}

client.login(config.token);