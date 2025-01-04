const jwt = require('jsonwebtoken');

async function userAuthenticated(req, res) {
    try {
        const token = req.cookies.authtoken || req.headers["authorization"].split(" ")[1];
        if (!token) {
            console.log("token expired");
            return res.status(401).json({
                message: "token expired"
            })
        }

        const verified = jwt.verify(token, "Realtime-Whiteboard");
        if (verified) {
            console.log("user authorized");
            return res.status(200).json({
                message: "authorized: Token valid"
            })
        }
        else {
            console.log("user unauthorized");
            return res.status(403).json({
                message: "Unauthorized: Token invalid",
            });
        }
    } catch (error) {
        console.log("error: ", error.message);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

module.exports = userAuthenticated;