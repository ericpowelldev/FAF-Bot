//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const { stripIndents } = require(`common-tags`);
const { cb, getMember, formatDate } = require(`../../utils/global.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    name: `info`,
    aliases: [`i`, `user`, `userinfo`, `member`, `memberinfo`],
    category: `data`,
    description: `Returns info on the specified user.`,
    params: `[ ${cb}username / id / mention${cb} ]`,
    run: async (client, message, args) => {
        const member = getMember(message, args.join(` `));
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(`, `) || `None`;
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor)

            .addField(`User Info`, stripIndents`**Username:**\xa0\xa0\xa0${member.user.username}
                    **Tag:**\xa0\xa0\xa0#${member.user.tag.split(`#`)[1]}
                    **ID:**\xa0\xa0\xa0${member.user.id}
                    **Created:**\xa0\xa0\xa0${created}`, true)

            .addField(`Member Info`, stripIndents`**Nickname:**\xa0\xa0\xa0${member.displayName}
                    **Roles:**\xa0\xa0\xa0${roles}
                    **Joined:**\xa0\xa0\xa0${joined}`, true)

            .setTimestamp()

        if (member.user.presence.game)
            embed.addField(`Playing`, `**${member.presence.game.name}**`);

        message.channel.send(embed);
    }
}