const { users } = require("../models")

async function openWhiteboard(req, res) {
    const { meetingCode } = req.query;
    const { email } = req.user;

    if (!meetingCode) {
        return res.status(400).json({
            message: "meetingCode required"
        });
    }

    try {
        const user = await users.findOne({ email });
        if (user) {
            const whiteboard = user.whiteboards.find(whiteboard => whiteboard.meetingCode.trim() === meetingCode.trim());
            return res.status(200).json({
                message: "whiteboard found",
                whiteboard
            });
        }
    } catch (error) {
        console.error("error: ", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }

}

module.exports = openWhiteboard;