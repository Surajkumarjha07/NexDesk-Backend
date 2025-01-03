const bcrypt = require("bcrypt");
const { users } = require("../models")

async function signUp(req, res) {
    try {
        let { email, name, password } = req.body;
        let existingUserEmail = await users.findOne({ email })
        const Salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, Salt);
        password = hashedPassword;
        let NewUser = new users({ email, name, password })
        if (email !== '' && password !== '' && name !== '') {
            if (!existingUserEmail) {
                await NewUser.save()
                res.status(200).json({
                    message: 'User Created'
                })
            }
            else if (existingUserEmail) {
                res.status(409).json({
                    message: 'Email already in use'
                })
            }
        }
        else {
            res.status(400).json({
                message: 'Enter Details Correctly'
            })
        }
    } catch (error) {
        console.log('User not saved', error);
    }
}

module.exports = signUp 