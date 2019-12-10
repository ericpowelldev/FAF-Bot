const { rdmInt } = require(`../../tools.js`);

module.exports = {
    name: `dice`,
    aliases: [`r`, `roll`],
    category: `general`,
    description: `Rolls a die based on an amount, number of sides, and modifier.`,
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (args[0].includes(`d`)) {
            const amount = args[0].split(`d`)[0];
            const numArgs = args[0].split(`d`)[1];
            const sides = numArgs.split(`+` || `-` || `*` || `/` || ``)[0];
            const mods = numArgs.split(`+` || `-` || `*` || `/` || ``).shift();
            console.log(amount);
            console.log(numArgs);
            console.log(sides);
            console.log(mods);

            if (!isNaN(amount) && !isNaN(sides)) {
                return message.reply(`valid dice format.`);
            }
            else {
                return message.reply(`invalid dice format!`);
            }
        }
        else {
            return message.reply(`invalid dice format!`);
        }
    }
}