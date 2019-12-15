//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const { evaluate } = require(`mathjs`);
const { stripIndents } = require(`common-tags`);
const { UPSERT_USER_INFO } = require(`../../utils/API.js`);
const { cb2 } = require(`../../utils/tools.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    // name: `math`,
    aliases: [`m`, `mathematics`, `arithmetic`],
    category: `general`,
    description: `Returns result of an equation.`,
    params: `< ${cb2}equation${cb2} >`,
    example: `${cb2}.m 4*20+(69-42)/(2^2)${cb2}`,
    run: async (client, message, args) => {
        const log = false;

        if (args[0]) {
            const result = evaluate(args.join(` `));
            if (result) return message.reply(`${cb2}${args.join(` `)}${cb2} = ${cb2}${result}${cb2}`);
            else return message.reply(`try formulating a valid equation...`).then(m => m.delete(5000));
        }
        else {

        }
    }
}