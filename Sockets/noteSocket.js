function handleNotesFeatures(socket) {
    socket.on("noteDraw", (data) => {
        const { meetingCode, id, x, y, text, noteTextSize, noteFontFamily, noteBackgroundColor, noteTextBrightness, modify, noteTextAlign } = data;
        socket.broadcast.to(meetingCode).emit("noteDrawed", { id, x, y, text, noteTextSize, noteFontFamily, noteBackgroundColor, noteTextBrightness, modify, noteTextAlign });
    })

    socket.on("setNoteText", (data) => {
        const { meetingCode, id, value } = data;
        socket.broadcast.to(meetingCode).emit("noteTextSetted", { id, value });
    })

    socket.on("noteRemove", (meetingCode) => {
        socket.broadcast.to(meetingCode).emit("noteRemoved");
    })

    socket.on("noteSelect", (data) => {
        const { meetingCode, id } = data;
        socket.broadcast.to(meetingCode).emit("noteSelected", id);
    })

    socket.on("noteModify", (data) => {
        const { meetingCode, id, noteTextSize, noteFontFamily, noteBackgroundColor, noteTextBrightness, noteTextAlign } = data;
        socket.broadcast.to(meetingCode).emit("noteModified", { id, noteTextSize, noteFontFamily, noteBackgroundColor, noteTextBrightness, noteTextAlign });
    })

    socket.on("noteUnSelect", (meetingCode) => {
        socket.broadcast.to(meetingCode).emit("noteUnSelected")
    })

    socket.on("noteErase", (data) => {
        const { meetingCode, id } = data;
        socket.broadcast.to(meetingCode).emit("noteErased", id);
    })

    socket.on("noteMove", (data) => {
        const { meetingCode, id, x, y } = data;
        socket.broadcast.to(meetingCode).emit("noteMoved", { id, x, y })
    })
}

module.exports = { handleNotesFeatures };