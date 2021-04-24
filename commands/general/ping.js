//////////////////////////////  DEPENDENCIES  //////////////////////////////
const pj = require(`../../package.json`);
const { cb } = require(`../../utils/global.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
  name: `ping`,
  aliases: [`test`],
  category: `general`,
  description: `Returns message & API latency in milliseconds.`,
  params: `-- ${cb}none${cb} --`,
  run: async (client, message, args) => {
    const msg = await message.channel.send(`Testing ping...`);
    msg.edit(
      `------------------------------\n${client.user.username} v${
        pj.version
      } is online\nResponse Latency ~ ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency ~ ${Math.round(
        client.ping
      )}ms\n------------------------------`
    );
  },
};
