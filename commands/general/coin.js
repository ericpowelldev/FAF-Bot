const { rdmInt } = require(`../../tools.js`);

module.exports = {
    name: `coin`,
    aliases: [`flip`, `toss`],
    category: `general`,
    description: `Returns heads or tails based on a 50-50.`,
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        
        if (rdmInt(0, 1) === 0)
            return message.reply(`Heads!`);
        else
            return message.reply(`Tails!`);
    }
}