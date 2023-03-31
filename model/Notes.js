const mongoose = require("mongoose");

const NotesSchema = new Schema({
    title: {
        type: String,
        reuired: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        default: "Genral"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

model.exports = mongoose.model('notes', NotesSchema);