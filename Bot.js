const Discord = require('discord.js');
const client = new Discord.Client();
const getRandomFruitsName = require('random-fruits-name');
const axios = require('axios').default;
const config = require('./config.json');
const movieQuote = require('popular-movie-quotes');
var prefix = config.prefix;

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: `${prefix}help`}, status: 'online' });
    setInterval(setPresence, 900000);
});

client.on("message", (message) => {

    if ((message.content.startsWith(`${prefix}s`)) && !(message.content === `${prefix}spam`)) {
        let args = message.content.slice(prefix.length + 1).trim().split(' ');
        let bigLink = args.shift();
        //message.delete();

        if (!bigLink.length) {
            message.channel.send('No input detected. Format your command as such: `-s [link]`');
        } 
            else {
                message.delete();
                const shorten = {
                    url: "https://api-ssl.bitly.com/v4/shorten",
                    method: "post",
                    headers: {
                        'Authorization': `Bearer ${config.bitly_token}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "long_url": `${bigLink}`
                    }
                }
                
                axios.request(shorten)
                    .then(function (response) {
                        message.channel.send('```Received. Check your dms!```')
                            .then(msg => {
                                msg.delete({ timeout: 5000 })
                            })
                        message.author.send('Link retrieved. Here you go!\n' + response.data.link)
                    })
                    .catch(function (error) {
                        message.channel.send("```That's not a link! Remember to paste the full link for the feature to work!```")
                        .then(msg => {
                            msg.delete({ timeout: 5000 })
                        });
                    });
            }
    }

    message.content = message.content.toLowerCase();

    if (message.content.includes('<@!760397472249282570>')) {
        let father = message.author.id;

        if(father === '<@243189710275608589>') {
            message.reply('ping me = die <:ChibiSayuPaimon:758708247309320203>');
            setTimeout(function(){ 
                message.channel.send('Stick to my commands, peasant.');
            }, 1000);
        }
        
        else {
            message.reply('You can ping me because you are my creator 😘');
            setTimeout(function(){ 
                message.channel.send('What a benevolent human.');
            }, 1000);
        }

    }

    if(message.content.includes('bad') & (message.content.includes('cookie') || message.content.includes('cookies'))) {
        let filter = m => m.author.id === message.author.id
            message.channel.send("<:AK47:758575767570481152>You got a problem with that?").then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 5000,
                    errors: ['time']
                })
        .then(message => {
            message = message.first()
            if (message.content.includes('yes')) {
                message.channel.send("You better be ready. Something's coming... Something dangerous... <:ChibiSayuPaimon:758708247309320203>")
            } 
            else if (message.content.includes('no')) {
                message.channel.send("I thought so. Choose your words carefully.")
            } 
            else {
                message.channel.send("IT'S A YES OR NO QUESTION DUMMY. GO AWAY 😤")
            }
        })
        .catch(collected => {
            message.channel.send("As I thought 😌");
        });
    })
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content === `${prefix}help`) {
        message.delete({timeout: 1000});

        const helpMenuEmbed = new Discord.MessageEmbed()
            .setColor('#202225')
            .setTitle('Commands List')
            .addFields(
                { name: '🏓 **Ping**  `[-ping]`‎', value: 'Pong?!?! Test speeds or see if I am alive.'},
                { name: '🍅 **Random Fruit**  `[-fruit]`', value: 'Gives the name of a random fruit from God knows where.' },
                { name: '🎙 **Quotes** `[-quote, -q]`', value: 'Gives quotes, duh.'},
                { name: '<a:Cookies:758576143405678603> **Uhh, Cookies??** `[-cookie]`', value: 'Mmm cookies.'},
                { name: '🔗 **Link Shortenter** `[-s]`', value: 'Shortens your links using the [bit.ly](https://bitly.com/) API'},
                { name: '😁 **Coming soon**', value: '*new features being added soon!*' },
                { name: "Disord.js Guide", value: "[mmmm yes hover text](https://discordjs.guide/ 'hover text work?')"},
                { name: "Discord.js Catalog", value: "[ew boring lists](https://discord.js.org/#/ 'click me to get access to extreme boredom!')", inline:true},
                { name: "NPS", value: "[NPS Catalog](https://www.npmjs.com/)", inline:true})
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

    if(message.content === `${prefix}complain`) {
        message.channel.send("Why am I here...");
        setTimeout(function(){ 
            message.channel.send("Just to suffer...");
        }, 3000);
    };

    if(message.content.startsWith(`${prefix}q`)) {
        
        if(message.content === `${prefix}quote` || message.content === `${prefix}q` || message.content === `${prefix}quote help` || message.content === `${prefix}q help`) {
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
    if(message.content === (`${prefix}spam`)) {
        setTimeout(function(){ 
                     message.channel.send("haha you thought");  
        }, 2000);
    }

    /*
    if(message.content.startsWith(`${prefix}spam`)) {
        function test() {
            client.channels.cache.get(channelID).send("<@406898425578258442>")
        };
        var channelID = message.channel.id;
        var interval = setInterval(test, 1000); 

        if(message.content === (`${prefix}stop`)) {
            clearInterval(interval);
        }
    }
    */
    if(message.content === (`${prefix}cookie`)) {
        message.react('758576143405678603');
        message.channel.send('here hab cookie uwu 🍪');
        function cookie() {
            message.channel.send('<a:Cookies:758576143405678603>');
          }
          
          (function loop() {
            var rand = Math.random() * (360000 - 7200000) + 7200000;
            setTimeout(function() {
              cookie();
              loop();
            }, rand);
          }());
          
    }

    if(message.content === (`${prefix}restart`)) {
        let filter = m => m.author.id === message.author.id
            message.channel.send("```Are you sure you want to restart the bot? \nYou have 15 seconds to reply. Y / N```").then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 15000,
                    errors: ['time']
                })
        .then(message => {
            message = message.first()
            if (message.content === 'yes' || message.content === 'y') {
                
                let channelID = message.channel.id;
                client.channels.cache.get(channelID).send("Restarting...")
                resetBot();
            } 
            else if (message.content === 'no' || message.content === 'n') {
                message.channel.send("```Restart Cancelled.```")
            } 
            else {
                message.channel.send("```Cancelled: Invalid Response.```")
            }
        })
        .catch(collected => {
            message.channel.send("Failed");
        });
    })
    }

    //possible react function in future
    if (message.content === `${prefix}react`) {
		message.react('🇦');
		message.react('🇧');
		message.react('🇨');
	}
});

function setPresence() {
    client.user.setPresence({ activity: { name:`${prefix}help`}, status: 'online' });
}

function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    (async msg => {
    client.destroy()
    setTimeout(function(){ 
        client.login(config.token)
    }, 3000);
    await msg.edit('Restart worked')
    });
}

client.login(config.token);