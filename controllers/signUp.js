const bcrypt = require("bcrypt");
const { users } = require("../models")

async function signUp(req, res) {
    try {
        let { email, name, password } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({
                message: 'Enter Details Correctly'
            });
        }

        let existingUserEmail = await users.findOne({ email })
        const Salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, Salt);
        password = hashedPassword;

        if (!existingUserEmail && hashedPassword) {
            let NewUser = new users({ email, name, password })
            await NewUser.save()
            return res.status(200).json({
                message: 'User Created'
            });
        }
        else {
            return res.status(409).json({
                message: 'Email already in use'
            });
        }
    } catch (error) {
        console.log('User not saved', error);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = signUp 