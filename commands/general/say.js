const { RichEmbed } = require(`discord.js`);
const { theme } = require('../../tools.js');

module.exports = {
    name: `say`,
    aliases: [`repeat`],
    category: `general`,
    description: `Returns the message sent by the user.`,
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        if (args.length < 1) return message.reply(`There's nothing to say!`).then(m => m.delete(5000));

        if (args[0].toLowerCase() === `embed`) {
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