const mongoose = require('mongoose');
require("dotenv").config();

async function ConnectDatabase() {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'Realtime-Whiteboard'
    })
    .then(() => {
        console.log("Database Connected")
    })
    .catch(() => {
        console.log("Error in connecting database")
    })
}

module.exports = ConnectDatabase;