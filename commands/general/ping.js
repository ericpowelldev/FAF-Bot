const { nbsp } = require(`../../tools.js`);

module.exports = {
    name: `ping`,
    aliases: [`test`],
    category: `general`,
    description: `Returns message & API latency in milliseconds.`,
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Ping...`);
        msg.edit(`:ping_pong:${nbsp + nbsp}Pong!\nResponse Latency ~ ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency ~ ${Math.round(client.ping)}ms`);
    }
}