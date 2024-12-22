function handleTextFeatures(socket) {
    socket.on("inputDraw", (data) => {
        const { meetingCode, id, x, y, text, textColor, textSize, fontFamily, textBrightness, modify, textAlign } = data;
        socket.broadcast.to(meetingCode).emit("inputDrawed", { id, x, y, text, textColor, textSize, fontFamily, textBrightness, modify, textAlign })
    })

    socket.on("setInputText", (data) => {
        const { meetingCode, id, value } = data;
        socket.broadcast.to(meetingCode).emit("inputTextSetted", { id, value });
    })

    socket.on("removeFocus", (meetingCode) => {
        socket.broadcast.to(meetingCode).emit("focusRemoved");
    })

    socket.on("inputSelect", (data) => {
        const { meetingCode, id } = data;
        socket.broadcast.to(meetingCode).emit("inputSelected", id);
    })

    socket.on("inputModify", (data) => {
        const { meetingCode, id, textColor, textSize, fontFamily, textBrightness, textAlign } = data;
        socket.broadcast.to(meetingCode).emit("inputModified", { id, textColor, textSize, fontFamily, textBrightness, textAlign });
    })

    socket.on("inputUnSelect", (meetingCode) => {
        socket.broadcast.to(meetingCode).emit("inputUnSelected");
    })

    socket.on("inputErase", (data) => {
        const { meetingCode, id } = data;
        console.log("data: ", data);
        socket.broadcast.to(meetingCode).emit("inputErased", id);
    })

    socket.on("inputMove", (data) => {
        const { meetingCode, id, x, y } = data;
        socket.broadcast.to(meetingCode).emit("inputMoved", { id, x, y });
    })
}

module.exports = { handleTextFeatures }