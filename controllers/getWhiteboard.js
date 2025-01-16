const { users } = require("../models");

async function getWhiteboards(req, res) {
    const { email } = req.user;
    const user = await users.findOne({ email });

    if (user) {
        const whiteboards = user.whiteboards;

        return res.status(200).json({
            message: "all whiteboards fetched",
            whiteboards
        });
    }
    return res.status(400).json({
        message: "bad request"
    });
}

module.exports = getWhiteboards;