const { users } = require('../models')

async function getUser(email) {
    try {
        let user = await users.findOne({ email })
        if (user) {
            return user.email;
        }

    } catch (error) {
        console.log("Some error occured", error);
    }
}

module.exports = getUser;