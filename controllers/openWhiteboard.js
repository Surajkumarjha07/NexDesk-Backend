const { users } = require("../models")

async function openWhiteboard(req, res) {
    const { meetingCode } = req.query;
    const { email } = req.user;

    if (!meetingCode) {
        res.status(400).json({
            message: "meetingCode required"
        });
        return;
    }

    try {
        const user = await users.findOne({ email });
        if (user) {
            const whiteboard = user.whiteboards.find(whiteboard => whiteboard.meetingCode.trim() === meetingCode.trim());
            res.status(200).json({
                message: "whiteboard found",
                whiteboard
            });
        }
    } catch (error) {
        console.log("error: ", error);        
    }

}

module.exports = openWhiteboard;