const Discord = require('discord.js');
const client = new Discord.Client();
const getRandomFruitsName = require('random-fruits-name');
const axios = require('axios').default;
const config = require('./config.json');
const movieQuote = require('popular-movie-quotes');
var channelID;
var interval;
var prefix = config.prefix;

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: `${prefix}help`}, status: 'online' });
    setInterval(setPresence, 900000);
});

client.on("message", (message) => {
    
    //Note to self: code to be used later
    //const args = message.content.slice(prefix.length).trim().split(/ +/);
    //const command = args.shift().toLowerCase();

    message.content = message.content.toLowerCase();

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content === `${prefix}help`) {
        const helpMenuEmbed = new Discord.MessageEmbed()
            .setColor('#202225')
            .setTitle('Commands List')
            .addFields(
                { name: '🏓 **Ping**  `[-ping]`‎', value: 'Pong?!?! Test speeds or see if I am alive.'},
                { name: '🍅 **Random Fruit**  `[-fruit]`', value: 'Gives the name of a random fruit from God knows where.' },
                { name: '🎙 **Quotes** `[-quote, -q]`', value: 'Gives quotes, duh.'},
                { name: '😁 **Coming soon**', value: '*new commands being added soon!*' },
                { name: "Disord.js Guide", value: "[mmmm yes hover text](https://discordjs.guide/ 'hover text work?')"},
                { name: "Discord.js Catalog", value: "[ew boring lists](https://discord.js.org/#/ 'click me to get access to extreme boredom!')"},
                { name: "NPS", value: "[NPS Catalog](https://www.npmjs.com/)"})
            .setDescription("Bot prefix: `"+ prefix + "`")
            .setFooter("Check out my progress at https://github.com/Jaedn/Oreo-Bot/");
        message.channel.send(helpMenuEmbed);
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

    if(message.content.startsWith(`${prefix}q`)) {

        if(message.content === `${prefix}quote` || message.content === `${prefix}q`) {
            const quoteCommandsEmbed = new Discord.MessageEmbed()
                .setColor('#202225')
                .setTitle('Quote Commands')
                .addFields(
                    { name: 'Movie Quotes  `[-quote movie, -q movie]`‎', value: 'Gives a random movie quote.'},
                    { name: 'Kanye Quotes  `[-quote Kanye, -q Kanye]`', value: 'Gives a random quote from the ultimate Kanye. \n(Be careful with this!)' })
                .setDescription('Need help? Here is a list of commmands for quotes!');
            message.channel.send(quoteCommandsEmbed);
        }

            else if(message.content === `${prefix}quote kanye` || message.content === `${prefix}q kanye`) {
                axios.get('https://api.kanye.rest/')
                .then(function (response) {
                    // handle success
                    message.channel.send("> Kanye:  " + response.data.quote)
                })
                .catch(function (error) {
                    // handle error
                    console.log('KANYE QUOTE API ERROR');
                    console.log(error);
                });
            }

            else if(message.content === `${prefix}quote movie` || message.content === `${prefix}q movie`) {
                message.channel.send('> ' + movieQuote.getRandomQuote());
            }
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
    client.channels.cache.get(channelID).send("Where am I?");
    client.channels.cache.get(channelID).send("who are you?");
}

client.login(config.token);