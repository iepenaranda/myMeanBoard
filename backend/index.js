const express = require("express");
require("dotenv").config();
const {dbConnection} = require("./db/db");
const cors = require("cors");

const User = require("./routes/user");
const Auth = require("./routes/auth");
const Board = require("./routes/board");
const Role = require("./routes/roles");

// Ejecución del servidor
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/board/", Board);
app.use("/api/role", Role);

// Conexión entre el puerto y el host
app.listen(process.env.PORT, () => console.log("Server running on port: " + process.env.PORT));

// Conexión con MongoDB
dbConnection();