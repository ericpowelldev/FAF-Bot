//////////////////////////////  DEPENDENCIES  //////////////////////////////
const db = require(`../models`);
const { getNextXP } = require(`./global`);

//////////////////////////////  API FUNCTIONS  //////////////////////////////

/** Return Structure
 * success (Boolean) - Success status after running the api function
 * message (String) - Message from response
 * res (Object) - Returned response object if successful
 * error (Object) - Returned error object if not successful
 */

// Finds user by uid
const FIND_USER = async (user) => {
  const log = true;
  try {
    log && console.log(`\n-- FIND_USER ATTEMPT --\n`, user?.username);

    db.User.findOne({ uid: user?.id }).then((res) => {
      log && console.log(`\n<< FIND_USER SUCCESS >>\n`, res);
      return { success: true, message: `User found successfully!`, res: res };
    });
  } catch (err) {
    console.log(`\n>> FIND_USER FAILED <<\n`, err);
    return { success: false, message: `Failed to find user!`, error: err };
  }
};

// Adds a new user to the database when they join the server or dont already exist
const CREATE_USER = async (user) => {
  const log = true;
  try {
    log && console.log(`\n-- CREATE_USER ATTEMPT --\n`, user?.username);

    const newUser = new db.User({
      name: user?.username,
      uid: user?.id,
    });

    newUser.save().then((res) => {
      log && console.log(`\n<< CREATE_USER SUCCESS >>\n`, res);
      return { success: true, message: `User created successfully!`, res: res };
    });
  } catch (err) {
    console.log(`\n>> CREATE_USER FAILED <<\n`, err);
    return { success: false, message: `Failed to create user!`, error: err };
  }
};

// Resets user by uid
const RESET_USER = async (user) => {
  const log = true;
  try {
    log && console.log(`\n-- RESET_USER ATTEMPT --\n`, user?.username);

    db.User.findOneAndUpdate({ uid: user?.id }, { $set: { lvl: 0, xp: 0, gold: 100 } }, { new: true }).then((res) => {
      log && console.log(`\n<< RESET_USER SUCCESS >>\n`, res);
      return { success: true, message: `User reset successfully!`, res: res };
    });
  } catch (err) {
    console.log(`\n>> RESET_USER FAILED <<\n`, err);
    return { success: false, message: `Failed to reset user!`, error: err };
  }
};

// Updates user xp by uid
const UPDATE_USER_XP = async (user, xp) => {
  const log = false;
  try {
    log && console.log(`\n-- UPDATE_USER_XP ATTEMPT --\n`, user?.username);

    db.User.findOneAndUpdate({ uid: user?.id }, { $inc: { xp: xp } }, { new: true }).then((res) => {
      log && console.log(`\n<< UPDATE_USER_XP SUCCESS >>\n`, res?.xp);
      const nextLvl = res?.lvl + 1;
      const nextXP = getNextXP(nextLvl);
      if (res?.xp >= nextXP) UPDATE_USER_LVL(user, nextLvl);
      return { success: true, message: `User xp updated successfully!`, res: res };
    });
  } catch (err) {
    console.log(`\n>> UPDATE_USER_XP FAILED <<\n`, err);
    return { success: false, message: `Failed to update user xp!`, error: err };
  }
};

// Updates user level if xp exceeds current level limit
const UPDATE_USER_LVL = async (user, nextLvl) => {
  const log = false;
  try {
    log && console.log(`\n-- UPDATE_USER_LVL ATTEMPT --\n`, user?.username);

    db.User.findOneAndUpdate({ uid: user?.id }, { $inc: { lvl: 1, gold: nextLvl * 10 } }, { new: true }).then((res) => {
      log && console.log(`\n<< UPDATE_USER_LVL SUCCESS >>\n`, nextLvl);
      console.log(`\n${res?.name} has leveled up to lvl ${res?.lvl}!\n`);
      return { success: true, message: `User lvl updated successfully!`, res: res };
    });
  } catch (err) {
    console.log(`\n>> UPDATE_USER_LVL FAILED <<\n`, err);
    return { success: false, message: `Failed to update user lvl!`, error: err };
  }
};

// Upsert user info by id (key: value pair)
const UPSERT_USER_INFO = async (user, key, val) => {
  const log = true;
  return null;
};

//////////////////////////////  EXPORT API FUNCTIONS  //////////////////////////////
module.exports = {
  FIND_USER,
  CREATE_USER,
  RESET_USER,
  UPDATE_USER_XP,
  UPDATE_USER_LVL,
  UPSERT_USER_INFO,
};
