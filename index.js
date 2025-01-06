const express = require('express');
const ConnectDatabase = require('./database');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const SignUp = require('./routes/SignUp');
const login = require("./routes/login");
const updateUser = require('./routes/update');
const deleteUser = require('./routes/delete');
const getUser = require("./routes/getUser")
const userAuthenticated = require("./routes/userAuthenticated")
const signOut = require("./routes/signOut");
const { Server } = require('socket.io');
const http = require('http');
const { handleShapeFeatures } = require("./Sockets/shapeSocket");
const { handleNotesFeatures } = require('./Sockets/noteSocket');
const { handleTextFeatures } = require('./Sockets/textSocket');
const authenticate = require('./middlewares/authenticate');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH", "OPTIONS"],
    credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

ConnectDatabase()

app.get("/", (req, res) => {
    res.send("Hello Mr. Wayne");
})

app.use("/signUp", SignUp);
app.use("/login", login);
app.use("/signOut", signOut);
app.use('/updateUser', authenticate, updateUser);
app.use("/deleteUser", authenticate, deleteUser);
app.use("/getUser", authenticate, getUser);
app.use("/userAuthenticated", userAuthenticated);

const colors = ["bg-red-200", "bg-blue-200", "bg-yellow-200", "bg-green-200", "bg-orange-200", "bg-pink-200", "bg-violet-200"];

//Socket Connection
const server = http.createServer(app);
const io = new Server(server, {
    cors: corsOptions
});

const UserNameToEmail = new Map();
const RoomToUserName = new Map();

io.on('connection', (socket) => {
    console.log('socket io connected', socket.id);

    socket.on("newMeeting", (username) => {
        let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklomnopqrstuvwxyz";
        let nums = "0123456789";
        let meetingCode = '';

        for (let i = 0; i < 5; i++) {
            let pos = Math.floor(Math.random() * alpha.length)
            meetingCode = meetingCode + alpha[pos];
        }

        for (let i = 0; i < 3; i++) {
            let pos = Math.floor(Math.random() * nums.length);
            meetingCode = meetingCode + nums[pos];
        }
        UserNameToEmail.set(username, meetingCode);
        if (!RoomToUserName.has(meetingCode)) {
            RoomToUserName.set(meetingCode, []);
        }
        RoomToUserName.get(meetingCode).push(username);
        socket.join(meetingCode);
        socket.emit('roomCreated', username, meetingCode);
    })

    socket.on('joinRoom', (username, meetingCode) => {
        socket.join(meetingCode);
        socket.broadcast.to(meetingCode).emit("newUserJoined", username, meetingCode);
        io.to(socket.id).emit("roomJoined", username, meetingCode);
        UserNameToEmail.set(username, meetingCode);
        if (!RoomToUserName.has(meetingCode)) {
            RoomToUserName.set(meetingCode, []);
        }
        RoomToUserName.get(meetingCode).push(username);
    })

    socket.on("message", (username, message, meetingCode) => {
        io.to(meetingCode).emit("messageArrived", username, message);
    })

    socket.on("getMembers", (meetingCode) => {
        io.to(meetingCode).emit("fetchedMembers", RoomToUserName.get(meetingCode))
        console.log("room: ", RoomToUserName.get(meetingCode));
    })

    //Shapes
    handleShapeFeatures(socket);

    //Notes
    handleNotesFeatures(socket);

    //Text
    handleTextFeatures(socket);

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    })
})

server.listen(4000, () => {
    console.log("Server is running");
})