//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const { stripIndents } = require(`common-tags`);
const { cb, log, rdmInt } = require(`../../utils/global.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    name: `roll`,
    aliases: [`r`, `dice`, `d`],
    category: `fun`,
    description: `Rolls a die based on a number of dice, number of sides, and modifier.`,
    params: `[ ${cb}# of dice${cb} ] d [ ${cb}# of sides${cb} ] + [ ${cb}modifiers${cb} ]`,
    example: `${cb}.r 4d20+69${cb}`,
    run: async (client, message, args) => {
        if (args[0] && args[0].includes(`d`)) {

            let amount = parseInt(args[0].split(`d`)[0]);
            amount = !isNaN(amount) && amount !== 0 ? Math.abs(amount) : 1;

            let sides = parseInt(args[0].split(`d`)[1].split(`+` && `-`)[0]);
            sides = !isNaN(sides) && sides !== 0 ? Math.abs(sides) : 20;

            let mods = args[0].split(`d`)[1].split(``);
            if (mods.includes(`+`)) mods = mods.slice(mods.indexOf(`+`))
            else if (mods.includes(`-`)) mods = mods.slice(mods.indexOf(`-`));
            else mods = [`0`];
            log();
            log(`RAW MODS: `, mods);
            for (let i = 0; i < mods.length; i++) {
                const cur = mods[i];
                const prev = mods[i - 1];

                if (isNaN(cur) && cur !== `+` && cur !== `-`) {
                    mods.splice(i, 1);
                    i--;
                }
                else if ((cur === `+` || cur === `-`) && (prev === `+` || prev === `-`)) {
                    mods.splice(i - 1, 1);
                    i--;
                }
                else { }
            }
            if (mods.length <= 1) {
                mods = [`0`];
            }

            log();
            log(`AMOUNT: `, amount);
            log(`SIDES: `, sides);
            log(`MODS: `, mods);

            let results = [];

            for (let i = 1; i <= amount; i++) {
                results.push(rdmInt(1, sides));
            }

            log();
            log(`RESULTS: `, results);

            const resNum = results.reduce((total, current) => total + current);
            const resMod = eval(mods.reduce((total, current) => total + current));
            const total = resNum + resMod;

            log();
            log(`RESULT NUMBER: `, resNum);
            log(`RESULT MOD: `, resMod);
            log(`TOTAL: `, total);
            log();

            return message.reply(`rolled ${cb}${amount}d${sides}${resMod !== 0 ? (resMod > 0 ? "+" + resMod : resMod) : ``}${cb} and got ${cb}${total}${cb}${args[0] === `4d20+69` ? ` ( ͡° ͜ʖ ͡°)` : ``}`);
        }
        else {
            const result = rdmInt(1, 20);
            return message.reply(`rolled ${cb}1d20${cb} and got ${cb}${result}${cb}${result === 20 ? ` --> Crit Success` : (result === 1 ? ` --> Crit Fail` : ``)}`);
        }
    }
}