//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const { stripIndents } = require(`common-tags`);
const { pre, theme, cb2, nbsp } = require(`../../utils/tools.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    name: `help`,
    aliases: [`h`, `plz`, `how`, `what`],
    category: `general`,
    description: `Returns the list of valid commands.`,
    params: `[ ${cb2}command / alias${cb2} ]`,
    run: async (client, message, args) => {
        const log = false;

        if (args[0]) return getOne(client, message, args[0]);
        else return getAll(client, message);
    }
}

const getAll = (client, message) => {
    const embed = new RichEmbed()
        .setColor(theme.color.discord)

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${pre}${cmd.name}\``)
            .join(`\n`)
    }

    let info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1).toUpperCase()}** \n${commands(cat)}`)
        .reduce((string, category) => string + `\n` + category);

    return message.channel.send(embed.setDescription(info));
}

const getOne = (client, message, input) => {
    const embed = new RichEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `No information found for the command: ${cb2}${input.toLowerCase()}${cb2} ! Try ${cb2}.help${cb2} for a list of valid commands...`

    if (!cmd) {
        return message.channel.send(embed.setColor(theme.color.bad).setDescription(info))
    }

    if (cmd.name) info = `**Command Name:** ${cb2}${cmd.name}${cb2}`;
    if (cmd.aliases) info += `\n**Aliases:** ${cmd.aliases.map(a => `\`${a}\``).join(`, `)}`;
    if (cmd.description) info += `\n**Description:** ${cmd.description}`;
    if (cmd.params) {
        info += `\n**Parameters:** ${cmd.params}`;
        embed.setFooter(`<required>    [optional]    --none--`)
    }

    return message.channel.send(embed.setColor(theme.color.good).setDescription(info))
}