const { users } = require("../models");

async function saveWhiteboard(req, res) {
    const { meetingCode, texts, shapes, notes, images } = req.body;
    const { email } = req.user;
    if (!email) {
        res.status(400).json({
            message: "user not authorized"
        });
        return;
    }

    const user = await users.findOne({ email });

    if (user) {
        const newWhiteboard = {
            meetingCode: meetingCode,
            texts: texts || [],
            shapes: shapes || [],
            notes: notes || [],
            images: images || []
        }

        const existingWhiteboard = user.whiteboards.find(whiteboard => whiteboard.meetingCode === meetingCode);
        if (existingWhiteboard) {
            user.whiteboards.remove(existingWhiteboard)
        }
        
        user.whiteboards.push(newWhiteboard);
        await user.save();
        res.status(200).json({
            message: "whiteboard added",
        })
    }
    else {
        res.status(404).json({
            message: "unauthenticated user"
        })
    }
}

module.exports = saveWhiteboard;