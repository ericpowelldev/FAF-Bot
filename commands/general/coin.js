//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { cb2, rdmInt } = require(`../../utils/tools.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    name: `coin`,
    aliases: [`flip`, `toss`],
    category: `general`,
    description: `Returns heads or tails based on a 50-50.`,
    params: `-- ${cb2}none${cb2} --`,
    run: async (client, message, args) => {
        const log = false;

        return message.reply(`flipped a ${cb2}coin${cb2} and got ${cb2}${rdmInt(0, 1) === 0 ? `HEADS` : `TAILS`}${cb2}`);
    }
}