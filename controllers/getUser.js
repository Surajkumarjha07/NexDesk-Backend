const { users } = require('../models')

async function getUser(req, res) {
    try {
        let { email } = req.query;
        let user = await users.findOne({ email })
        if (user) {
            res.status(200).json({
                message: "user fetched",
                user
            })
        }

    } catch (error) {
        console.log("Some error occured", error);
    }
}

module.exports = getUser;