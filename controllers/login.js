const express = require("express");
const { users } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());

async function login(req, res) {
    try {
        let { email, password } = req.body;
        if (!password || !email) {
            return res.status(400).json({
                message: "Enter details correctly"
            })
        };

        let existingUser = await users.findOne({ email })
        let decodedPassword;

        if (existingUser) {
            decodedPassword = await bcrypt.compare(password, existingUser.password)
        }

        if (!existingUser || !decodedPassword) {
            return res.status(404).json({
                message: "Incorrect Email or Password"
            })
        }

        if (existingUser && decodedPassword) {
            const token = jwt.sign({ email, name: existingUser.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Origin", "https://nexdesk.onrender.com");
            res.cookie("authtoken", token, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 60 * 60 * 1000,
                path: "/"
            })
            res.status(200).json({
                message: "user found",
                token
            })
        }
    } catch (error) {
        console.log("Some Error Occured", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = { login }