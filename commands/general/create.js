//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { cb, getMember, CREATE_USER } = require(`../../utils/global.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    name: `create`,
    aliases: [`c`, `insert`],
    category: `general`,
    description: `Inserts a member into the database.`,
    params: `< ${cb}username / id / mention${cb} >`,
    run: async (client, message, args) => {
        if (args.length < 1) return message.reply(`Please specify a user to create!`).then(m => m.delete(5000));
        else {
            const member = getMember(message, args.join(` `));
            if (member) await CREATE_USER(member);
            if (member) return message.reply(`User Created: ${member.user.username}`);
        }
    }
}