const { cb2, rdmInt } = require(`../../tools.js`);

module.exports = {
    name: `coin`,
    aliases: [`flip`, `toss`],
    category: `general`,
    description: `Returns heads or tails based on a 50-50.`,
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (args[0] && args[0] === `help`) return message.reply(`try ${cb2}.coin${cb2}`);
        else return message.reply(`flipped a ${cb2}coin${cb2} and got ${cb2}${rdmInt(0, 1) === 0 ? `HEADS` : `TAILS`}${cb2}`);
    }
}