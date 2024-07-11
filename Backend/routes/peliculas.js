const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


router.get("/api/peliculas", async function (req, res, next) {
  // consulta de artículos con filtros y paginacion
  let where = {};
  if (req.query.titulo != undefined && req.query.titulo !== "") {
    where.titulo = {
      [Op.like]: "%" + req.query.titulo + "%",
    };
  }
  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.peliculas.findAndCountAll({
    attributes: [
      "idPelicula",
      "titulo",
      "fechaEstreno",
      "duracion",
      "idGenero",
      "cantidadPremios",
    ],
    order: [["titulo", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Pelis: rows, RegistrosTotal: count });
});


router.get("/api/peliculas/:id", async function (req, res, next) {
  let pelicula = await db.peliculas.findOne({
    attributes: [
      "idPelicula",
      "titulo",
      "fechaEstreno",
      "duracion",
      "idGenero",
      "cantidadPremios",
    ],
    where: { idPelicula: req.params.id },
  });
  res.json(pelicula);
});


router.post("/api/peliculas/", async (req, res) => {
  try {
    let data = await db.peliculas.create({
      titulo: req.body.titulo,
      fechaEstreno: req.body.fechaEstreno,
      duracion: req.body.duracion,
      idGenero: req.body.idGenero,
      cantidadPremios: req.body.cantidadPremios,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("/api/peliculas/:id", async (req, res) => {
  try {
    let pelicula = await db.peliculas.findOne({
      attributes: [
        "idPelicula",
        "titulo",
        "fechaEstreno",
        "duracion",
        "idGenero",
        "cantidadPremios",
      ],
      where: { idPelicula: req.params.id },
    });
    if (!pelicula) {
      res.status(404).json({ message: "Película no encontrada" });
      return;
    }
    pelicula.titulo = req.body.titulo;
    pelicula.fechaEstreno = req.body.fechaEstreno;
    pelicula.duracion = req.body.duracion;
    pelicula.idGenero = req.body.idGenero;
    pelicula.cantidadPremios = req.body.cantidadPremios;
    await pelicula.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete("/api/peliculas/:id", async (req, res) => {
  let bajaFisica = true;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.peliculas.destroy({
      where: { idPelicula: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } /*else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        "UPDATE peliculas SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdArticulo = :IdArticulo",
        {
          replacements: { IdArticulo: +req.params.id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }*/
});

module.exports = router;