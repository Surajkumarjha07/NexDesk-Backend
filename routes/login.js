const express = require('express');
const { users } = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        let { email, password } = req.body;
        let existingUser = await users.findOne({ email })
        let decodedPassword;
        if (existingUser) {
            decodedPassword = await bcrypt.compare(password, existingUser.password)
        }

        if (!password || !email) {
            res.status(400).json({
                message: "Enter details correctly"
            })
        };

        if (!existingUser || !decodedPassword) {
            res.status(404).json({
                message: "Incorrect Email or Password"
            })
        }

        if (existingUser && decodedPassword) {
            const token = jwt.sign({ email }, "Realtime-Whiteboard", { expiresIn: '1min' })
            res.status(200).json({
                message: "user found",
                token,
                existingUser
            })
        }
    } catch (error) {
        console.log("Some Error Occured", error);
    }
})

module.exports = router;