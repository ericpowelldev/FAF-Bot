//////////////////////////////  DEPENDENCIES  //////////////////////////////

//////////////////////////////  EXPORT GLOBAL CONTEXT  //////////////////////////////
module.exports = {

  //////////////////////////////  CONSTANTS  //////////////////////////////

  // Stored prefix to initiate a command
  prefix: `.`,

  // Stored prefix to initiate an admin command
  adminPrefix: `!`,

  // Color palette object
  color: {
    info: `#0080ff`,
    success: `#00ff60`,
    warning: `#ffa000`,
    error: `#ff2040`,
    discord: `#7289da`,
    twitch: `#9146ff`,
  },

  // Code-block to string-literal
  cb: "``",

  // Default amount of experience for different actions
  msgXP: 12,

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
    const log = true;
    try {
      toFind = toFind.toLowerCase();
      
      let target = message.guild.members.get(toFind);
      
      if (!target && message.mentions.members) target = message.mentions.members.first();
      
      if (!target && toFind) {
        target = message.guild.members.find(member => {
          return member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind);
        });
      }
      
      if (!target) target = message.member;
      
      log && console.log(`\nFind: "${toFind}" --> Found: ${target ? target.user.username : null}\n`);

      return target;
    }
    catch (err) {
      console.log(`\n>> getMember() FAILED <<\n`, err);
    }
  },

  // Function to format the date into a readable form
  formatDate: function (date) {
    return new Intl.DateTimeFormat(`en-US`).format(date);
  },
}