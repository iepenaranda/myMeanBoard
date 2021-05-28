const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    userId: String,
    name: String,
    description: String,
    priority: Number,
    status: String,
    imageUrl: String,
    date: {type: Date,
        default: Date.now},
});

// Instancia de Board que será exportado
const Board = mongoose.model("board", boardSchema);
module.exports = Board;