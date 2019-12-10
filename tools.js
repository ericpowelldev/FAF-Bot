module.exports = {

    // Non-breaking space
    nbsp: `\xa0`,

    // Code-block 2
    cb2: "``",

    // Code-block 3
    cb3: "```",

    // Theme palette object
    theme: {
        color: {
            discord: `#7289da`,
        },
    },

    // Function to get a random integer between 2 numbers
    rdmInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Function to get a random float between 2 numbers
    rdmFloat: (min, max) => {
        return Math.random() * (max - min) + min;
    },

    // Function to get a specified member based on a search result
    getMember: function(message, toFind = ``) {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);

        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                    member.user.tag.toLowerCase().includes(toFind);
            });
        }

        if (!target)
            target = message.member;

        return target;
    },
    formatDate: function(date) {
        return new Intl.DateTimeFormat(`en-US`).format(date);
    },
}