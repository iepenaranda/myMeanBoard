// importamos modulos
const mongoose = require("mongoose");

// se crea el esquema de Baord que se usará para la BD
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

// Creamos el modelo usando el esquema previamente creado y lo asignamos a la colección board
const Board = mongoose.model("board", boardSchema);

// exportamos el modulo: será llamado por el archivo correspondiente en la carpeta routes
module.exports = Board;