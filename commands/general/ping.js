//////////////////////////////  DEPENDENCIES  //////////////////////////////
const pj = require('../../package.json');
const { cb2, nbsp } = require(`../../tools.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    name: `ping`,
    aliases: [`test`],
    category: `general`,
    description: `Returns message & API latency in milliseconds.`,
    params: `-- ${cb2}none${cb2} --`,
    run: async (client, message, args) => {
        const log = false;

        if (args[0] && args[0] === `help`) return message.reply(`try ${cb2}.ping${cb2}`);
        else {
            const msg = await message.channel.send(`Testing ping...`);
            msg.edit(`------------------------------\n${client.user.username} v${pj.version} is online\nResponse Latency ~ ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency ~ ${Math.round(client.ping)}ms\n------------------------------`);
        }
    }
}