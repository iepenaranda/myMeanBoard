const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.ObjectId, ref: "users"},
  name: String,
  description: String,
  status: String,
  imageUrl: String,
  date: { type: Date, default: Date.now },
});

// Instancia de Board que será exportado
const Board = mongoose.model("board", boardSchema);
module.exports = Board;