//////////////////////////////  DEPENDENCIES  //////////////////////////////
const db = require(`../models`);

//////////////////////////////  EXPORT TOOLS  //////////////////////////////
module.exports = {

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