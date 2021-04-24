//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { cb, getMember } = require(`../../utils/global.js`);
const { RESET_USER } = require(`../../utils/api.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
  name: `reset`,
  aliases: [`reset`],
  category: `data`,
  description: `Resets a member from the database.`,
  params: `< ${cb}username / id / mention${cb} >`,
  run: async (client, message, args) => {
    if (args.length < 1) return message.reply(`Please specify a user to reset!`).then((m) => m.delete(10000));
    else {
      const member = getMember(message, args.join(` `));
      if (member) {
        await RESET_USER(member.user);
        return message.reply(`User Reset: ${member.user.username}`);
      }
    }
  },
};
