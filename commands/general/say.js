//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const { color, cb } = require(`../../utils/global.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
  name: `say`,
  aliases: [`repeat`],
  category: `general`,
  description: `Returns the message sent by the user.`,
  params: `< ${cb}anything${cb} >`,
  run: async (client, message, args) => {
    if (args.length < 1) return message.reply(`There's nothing to say!`).then((m) => m.delete(5000));
    else if (args[0] && args[0].toLowerCase() === `embed`) {
      const embed = new RichEmbed().setColor(color.discord).setDescription(args.slice(1).join(` `));

      message.channel.send(embed);
    } else {
      message.channel.send(args.join(` `));
    }
  },
};
