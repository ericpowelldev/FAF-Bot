//////////////////////////////  DEPENDENCIES  //////////////////////////////
const { RichEmbed } = require(`discord.js`);
const { stripIndents } = require(`common-tags`);
const { cb2, nbsp, getMember, formatDate } = require(`../../utils/tools.js`);

//////////////////////////////  EXPORT COMMAND  //////////////////////////////
module.exports = {
    name: `info`,
    aliases: [`user`, `userinfo`, `member`, `memberinfo`],
    category: `general`,
    description: `Returns info on the specified user.`,
    params: `[ ${cb2}username / id / mention${cb2} ]`,
    run: async (client, message, args) => {
        const log = false;

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

            .addField(`User Info`, stripIndents`**Username:**${nbsp + nbsp + nbsp}${member.user.username}
                    **Tag:**${nbsp + nbsp + nbsp}#${member.user.tag.split(`#`)[1]}
                    **ID:**${nbsp + nbsp + nbsp}${member.user.id}
                    **Created:**${nbsp + nbsp + nbsp}${created}`, true)

            .addField(`Member Info`, stripIndents`**Nickname:**${nbsp + nbsp + nbsp}${member.displayName}
                    **Roles:**${nbsp + nbsp + nbsp}${roles}
                    **Joined:**${nbsp + nbsp + nbsp}${joined}`, true)

            .setTimestamp()

        if (member.user.presence.game)
            embed.addField(`Playing`, `**${member.presence.game.name}**`);

        message.channel.send(embed);
    }
}