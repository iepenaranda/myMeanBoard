const express = require("express");
const mongoose = require("mongoose");

const User = require("./routes/user");
const Auth = require("./routes/login");
const Board = require("./routes/board");

// Ejecución del servidor
const app = express();
app.use(express.json());
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/board/", Board);

// Conexión entre el puerto y el host
const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Servidor ejecutandose en puerto " + port));

// Conexión con MongoDB
mongoose
  .connect("mongodb://localhost:27017/BoardIvan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Conexión con MongoDb establecida."))
  .catch((err) => console.log("Error al conectar con MongoDB: " + err));
