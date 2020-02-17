//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { Client, Collection } = require(`discord.js`);
const { config } = require(`dotenv`);
const fs = require(`fs`);
const moment = require(`moment`);
const mongoose = require(`mongoose`);
const pj = require(`./package.json`);
const { prefix, cb, msgXP, log, CREATE_USER, UPDATE_USER, UPDATE_USER_XP } = require(`./utils/global.js`);

//////////////////////////////  SETUP  //////////////////////////////

// Create the client & command collection & prevent @everyone
const client = new Client({ disableEveryone: true });
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync(`./commands/`);

// Config env
config({ path: __dirname + `/.env` });

// Fire command handler
[`command`].forEach(handler => { require(`./handlers/${handler}`)(client) });

// Mongoose
const db = require(`./models`);
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/faf_db`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

//////////////////////////////  VARIABLES  //////////////////////////////

// Action variables
let recentAuthors = [];

//////////////////////////////  ACTIONS  //////////////////////////////

// On Start
client.on(`ready`, () => {
    console.log(`-- (c) ${moment().format(`YYYY`)} by Eric Powell --`);
    console.log(`-- ${client.user.username} v${pj.version} is online --`);
    console.log();
    // log(moment.utc(`10-11-95`, [`MM/DD/YY`, `MM/DD/YYYY`, `MM-DD-YY`, `MM-DD-YYYY`, `DD/MM/YY`, `DD/MM/YYYY`, `DD-MM-YY`, `DD-MM-YYYY`]).format(`MM/DD/YYYY`));

    client.user.setPresence({
        game: {
            name: `.help`,
            type: `LISTENING`
        },
        status: `online`
    }).catch(console.error);
});

// On Message
client.on(`message`, async message => {

    // VALIDATION //
    if (message.author.bot) return; // Check if a bot sent the message (Prevents infinite loop)
    if (!message.guild) return; // Check if the message has a server tied to it
    if (!message.member) message.member = await message.guild.fetchMember(message); // Check if member exists in the server

    // MESSAGE VARIABLES //
    let msgChannel = message.channel.name;
    let msgAuthor = message.author.username;
    let msg = message.content;

    // PUSH TO RECENT MESSAGES ARRAY //
    if (recentAuthors.length < 10) recentAuthors.push(msgAuthor);
    else {
        recentAuthors.shift();
        recentAuthors.push(msgAuthor);
    }
    UPDATE_USER_XP(message.author.id, msgXP - recentAuthors.filter(item => item === message.author.username).length + 1)

    // CUSTOM MESSAGES //
    if (msg === `Hello` || msg === `hello`) return message.channel.sendMessage(message.author + `, ${client.user.username} says hello!`);

    // MESSAGE LOG //
    console.log(`    [#${msgChannel}] ${msgAuthor}: ${msg}`);

    // FIND COMMAND & ARGS //
    if (!msg.startsWith(prefix)) return;
    const args = msg.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase(); // Get first argument & make it lowercase
    let command = client.commands.get(cmd); // Get command
    if (!command) command = client.commands.get(client.aliases.get(cmd)); // Get alias

    // RUN COMMAND //
    if (command) command.run(client, message, args);

    // DELETE MESSAGE //
    if (message.deletable) message.delete();

    // COMMAND ERROR //
    if (!command) return message.reply(`command not recognized! Try ${cb}.help${cb} for a list of valid commands...`);
});

// On User Join
client.on(`guildMemberAdd`, async (member) => {
    await CREATE_USER(member);
    message.channel.sendMessage(`New member: `, member);
});

// On User Update
// client.on(`guildMemberUpdate`, async (oldUser, newUser) => {
//     await UPDATE_USER(oldUser, newUser);
// });

// On Reconnection Attempt
client.on(`reconnecting`, () => {
    console.log(`-- Attempting to reconnect to the WebSocket... --`);
});

// On Error
client.on(`error`, (error) => {
    console.log(`-- An ERROR occured --\n`, error);
});

client.login(process.env.TOKEN);