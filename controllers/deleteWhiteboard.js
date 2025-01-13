const { users } = require("../models");

async function deleteWhiteboard(req, res) {
    const { meetingCode } = req.body;
    const { email } = req.user;

    if (!email) {
        res.status(400).json({
            message: "user not authorized"
        });
        return;
    }

    const user = await users.findOne({ email });

    if (!user) {
        res.status(404).json({
            message: "user not found"
        })
        return;
    }

    try {
        const existingWhiteboard = user.whiteboards.find(whiteboard => whiteboard.meetingCode.trim() === meetingCode.trim());
        user.whiteboards.remove(existingWhiteboard);
        await user.save();
        res.status(200).json({
            message: "whiteboard deleted",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = deleteWhiteboard;