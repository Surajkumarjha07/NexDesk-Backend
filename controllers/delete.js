const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { users } = require("../models");

async function deleteUser(req, res) {
    try {
        let { password } = req.body;
        let { email } = req.user;
        if (!password) {
            return res.status(400).json({
                message: "Enter Password"
            });
        }
        let user = await users.findOne({ email });
        let decodedPassword;
        if (user) {
            decodedPassword = await bcrypt.compare(password, user.password);
        }

        if (user && decodedPassword) {
            await users.deleteOne(user);
            return res.status(200).json({
                message: "User deleted"
            })
        }
        else {
            return res.status(404).json({
                message: "Incorrect password"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = deleteUser