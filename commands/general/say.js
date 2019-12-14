//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const { theme, cb2 } = require(`../../utils/tools.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    name: `say`,
    aliases: [`repeat`],
    category: `general`,
    description: `Returns the message sent by the user.`,
    params: `< ${cb2}anything${cb2} >`,
    run: async (client, message, args) => {
        const log = false;

        if (args.length < 1) return message.reply(`There's nothing to say!`).then(m => m.delete(5000));
        else if (args[0] && args[0].toLowerCase() === `embed`) {
            const embed = new RichEmbed()
                .setColor(theme.color.discord)
                .setDescription(args.slice(1).join(` `));

            message.channel.send(embed);
        }
        else {
            message.channel.send(args.join(` `));
        }
    }
}