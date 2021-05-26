// importamos los modulos
// express para crear el servidor
const express = require("express");
// mongoose para manejar la BD
const mongoose = require("mongoose");

// importamos las routes previamente creadas
const User = require("./routes/user");
const Auth = require("./routes/auth");

// variable principal que ejecuta la app
const app = express();
// usos que tiene la app
app.use(express.json());
app.use("/api/user/", User);
app.use("/api/auth/", Auth);

// variable del puerto para trabajaren hosting o en local
const port = process.env.PORT || 3001;

// escuchando el puerto e inicia el servidor
app.listen(port, () => console.log("Servidor ejecutandose en puerto " + port));
// http://localhost:3001/api/user/newUser

// realiza la conexión con MongoDB usando una promesa y establece algunos parametros de seguridad
mongoose
  .connect("mongodb://localhost:27017/BoardIvan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Conexión con MongoDb establecida."))
  .catch((err) => console.log("Error al conectar con MongoDB: " + err));
