//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { cb, rdmInt } = require(`../../utils/global.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
  name: `coin`,
  aliases: [`flip`, `toss`],
  category: `fun`,
  description: `Returns heads or tails based on a 50-50.`,
  params: `-- ${cb}none${cb} --`,
  run: async (client, message, args) => {
    return message.reply(`flipped a coin and got ${cb}${rdmInt(0, 1) === 0 ? `HEADS` : `TAILS`}${cb}`);
  },
};
