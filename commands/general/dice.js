const { rdmInt } = require(`../../tools.js`);

module.exports = {
    name: `dice`,
    aliases: [`r`, `roll`],
    category: `general`,
    description: `Returns heads or tails based on a 50-50.`,
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        const addThese = args.substring(
            args.lastIndexOf(`+`) + 1,
            args.lastIndexOf(`+`)
        );
        const addThese2 = args.substring(
            args.lastIndexOf(`+`) + 1,
            args.lastIndexOf(`-`)
        );

        const subThese = args.substring(
            args.lastIndexOf(`-`) + 1,
            args.lastIndexOf(`-`)
        );
        const subThese2 = args.substring(
            args.lastIndexOf(`-`) + 1,
            args.lastIndexOf(`+`)
        );

        if (args.includes(`d`)) {
if (args.includes)
        }
        else {
            return message.reply(`invalid dice format!`);
        }
        const arr = args.split(`d`);
        const amount = arr[0];
        const sides = arr[1];

        const 

        
        if (rdmInt(0, 1) === 0)
            return message.reply(`rolled a ${amount}d${sides}${} and got ${}!`);
        else
            return message.reply(`flipped a coin and got TAILS!`);
    }
}