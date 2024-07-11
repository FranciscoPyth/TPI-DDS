const express = require("express");
const cors = require("cors");
const generosRouter = require("./routes/generos");
const peliculasRouter = require("./routes/peliculas");
const seriesRouter = require("./routes/series");
const cortosRouter = require("./routes/cortos");
const documentalesRouter = require("./routes/documentales");
const crearBase = require("./base-orm/sqlite-init-orm.js");
const seguridadRouter = require("./routes/seguridad");

// Configuración de la aplicación Express
const app = express();
app.use(express.json());
app.use(cors());
app.use(seguridadRouter);
app.use(generosRouter)
app.use(peliculasRouter)
app.use(seriesRouter)
app.use(cortosRouter)
app.use(documentalesRouter)



if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000;   // en producción se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, async () => {
    await crearBase();
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}
module.exports = app; // para testing

