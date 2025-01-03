const jwt = require('jsonwebtoken');
const { users } = require('../models')

async function userAuthenticated(req, res) {
    let token = req.cookies.authtoken || req.headers["authorization"].split(" ")[1];
    if (!token) {
        return res.status(640).json({
            message: "unauthorized"
        })
    }

    let verified = jwt.verify(token, "Realtime-Whiteboard");
    if (verified) {
        return res.status(200).json({
            message: "authorized"
        })
    }
}

module.exports = userAuthenticated;