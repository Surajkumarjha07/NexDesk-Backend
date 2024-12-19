const express = require('express');
const router = express.Router();
const { users } = require('../models')
const bcrypt = require("bcrypt");

router.put("/", async (req, res) => {
    try {
        let { email, newEmail, newName, currentPassword, newPassword } = req.body
        let existingEmail = await users.findOne({ email: newEmail })
        let passwordMatched;
        if (!email) {
            res.status(410).json({
                message: "email not provided"
            });
            return;
        }

        if (!currentPassword) {
            res.status(460).json({
                message: "Previous password needed"
            })
        }

        let user = await users.findOne({ email })
        if (user) {
            passwordMatched = await bcrypt.compare(currentPassword, user.password)
        }

        if (!passwordMatched) {
            res.status(420).json({
                message: "Incorrect password"
            });
            return;
        }

        if (!newEmail && !newPassword && !newName) {
            res.status(430).json({
                message: "Provide atleast one field to update"
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
        else{
            res.status(470).json({
                message: "new password required"
            });
            return;
        }

        await users.updateOne({email}, {$set: updatedUser})
        res.status(200).json({
            message: "User updated"
        })
    } catch (error) {
        console.log("Some error occured", error);
    }
})

module.exports = router;
