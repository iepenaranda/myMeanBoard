const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");
const Registered = require("../middleware/userExist");
const File = require("../middleware/file");

// Registro de tareas nuevas
router.post("/newTask", Auth, Registered, async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Error: Data incomplete.");

  // Registro de la tarea en BD
  const board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    status: "to-do",
  });
  const result = await board.save();

  if (!result)
    return res.status(401).send("Error: Could not register the task.");
  return res.status(200).send({ result });
});

router.post(
  "/newTaskImg",
  Auth,
  Registered,
  File.single("image"),
  async (req, res) => {
    if (!req.body.name || !req.body.description)
      return res.status(400).send("Error: Data incomplete.");

    const url = req.protocol + "://" + req.get("host");
    let imageUrl = "";
    if (req.file === undefined)
      return res.status(401).send("Error: only png, jpg, gif or jpeg files.");
    imageUrl = url + "/uploads/" + req.file.filename;
    const board = new Board({
      userId: req.user._id,
      name: req.body.name,
      description: req.body.description,
      status: "to-do",
      imageUrl: imageUrl,
    });
    const result = await board.save();

    if (!result)
      return res.status(401).send("Error: Could not register the task.");
    return res.status(200).send({ result });
  }
);

// Listar tareas guardadas
router.get("/listTasks", Auth, Registered, async (req, res) => {
  const board = await Board.find({ userId: req.user._id });
  if (!board) return res.status(401).send("Error: Could not get task list.");
  return res.status(200).send({ board });
});

// Editar tareas
router.put("/editTask", Auth, Registered, async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.status ||
    !req.body._id
  )
    return res.status(400).send("Error: Incomplete data.");

  const board = await Board.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
  });
  if (!board) return res.status(400).send("La tarea no se pudo editar.");
  return res.status(200).send({ board });
});

// Eliminar tarea
router.delete("/:_id", Auth, Registered, async (req, res) => {
  try {
    board = await Board.findByIdAndDelete(req.params._id);
  } catch (error) {
    return res.status(400).send("Error: Invalid id");
  }
  if (!board) return res.status(401).send("Error: Could not delete task.");
  return res.status(200).send("Task deleted.");
});

module.exports = router;
