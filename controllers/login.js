const express = require("express");
const { users } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());

async function login(req, res) {
    try {
        let { email, password } = req.body;
        let existingUser = await users.findOne({ email })
        let decodedPassword;
        if (existingUser) {
            decodedPassword = await bcrypt.compare(password, existingUser.password)
        }

        if (!password || !email) {
            return res.status(400).json({
                message: "Enter details correctly"
            })
        };

        if (!existingUser || !decodedPassword) {
            return res.status(404).json({
                message: "Incorrect Email or Password"
            })
        }

        if (existingUser && decodedPassword) {
            const token = jwt.sign({ email }, "Realtime-Whiteboard", { expiresIn: '1h' })
            res.cookie("authtoken", token, {maxAge: 60*60*1000})
            res.status(200).json({
                message: "user found",
            })
        }
    } catch (error) {
        console.log("Some Error Occured", error);
    }
}

module.exports = { login }