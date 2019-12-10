const { nbsp } = require(`../../tools.js`);
const pj = require('../../package.json');

module.exports = {
    name: `ping`,
    aliases: [`test`],
    category: `general`,
    description: `Returns message & API latency in milliseconds.`,
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Testing ping...`);
        msg.edit(`-- ${client.user.username} v${pj.version} is online --\nResponse Latency ~ ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency ~ ${Math.round(client.ping)}ms`);
    }
}