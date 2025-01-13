const { users } = require('../models')
const bcrypt = require("bcrypt");

async function updateUser(req, res) {
    try {
        const { newEmail, newName, currentPassword, newPassword } = req.body
        const { email } = req.user;
        if (!email) {
            res.status(410).json({
                message: "user not authorized"
            });
            return;
        }

        if (!newEmail && !newPassword && !newName) {
            res.status(400).json({
                message: "Provide atleast one field to update"
            });
            return;
        }

        if (!currentPassword) {
            res.status(460).json({
                message: "Previous password needed"
            });
            return;
        }
        let existingEmail = await users.findOne({ email: newEmail })
        let passwordMatched;

        let user = await users.findOne({ email })
        if (user) {
            passwordMatched = await bcrypt.compare(currentPassword, user.password)
        }

        if (!passwordMatched) {
            res.status(401).json({
                message: "Incorrect password"
            });
            return;
        }

        let updatedUser = {}
        if (newEmail && !existingEmail) {
            updatedUser.email = newEmail;
        }

        if (newName) {
            updatedUser.name = newName;
        }

        if (newPassword) {
            const Salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, Salt);
            updatedUser.password = hashedPassword;
        }

        await users.updateOne({ email }, { $set: updatedUser })
        res.status(200).json({
            message: "User updated"
        })
    } catch (error) {
        console.log("Some error occured", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = updateUser