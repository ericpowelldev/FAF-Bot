//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const moment = require(`moment`);
const { stripIndents } = require(`common-tags`);
const { cb } = require(`../../utils/global.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    // name: `me`,
    category: `data`,
    description: `Create/Modify your custom stored info.`,
    params: `< ${cb}custom key${cb} >    < ${cb}custom value${cb} >`,
    example: `${cb}.me birthday 10/11/1995${cb}`,
    run: async (client, message, args) => {
        if (args[0] && args[1]) {
            const key = args[0];
            const val = args[1];
        }
        else {
            return message.reply(`please specify a key:value pair to create/modify. Use ${cb}.help me${cb} if you aren't sure what you are doing.`).then(m => m.delete(10000));
        }
    }
}