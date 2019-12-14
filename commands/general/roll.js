//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const { stripIndents } = require(`common-tags`);
const { cb2, nbsp, rdmInt, getMember, formatDate } = require(`../../utils/tools.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    name: `roll`,
    aliases: [`r`, `dice`, `d`],
    category: `general`,
    description: `Rolls a die based on a number of dice, number of sides, and modifier.`,
    params: `[ ${cb2}# of dice${cb2} ]    [ ${cb2}# of sides${cb2} ]    [ ${cb2}modifiers${cb2} ]`,
    run: async (client, message, args) => {
        const log = false;

        if (args[0] && args[0].includes(`d`)) {

            let amount = parseInt(args[0].split(`d`)[0]);
            amount = !isNaN(amount) && amount !== 0 ? Math.abs(amount) : 1;

            let sides = parseInt(args[0].split(`d`)[1].split(`+` && `-`)[0]);
            sides = !isNaN(sides) && sides !== 0 ? Math.abs(sides) : 20;

            let mods = args[0].split(`d`)[1].split(``);
            if (mods.includes(`+`)) mods = mods.slice(mods.indexOf(`+`))
            else if (mods.includes(`-`)) mods = mods.slice(mods.indexOf(`-`));
            else mods = [`0`];
            if (log) console.log();
            if (log) console.log(`RAW MODS: `, mods);
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

            if (log) console.log();
            if (log) console.log(`AMOUNT: `, amount);
            if (log) console.log(`SIDES: `, sides);
            if (log) console.log(`MODS: `, mods);

            let results = [];

            for (let i = 1; i <= amount; i++) {
                results.push(rdmInt(1, sides));
            }

            if (log) console.log();
            if (log) console.log(`RESULTS: `, results);

            const resNum = results.reduce((total, current) => total + current);
            const resMod = eval(mods.reduce((total, current) => total + current));
            const total = resNum + resMod;

            if (log) console.log();
            if (log) console.log(`RESULT NUMBER: `, resNum);
            if (log) console.log(`RESULT MOD: `, resMod);
            if (log) console.log(`TOTAL: `, total);

            return message.reply(`rolled ${cb2}${amount}d${sides}${resMod !== 0 ? (resMod > 0 ? "+" + resMod : resMod) : ``}${cb2} and got ${cb2}${total}${cb2}${args[0] === `4d20+69` ? ` ( ͡° ͜ʖ ͡°)` : ``}`);
        }
        else {
            const result = rdmInt(1, 20);
            return message.reply(`rolled ${cb2}1d20${cb2} and got ${cb2}${result}${cb2}${result === 20 ? ` --> Crit Success` : (result === 1 ? ` --> Crit Fail` : ``)}`);
        }
    }
}