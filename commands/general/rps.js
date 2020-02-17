//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const { stripIndents } = require(`common-tags`);
const { cb } = require(`../../utils/global.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    // name: `rps`,
    aliases: [`rockpaperscisors`],
    category: `general`,
    description: `Rock, paper, scisors vs the bot.`,
    params: `[ ${cb}choice${cb} ]`,
    run: async (client, message, args) => {
        
    }
}