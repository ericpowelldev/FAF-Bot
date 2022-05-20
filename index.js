//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { Client, Collection } = require(`discord.js`);
const { config } = require(`dotenv`);
const fs = require(`fs`);
const mongoose = require(`mongoose`);
const pj = require(`./package.json`);

const { prefix, adminPrefix, cb, msgXP, now } = require(`./utils/global.js`);
const { CREATE_USER, UPDATE_USER_XP } = require(`./utils/api.js`);

const dayjs = require(`dayjs`);
const localizedFormat = require(`dayjs/plugin/localizedFormat`);
const utc = require(`dayjs/plugin/utc`);
dayjs.extend(localizedFormat);
dayjs.extend(utc);

//////////////////////////////  SETUP  //////////////////////////////

// Create the client & command collection & prevent @everyone
const client = new Client({ disableEveryone: true });
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync(`./commands/`);

// Config env
config({ path: __dirname + `/.env` });

// Fire command handler
[`command`].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

// Mongoose
const db = require(`./models`);
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/faf_db`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//////////////////////////////  VARIABLES  //////////////////////////////

// Action variables
let recentAuthors = [];
let greetings = [`hello`, `hey`, `hi`, `sup`, `yo`];

//////////////////////////////  ACTIONS  //////////////////////////////

// On Start
client.on(`ready`, () => {
  console.log(`\n${now()} - CONNECTED to the server\n`);
  console.log(`-- (c) ${dayjs().format(`YYYY`)} by Eric Powell --`);
  console.log(`-- ${client.user.username} v${pj.version} is online --`);
  console.log();
  // log(dayjs.utc(`10-11-95`, [`MM/DD/YY`, `MM/DD/YYYY`, `MM-DD-YY`, `MM-DD-YYYY`, `DD/MM/YY`, `DD/MM/YYYY`, `DD-MM-YY`, `DD-MM-YYYY`]).format(`MM/DD/YYYY`));

  client.user
    .setPresence({
      game: {
        name: `.help`,
        type: `LISTENING`,
      },
      status: `online`,
    })
    .catch(console.error);
});

// On Message
client.on(`message`, async (message) => {
  const log = true;
  try {
    // VALIDATION //
    if (message.author.bot) return; // Ignore if the bot itself sent the message (Prevents infinite loop)
    if (!message.guild) return; // Ignore if message does not have a server tied to it
    if (!message.member) message.member = await message.guild.fetchMember(message); // Check if member exists in the server

    // MESSAGE VARIABLES //
    let msgChannel = message.channel.name;
    let msgAuthor = message.author.username;
    let msgTime = dayjs(message.createdTimestamp).format(`MM/DD/YYYY LTS`);
    let msg = message.content;

    // MESSAGE LOG //
    log && console.log(`${msgTime} - ${msgAuthor} [#${msgChannel}]: ${msg}`);

    // PUSH TO RECENT MESSAGES ARRAY //
    if (recentAuthors.length < 6) recentAuthors.push(msgAuthor);
    else {
      recentAuthors.shift();
      recentAuthors.push(msgAuthor);
    }

    // UPDATE THE MESSAGE AUTHOR'S XP
    // let xpToAdd = msgXP - (recentAuthors.filter(item => item === msgAuthor).length * 2) // Add XP to user based on how much the user has spammed the chat (10, 8, 6, 4, 2, 0)
    let xpToAdd = msgXP;
    await UPDATE_USER_XP(message.author, xpToAdd);

    // CUSTOM GREETINGS //
    greetings.map((greeting) => {
      if (msg.toLocaleLowerCase() === greeting)
        return message.channel.send(message.author + `, ${client.user.username} says ${greeting}!`);
    });

    // FIND COMMAND & ARGS //
    if (!msg.startsWith(prefix) && !msg.startsWith(adminPrefix)) return;
    const args = msg.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase(); // Get first argument & make it lowercase
    let command = client.commands.get(cmd); // Get command
    if (!command) command = client.commands.get(client.aliases.get(cmd)); // Get alias

    // RUN COMMAND //
    if (command) command.run(client, message, args);

    // DELETE MESSAGE //
    if (message.deletable) message.delete();

    // COMMAND ERROR //
    if (!command)
      return message
        .reply(`command not recognized! Try ${cb}.help${cb} for a list of valid commands...`)
        .then((m) => m.delete(10000));
  } catch (err) {
    console.log(`\n${now()} - An ERROR occured on message\n`, err);
  }
});

// On User Join
client.on(`guildMemberAdd`, async (member) => {
  await CREATE_USER(member.user);
  message.channel.send(`New member: `, member);
});

// On User Update
// client.on(`guildMemberUpdate`, async (oldUser, newUser) => {
//     await UPDATE_USER(oldUser, newUser);
// });

// On Reconnection Attempt
client.on(`reconnecting`, () => {
  console.log(`\n${now()} - RECONNECTING to the server\n`);
});

// On Disconnection
client.on(`disconnect`, () => {
  console.log(`\n${now()} - DISCONNECTED from the server\n`);
});

// On Error
client.on(`error`, (err) => {
  console.log(`\n${now()} - An ERROR occured:\n`, err);
});

// On Unhandled Rejection
process.on(`unhandledRejection`, (err) => {
  console.log(`\n${now()} - An UNHANDLED REJECTION occured:\n`, err);
});

client.login(process.env.TOKEN);
