const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");
const Registered = require("../middleware/userExist");

// Registro de tareas nuevas
router.post("/newTask", Auth, Registered, async (req, res) => {
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
router.get("/listTasks", Auth, Registered, async (req, res) => {
  const board = await Board.find({ userId: user._id });
  return res.status(200).send({ board });
});

// Editar tareas
router.put("/editTask", Auth, Registered, async (req, res) => {
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
router.delete("/:_id", Auth, Registered, async (req, res) => {
  const board = await Board.findByIdAndDelete(req.params._id);
  if (!board) return res.status(400).send("La tarea no se pudo eliminar.");
  return res.status(200).send("La tarea fue eliminada.");
});

module.exports = router;