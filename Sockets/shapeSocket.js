function handleShapeFeatures(socket) {
    socket.on("itemDraw", (data) => {
        const { meetingCode, id, x, y, width, height, shapeColor, shapeType, patternType, borderType, opacity, modify } = data;
        socket.broadcast.to(meetingCode).emit("itemDrawed", { id, x, y, width, height, shapeColor, shapeType, patternType, borderType, opacity, modify });
    })

    socket.on("itemSelect", (data) => {
        const { meetingCode, id } = data;
        socket.broadcast.to(meetingCode).emit("itemSelected", id);
    })

    socket.on("itemUnSelect", (meetingCode) => {
        socket.broadcast.to(meetingCode).emit("itemUnSelected");
    })

    socket.on("itemErase", (data) => {
        const { meetingCode, id } = data;
        socket.broadcast.to(meetingCode).emit("itemErased", id);
    })

    socket.on("itemModify", (data) => {
        const { meetingCode, id, shapeColor, patternType, borderType, opacity } = data;
        socket.broadcast.to(meetingCode).emit("itemModified", { id, shapeColor, patternType, borderType, opacity })
    })

    socket.on("itemMoving", (data) => {
        const { meetingCode, id, x, y } = data;
        socket.broadcast.to(meetingCode).emit("itemMoved", { id, x, y })
    })

    socket.on("itemHeightResize", (data) => {
        const { meetingCode, id, newHeight } = data;
        socket.broadcast.to(meetingCode).emit("itemHeightResized", { id, newHeight });
    })

    socket.on("itemWidthResize", (data) => {
        const { meetingCode, id, newWidth } = data;
        socket.broadcast.to(meetingCode).emit("itemWidthResized", { id, newWidth });
    })
}

module.exports = { handleShapeFeatures };