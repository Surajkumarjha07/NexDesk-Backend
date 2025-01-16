const { users } = require("../models");

async function deleteWhiteboard(req, res) {
    const { meetingCode } = req.body;
    const { email } = req.user;

    if (!email) {
        return res.status(400).json({
            message: "user not authorized"
        });
    }

    const user = await users.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    try {
        const existingWhiteboard = user.whiteboards.find(whiteboard => whiteboard.meetingCode.trim() === meetingCode.trim());
        user.whiteboards.remove(existingWhiteboard);
        await user.save();
        return res.status(200).json({
            message: "whiteboard deleted",
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = deleteWhiteboard;