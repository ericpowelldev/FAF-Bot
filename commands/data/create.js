//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { cb, getMember } = require(`../../utils/global.js`);
const { CREATE_USER } = require(`../../utils/api.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    name: `create`,
    aliases: [`c`, `insert`],
    category: `data`,
    description: `Inserts a member into the database.`,
    params: `< ${cb}username / id / mention${cb} >`,
    run: async (client, message, args) => {
        if (args.length < 1) return message.reply(`Please specify a user to create!`).then(m => m.delete(10000));
        else {
            const member = getMember(message, args.join(` `));
            if (member) {
                await CREATE_USER(member.user);
                return message.reply(`User Created: ${member.user.username}`);
            }
        }
    }
}