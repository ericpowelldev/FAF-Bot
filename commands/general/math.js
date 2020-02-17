//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const { evaluate } = require(`mathjs`);
const { stripIndents } = require(`common-tags`);
const { cb } = require(`../../utils/global.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    // name: `math`,
    aliases: [`m`, `mathematics`, `arithmetic`],
    category: `general`,
    description: `Returns result of an equation.`,
    params: `< ${cb}equation${cb} >`,
    example: `${cb}.m 4*20+(69-42)/(2^2)${cb}`,
    run: async (client, message, args) => {
        if (args[0]) {
            const result = evaluate(args.join(` `));
            if (result) return message.reply(`${cb}${args.join(` `)}${cb} = ${cb}${result}${cb}`);
            else return message.reply(`try formulating a valid equation...`).then(m => m.delete(5000));
        }
        else {

        }
    }
}