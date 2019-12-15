//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const moment = require(`moment`);
const { stripIndents } = require(`common-tags`);
const { cb2, nbsp, getMember, formatDate } = require(`../../utils/tools.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    // name: `me`,
    category: `general`,
    description: `Create/Modify your custom stored info.`,
    params: `< ${cb2}custom key${cb2} >    < ${cb2}custom value${cb2} >`,
    example: `${cb2}.me birthday 10/11/1995${cb2}`,
    run: async (client, message, args) => {
        const log = false;

        if (args[0] && args[1]) {
            const key = args[0];
            const val = args[1];
        }
        else {
            return message.reply(`please specify a key:value pair to create/modify. Use ${cb2}.help me${cb2} if you aren't sure what you are doing.`).then(m => m.delete(10000));
        }
    }
}