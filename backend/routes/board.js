// El routes/board.js operara las actividades guardadas en el board
const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

// Registro de actividades nuevas
// Auth verificará la existencia de un JWT, 
// Si un JWT existe y es válido es porque el usuario tiene un sesión iniciadae
router.post("/newTask", Auth, async (req, res) => {
    // se verifica el usuario que esta realizando la solicitud
    const user = await User.findById(req.user._id);

    // 1. Si el usuario no se encuentra en BD
    if(!user) return res.status(400).send("Usuario no autenticado: Por favor inicie sesión.");
    // 2. si el usuario existe, se registrará la tarea
    const board = new Board({
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
        priority: req.body.priority,
        // status = "to-do" porque en esta función siempre se registrará una tarea nueva
        status: "to-do",
    });
    // Se guarda la tarea en la BD
    const result = await board.save();
    return res.status(200).send({result});
});

module.exports = router;
