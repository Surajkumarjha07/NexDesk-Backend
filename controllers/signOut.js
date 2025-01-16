const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(cookieParser());
app.use(express.json());

async function signOut(req, res) {
    return res.status(200).json({
        message: "user logged out"
    })
}

module.exports = signOut;