//////////////////////////////  DEPENDENCIES  //////////////////////////////


//////////////////////////////  EXPORT TOOLS  //////////////////////////////
module.exports = {

    // Stored prefix to initiate a command
    pre: `.`,

    // Theme palette object
    theme: {
        color: {
            bad: `#ff6000`,
            discord: `#7289da`,
            good: `#00ff60`,
        },
    },

    // Non-breaking space
    nbsp: `\xa0`,

    // Code-block 2
    cb2: "``",

    // Code-block 3
    cb3: "```",

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
    // Function to format the date into a readable form
    formatDate: function(date) {
        return new Intl.DateTimeFormat(`en-US`).format(date);
    },
}