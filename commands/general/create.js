//////////////////////////////  DEPENDENCIES  //////////////////////////////
const API = require(`../../utils/API.js`);
const { cb2, getMember } = require(`../../utils/tools.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    name: `create`,
    aliases: [`c`, `insert`],
    category: `general`,
    description: `Inserts a member into the database.`,
    params: `< ${cb2}username / id / mention${cb2} >`,
    run: async (client, message, args) => {
        const log = false;

        if (args.length < 1) return message.reply(`Please specify a user to create!`).then(m => m.delete(5000));
        else {
            const member = getMember(message, args.join(` `));
            if (member) await API.CREATE_USER(member);
            if (member) return message.reply(`User Created: ${member.user.username}`);
        }
    }
}