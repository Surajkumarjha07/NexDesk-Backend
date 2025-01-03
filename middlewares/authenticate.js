const cookieParser = require("cookie-parser");
const express = require("express")
const jwt = require('jsonwebtoken');

const app = express();
app.use(cookieParser());
app.use(express.json());

async function authenticate(req, res, next) {
    let token = req.cookies.authtoken || req.headers["authorization"]?.split("Bearer ")[1];
    if (!token) {
        return res.status(404).json({ message: "token not available" });
    }

    try {
        let verified = jwt.verify(token, "Realtime-Whiteboard");
        if (verified) {
            req.user = verified;
            next();
        }
    } catch (error) {
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};

module.exports = authenticate;

