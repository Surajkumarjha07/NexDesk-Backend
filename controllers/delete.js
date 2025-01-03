const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { users } = require("../models");

async function deleteUser(req, res) {
    try {
        let { password } = req.body;
        let { email } = req.user;
        let user = await users.findOne({ email });
        let decodedPassword;
        if (user) {
            decodedPassword = await bcrypt.compare(password, user.password);
        }

        if (!password || !user) {
            res.status(400).json({
                message: "Enter all details"
            })
        }

        if (user && decodedPassword) {
            await users.deleteOne(user);
            res.status(200).json({
                message: "User deleted"
            })
        }
        else {
            res.status(404).json({
                message: "Incorrect email or password"
            })
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = deleteUser