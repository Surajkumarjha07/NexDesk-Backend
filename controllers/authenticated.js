const jwt = require('jsonwebtoken');
require("dotenv").config();

async function userAuthenticated(req, res) {
    try {
        const token = req.cookies.authtoken || req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Token expired or missing"
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            return res.status(200).json({
                message: "Authorized: Token valid",
            });
        } else {
            console.log("User unauthorized - Invalid token");
            return res.status(403).json({
                message: "Unauthorized: Token invalid",
            });
        }
    } catch (error) {
        console.error("Error during token verification:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

module.exports = userAuthenticated;
