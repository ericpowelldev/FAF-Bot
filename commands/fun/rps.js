//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const { stripIndents } = require(`common-tags`);
const { cb, rdmInt } = require(`../../utils/global.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
  name: `rps`,
  aliases: [`rockpaperscissors`],
  category: `fun`,
  description: `Rock, paper, scissors vs the bot.`,
  params: `[ ${cb}rock / paper / scissors${cb} ]`,
  run: async (client, message, args) => {
    // Setup choices and pick at random by default before the argument is considered
    let choices = [`rock`, `paper`, `scissors`];
    let userChoice = choices[rdmInt(0, 2)];
    let botChoice = choices[rdmInt(0, 2)];

    // Consider the argument to change the user's choice
    if (args[0]) {
      if (args[0].startsWith(`r`)) userChoice = `rock`;
      if (args[0].startsWith(`p`)) userChoice = `paper`;
      if (args[0].startsWith(`s`)) userChoice = `scissors`;
    }

    // Determine the winner
    if (userChoice === botChoice)
      return message.reply(
        `played rock paper scissors! You chose ${cb}${userChoice.toUpperCase()}${cb}, which cancels ${cb}${botChoice.toUpperCase()}${cb}. You ${cb}TIE${cb}!`
      ); // TIE
    if (
      (userChoice === `rock` && botChoice === `scissors`) ||
      (userChoice === `paper` && botChoice === `rock`) ||
      (userChoice === `scissors` && botChoice === `paper`)
    )
      return message.reply(
        `played rock paper scissors! You chose ${cb}${userChoice.toUpperCase()}${cb}, which trumps ${cb}${botChoice.toUpperCase()}${cb}. You ${cb}WIN${cb}!`
      ); // WIN
    if (
      (userChoice === `rock` && botChoice === `paper`) ||
      (userChoice === `paper` && botChoice === `scissors`) ||
      (userChoice === `scissors` && botChoice === `rock`)
    )
      return message.reply(
        `played rock paper scissors! You chose ${cb}${userChoice.toUpperCase()}${cb}, which falls to ${cb}${botChoice.toUpperCase()}${cb}. You ${cb}LOSE${cb}!`
      ); // LOSE
  },
};
