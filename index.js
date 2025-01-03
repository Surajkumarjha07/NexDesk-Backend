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

corsOptions = {
    methods: "*",
    origin: "http://localhost:3000",
    allowCredentials: true,
    allowOrigin: true,
    credentials: true
}
app.use(cors(corsOptions))

ConnectDatabase()

app.get("/", (req, res) => {
    res.send("Hello Mr. Wayne");
})

app.use("/signUp", SignUp);
app.use("/login", login);
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

const EmailToRoom = new Map();
const RoomToEmail = new Map();

io.on('connection', (socket) => {
    console.log('socket io connected', socket.id);

    socket.on("newMeeting", (email) => {
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
        EmailToRoom.set(email, meetingCode);
        if (!RoomToEmail.has(meetingCode)) {
            RoomToEmail.set(meetingCode, []);
        }
        RoomToEmail.get(meetingCode).push(email);
        socket.join(meetingCode);
        socket.emit('roomCreated', email, meetingCode);
    })

    socket.on('joinRoom', (email, meetingCode) => {
        socket.join(meetingCode);
        socket.broadcast.to(meetingCode).emit("newUserJoined", email, meetingCode);
        io.to(socket.id).emit("roomJoined", email, meetingCode);
        EmailToRoom.set(email, meetingCode);
        if (!RoomToEmail.has(meetingCode)) {
            RoomToEmail.set(meetingCode, []);
        }
        RoomToEmail.get(meetingCode).push(email);
    })

    socket.on("message", (email, message, meetingCode) => {
        io.to(meetingCode).emit("messageArrived", email, message);
    })

    socket.on("getMembers", (meetingCode) => {
        io.to(meetingCode).emit("fetchedMembers", RoomToEmail.get(meetingCode))
        console.log("room: ", RoomToEmail.get(meetingCode));
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