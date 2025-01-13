const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
    id: Number,
    x: Number,
    y: Number,
    text: String,
    textColor: String,
    textSize: String,
    fontFamily: String,
    textBrightness: Number,
    textAlign: String,
    modify: Boolean,
}, { _id: false });

const shapeSchema = new mongoose.Schema({
    id: Number,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    shapeColor: String,
    shapeType: String,
    patternType: String,
    borderType: String,
    opacity: Number,
    modify: Boolean
}, { _id: false });

const noteSchema = new mongoose.Schema({
    id: Number,
    x: Number,
    y: Number,
    text: String,
    noteTextSize: String,
    noteFontFamily: String,
    noteBackgroundColor: String,
    noteTextBrightness: Number,
    noteTextAlign: String,
    modify: Boolean,
}, { _id: false });

const imageSchema = new mongoose.Schema({
    id: Number,
    x: Number,
    y: Number,
    src: String,
    width: Number,
    height: Number,
    brightness: Number,
    contrast: Number,
    saturation: Number,
    modify: Boolean
}, { _id: false });

const whiteboardSchema = new mongoose.Schema({
    meetingCode: {
        type: String,
        required: true
    },
    texts: [{
        type: textSchema,
    }],
    shapes: [{
        type: shapeSchema
    }],
    notes: [{
        type: noteSchema
    }],
    images: [{
        type: imageSchema
    }]
}, { _id: false });

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    whiteboards: {
        type: [whiteboardSchema],
        default: [],
        required: false
    }
});

const users = mongoose.model("users", UserSchema);

module.exports = { users, UserSchema };
