const mongoose = require('mongoose');

async function ConnectDatabase() {
    await mongoose.connect("mongodb+srv://surajkumarjha771:iw8wTeP2JZXsMH2O@cluster0.phzug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
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