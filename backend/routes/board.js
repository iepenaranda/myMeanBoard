// El routes/board.js operara las actividades guardadas en el board
const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

// Registro de actividades nuevas
router.post("/newTask", Auth, async (req, res) => {
    // Auth verificará la existencia de un JWT, 
    // Si un JWT existe y es válido es porque el usuario tiene un sesión iniciada
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

// listar las tareas del usuario
router.get("/listTasks", Auth, async (req, res) => {
    // se verifica que el usuario que esta realizando la solicitud
    const user = await User.findById(req.user._id);

    // 1. si el usuario no se encuentra en la BD
    if (!user) return res.status(400).send("Usuario no autenticado: Por favor inicie sesión.");

    // 2. Si el usuario existe, se regresaran las tareas registradas por ese usuario
    const board = await Board.find({userId: user._id});
    return res.status(200).send({board});
})

// edita las tareas del usuario
router.put("/editTask", Auth, async (req, res) => {
    // se verifica el usuario que esta realizando la solicitud
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no autenticado: Por favor inicie sesión.");

    // Si el usuario existe, se envía los datos al tarea
    const board = await Board.findByIdAndUpdate(req.body._id, {
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
    });

    if(!board) return res.status(400).send("La tarea no se pudo editar.");
    return res.status(200).send({board});
});

// eliminar tarea seleccionada
router.delete("/:_id", Auth, async (req, res) => {
    // se verifica el usuario que esta realizando la solicitud
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no autenticado: Por favor inicie sesión.");

    // Si el usuario existe, se elimina la tarea
    const board = await Board.findByIdAndDelete(req.params._id);
    if (!board) return res.status(400).send("No se pudo eliminar la tarea.")
    return res.status(200).send("La tarea due eliminada.")
})

module.exports = router;
