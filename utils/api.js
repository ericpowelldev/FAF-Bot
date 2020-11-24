//////////////////////////////  DEPENDENCIES  //////////////////////////////
const db = require(`../models`);

//////////////////////////////  EXPORT GLOBAL CONTEXT  //////////////////////////////
module.exports = {

  // Adds a new user to the database when they join the server
  CREATE_USER: (member) => {
    const log = true;
    try {
      log && console.log(`\n-- CREATE_USER ATTEMPT --\n`, member.user.username);

      const newUser = new db.User({
        name: member.user.username,
        uid: member.user.id,
      });

      newUser.save()
        .then(res => log && console.log(`\n<< CREATE_USER SUCCESS >>\n`, res))
        .catch(err => console.log(`\n>> CREATE_USER FAILED <<, Caught at newUser.save()\n`, err));
    }
    catch (err) { console.log(`\n>> CREATE_USER FAILED <<\n`, err); }
  },

  // Finds user by uid
  FIND_USER: (uid) => {
    const log = true;
    try {
      db.User.findOne({ uid: uid })
        .then(res => {
          log && console.log(`\n<< FIND_USER SUCCESS >>\n`, res);
          return res;
        })
        .catch(err => console.log(`\n>> FIND_USER FAILED <<, Could not find user\n`, err));
    }
    catch (err) { console.log(`\n>> FIND_USER FAILED <<\n`, err); }
  },

  // Updates user xp by uid
  UPDATE_USER_XP: (uid, xp) => {
    const log = true;
    try {
      db.User.findOneAndUpdate({ uid: uid }, { $inc: { xp: xp } }, { new: true })
        .then(res => {
          const nextXP = res.lvl * 100 * (res.lvl + 1);
          if (res.xp > nextXP) {
            db.User.findOneAndUpdate({ uid: uid }, { $inc: { lvl: 1, gold: (res.lvl + 1) * 10 } }, { new: true })
              .then(res => {
                console.log(`\n${res.name} has leveled up to lvl ${res.lvl}!\n`);
              })
              .catch(err => console.log(`\n>> UPDATE_USER_XP FAILED <<, Could not update lvl\n`, err));
          }
        })
        .catch(err => console.log(`\n>> UPDATE_USER_XP FAILED <<, Could not update xp\n`, err));
    }
    catch (err) { console.log(`\n>> UPDATE_USER_XP FAILED <<\n`, err); }
  },

  // Upsert user info by id (key: value pair)
  UPSERT_USER_INFO: (uid, key, val) => {

  },
}