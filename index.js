//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { Client, Collection } = require(`discord.js`);
const fs = require(`fs`);
const { config } = require(`dotenv`);
const moment = require('moment');
const pj = require('./package.json');
const { pre, cb2 } = require(`./tools.js`);

// Create the client & prevent @everyone
const prefix = pre
const client = new Client({
    disableEveryone: true
});
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync(`./commands/`);

config({
    path: __dirname + `/.env`
});

[`command`].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// On Start
client.on(`ready`, () => {
    console.log(`-- (c) ${moment().format("YYYY")} by Eric Powell --`);
    console.log(`-- ${client.user.username} v${pj.version} is online --`);
    console.log();

    client.user.setPresence({
        game: {
            name: `.help`,
            type: `LISTENING`
        },
        status: `online`
    })
        // .then(console.log)
        .catch(console.error);
});

// On Message
client.on(`message`, async message => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content === 'Hello' || message.content === 'hello') return message.channel.sendMessage(message.author + `, ${client.user.username} says hello!`);
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length <= 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
    
    // MESSAGE LOG //
    console.log(`    [#${message.channel.name}] ${message.author.username}: ${message.content}`);
    
    // DELETE MESSAGE //
    if (message.deletable) message.delete();
    if (!command) return message.reply(`command not recognized! Try ${cb2}.help${cb2} for a list of valid commands...`);
});

client.login(process.env.TOKEN)