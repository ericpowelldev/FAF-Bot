//////////////////////////////  DEPENDENCIES  //////////////////////////////
const db = require(`../models`);

//////////////////////////////  EXPORT GLOBAL CONTEXT  //////////////////////////////
module.exports = {

    //////////////////////////////  CONSTANTS  //////////////////////////////

    // Stored prefix to initiate a command
    prefix: `.`,

    // Color palette object
    color: {
        info: `#0080ff`,
        success: `#00ff60`,
        warning: `#ffa000`,
        error: `#ff2040`,
        discord: `#7289da`,
        twitch: `#6441a5`,
    },

    // Code-block to string-literal
    cb: "``",

    // Default amount of experience for messages
    msgXP: 10,

    //////////////////////////////  FUNCTIONS  //////////////////////////////

    // Function to console log when logging is activated
    log: (msg = ``, obj = ``) => {
        if (msg === `` && obj === ``) console.log();
        else if (obj === ``) console.log(msg);
        else console.log(msg, obj);
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
    getMember: function (message, toFind = ``) {
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
    formatDate: function (date) {
        return new Intl.DateTimeFormat(`en-US`).format(date);
    },

    //////////////////////////////  API  //////////////////////////////

    // Adds a new user to the database when they join the server
    CREATE_USER: (member) => {
        const log = true;

        log && console.log();
        log && console.log(`Attempting to create user...`, member.user.username);

        const newUser = new db.User({
            name: member.user.username,
            uid: member.user.id,
        });

        newUser.save()
            .then(res => log && console.log(`User creation success:`, res))
            .catch(err => console.log(`User creation failed:`, err));
    },

    // Finds user by uid
    FIND_USER: (uid) => {
        db.User.findOne({ uid: uid })
            .then(res => {
                return res;
            })
            .catch(err => console.log(`Failed to find user:`, err));
    },

    // Updates user xp by uid
    UPDATE_USER_XP: (uid, xp) => {
        db.User.findOneAndUpdate({ uid: uid }, { $inc: { xp: xp } }, { new: true })
            .then(res => {
                const nextXP = res.lvl * 100 * (res.lvl + 1);
                if (res.xp > nextXP) {
                    db.User.findOneAndUpdate({ uid: uid }, { $inc: { lvl: 1, gold: (res.lvl + 1) * 10 } }, { new: true })
                        .then(res => {
                            console.log();
                            console.log(`${res.name} has leveled up to lvl ${res.lvl}!`);
                            console.log();
                        })
                        .catch(err => console.log(`Failed to find user and update lvl:`, err));
                }
            })
            .catch(err => console.log(`Failed to find user and update xp:`, err));
    },

    // Upsert user info by id (key: value pair)
    UPSERT_USER_INFO: (uid, key, val) => {

    }
}