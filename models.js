const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // Image: {
    //     type: String,
    //     required: true
    // }
})

const users = mongoose.model("users", UserSchema);

module.exports = {users, UserSchema};