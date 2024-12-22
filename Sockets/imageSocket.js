function handleImageFeatures(socket) {
    socket.on("imageDraw", (data) => {
        const { meetingCode, id, x, y, src, width, height, brightness, contrast, saturation, modify } = data;
        socket.broadcast.to(meetingCode).emit("imageDrawed", { id, x, y, src, width, height, brightness, contrast, saturation, modify })
    })

    socket.on("imageSelect", (data) => {
        const { meetingCode, id } = data;
        socket.broadcast.to(meetingCode).emit("imageSelected", id);
    })

    socket.on("imageModify", (data) => {
        const { meetingCode, id, imgBrightness, imgContrast, imgSaturation } = data;
        socket.broadcast.to(meetingCode).emit("imageModified", { id, imgBrightness, imgContrast, imgSaturation })
    })

    socket.on("imageUnSelect", (meetingCode) => {
        socket.broadcast.to(meetingCode).emit("imageUnSelected");
    })

    socket.on("imageMove", (data) => {
        const { meetingCode, id, x, y } = data;
        socket.broadcast.to(meetingCode).emit("imageMoved", { id, x, y });
    })

    socket.on("imageHeightResize", (data) => {
        const { meetingCode, id, newHeight} = data;
        socket.broadcast.to(meetingCode).emit("imageHeightResized", {id, newHeight});
    })

    socket.on("imageWidthResize", (data) => {
        const { meetingCode, id, newWidth} = data;
        socket.broadcast.to(meetingCode).emit("imageWidthResized", {id, newWidth});
    })

    socket.on("imageErase", ( data ) => {
        const { meetingCode, id} = data;
        socket.broadcast.to(meetingCode).emit("imageErased", id);
    })
}

module.exports = { handleImageFeatures }; 