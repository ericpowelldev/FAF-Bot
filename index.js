//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { Client, Collection } = require(`discord.js`);
const { config } = require(`dotenv`);
const fs = require(`fs`);
const moment = require('moment');
const mongoose = require("mongoose");
const pj = require('./package.json');
const API = require(`./utils/API.js`);
const { pre, cb2 } = require(`./utils/tools.js`);

// Create the client & command collection & prevent @everyone
const prefix = pre
const client = new Client({
    disableEveryone: true
});
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync(`./commands/`);

// Config env
config({
    path: __dirname + `/.env`
});

// Fire command handler
[`command`].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// Mongoose
const db = require(`./models`);
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/faf_db`, { useNewUrlParser: true, useUnifiedTopology: true });



// Set logging
const log = true;

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

    // VALIDATION //
    if (message.author.bot) return; // Check if a bot sent the message (Prevents infinite loop)
    if (!message.guild) return; // Check if the message has a server tied to it
    if (!message.member) message.member = await message.guild.fetchMember(message); // Check if member exists in the server

    // CUSTOM MESSAGES //
    if (message.content === 'Hello' || message.content === 'hello') return message.channel.sendMessage(message.author + `, ${client.user.username} says hello!`);

    // FIND COMMAND & ARGS //
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase(); // Get first argument & make it lowercase
    let command = client.commands.get(cmd); // Get command
    if (!command) command = client.commands.get(client.aliases.get(cmd)); // Get alias
    if (command) command.run(client, message, args); // Run command

    // MESSAGE LOG //
    log && console.log(`    [#${message.channel.name}] ${message.author.username}: ${message.content}`);

    // DELETE MESSAGE //
    if (message.deletable) message.delete();

    // COMMAND ERROR //
    if (!command) return message.reply(`command not recognized! Try ${cb2}.help${cb2} for a list of valid commands...`);
});

// On User Join
client.on(`guildMemberAdd`, async (member) => {
    await API.CREATE_USER(member);
    message.channel.sendMessage(`New member: `, member);
});

// On User Update
client.on(`guildMemberUpdate`, async (oldUser, newUser) => {
    await API.UPDATE_USER(oldUser, newUser);
});

// On Reconnection Attempt
client.on(`reconnecting`, () => {
    log && console.log(`-- Attempting to reconnect to the WebSocket... --`)
});

// On Error
client.on(`error`, (error) => {
    console.log(`-- An ERROR occured --\n`, error)
});

client.login(process.env.TOKEN)