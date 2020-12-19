//////////////////////////////  DEPENDENCIES  //////////////////////////////
const db = require(`../models`);

//////////////////////////////  EXPORT GLOBAL CONTEXT  //////////////////////////////
module.exports = {

  // Adds a new user to the database when they join the server or dont already exist
  CREATE_USER: (user) => {
    const log = true;
    try {
      log && console.log(`\n-- CREATE_USER ATTEMPT --\n`, user.username);

      const newUser = new db.User({
        name: user.username,
        uid: user.id,
      });

      newUser.save()
        .then(res => {
          log && console.log(`\n<< CREATE_USER SUCCESS >>\n`, res);
          return res;
        })
        .catch(err => console.log(`\n>> CREATE_USER FAILED <<, Caught at newUser.save()\n`, err));
    }
    catch (err) { console.log(`\n>> CREATE_USER FAILED <<\n`, err); }
    return null;
  },

  // Finds user by uid
  FIND_USER: (user) => {
    const log = true;
    try {
      db.User.findOne({ uid: user.id })
        .then(res => {
          log && console.log(`\n<< FIND_USER SUCCESS >>\n`, res);
          return res;
        })
        .catch(err => console.log(`\n>> FIND_USER FAILED <<, Could not find user\n`, err));
    }
    catch (err) { console.log(`\n>> FIND_USER FAILED <<\n`, err); }
  },

  // Updates user xp by uid
  UPDATE_USER_XP: (user, xp) => {
    const log = true;
    try {
      db.User.findOneAndUpdate({ uid: user.id }, { $inc: { xp: xp } }, { new: true })
        .then(res => {
          const nextXP = res.lvl * 100 * (res.lvl + 1);
          if (res.xp > nextXP) {
            db.User.findOneAndUpdate({ uid: user.id }, { $inc: { lvl: 1, gold: (res.lvl) * 10 } }, { new: true })
              .then(res => {
                log && console.log(`\n${res.name} has leveled up to lvl ${res.lvl}!\n`);
              })
              .catch(err => console.log(`\n>> UPDATE_USER_XP FAILED <<, Could not update lvl\n`, err));
          }
        })
        .catch(err => {
          console.log(`\n>> UPDATE_USER_XP FAILED <<, Could not update xp\n`, err);
          this.CREATE_USER(user);
        });
    }
    catch (err) { console.log(`\n>> UPDATE_USER_XP FAILED <<\n`, err); }
  },

  // Upsert user info by id (key: value pair)
  UPSERT_USER_INFO: (user, key, val) => {

  },
}