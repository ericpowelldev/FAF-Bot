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

    },
}