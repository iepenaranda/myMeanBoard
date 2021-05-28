const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

// Registro de tareas nuevas
router.post("/newTask", Auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user)
    return res
      .status(400)
      .send("Usuario no autenticado: Por favor inicie sesión.");

  // Registro de la tarea en BD
  const board = new Board({
    userId: user._id,
    name: req.body.name,
    description: req.body.description,
    priority: req.body.priority,
    status: "to-do",
  });
  const result = await board.save();
  return res.status(200).send({ result });
});

// Listar tareas guardadas
router.get("/listTasks", Auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user)
    return res
      .status(400)
      .send("Usuario no autenticado: Por favor inicie sesión.");

  const board = await Board.find({ userId: user._id });
  return res.status(200).send({ board });
});

// Editar tareas
router.put("/editTask", Auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user)
    return res
      .status(400)
      .send("Usuario no autenticado: Por favor inicie sesión.");

  const board = await Board.findByIdAndUpdate(req.body._id, {
    userId: user._id,
    name: req.body.name,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
  });
  if (!board) return res.status(400).send("La tarea no se pudo editar.");
  return res.status(200).send({ board });
});

// Eliminar tarea
router.delete("/:_id", Auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user)
    return res
      .status(400)
      .send("Usuario no autenticado: Por favor inicie sesión.");

  const board = await Board.findByIdAndDelete(req.params._id);
  if (!board) return res.status(400).send("La tarea no se pudo eliminar.");
  return res.status(200).send("La tarea fue eliminada.");
});

module.exports = router;
