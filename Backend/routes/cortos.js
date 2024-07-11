const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


router.get("/api/cortos", async function (req, res, next) {
    // consulta de artículos con filtros y paginacion
    let where = {};
    if (req.query.titulo != undefined && req.query.titulo !== "") {
      where.titulo = {
        [Op.like]: "%" + req.query.titulo + "%",
      };
    }
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.cortos.findAndCountAll({
      attributes: [
        "idCorto",
        "titulo",
        "fechaEstreno",
        "sinopsis",
        "guionista",
        "presupuesto",
        "idGenero",
        "cantidadNominaciones"
      ],
      order: [["titulo", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });
  
    return res.json({ Cortos: rows, RegistrosTotal: count });
  });


router.get("/api/cortos/:id", async function (req, res, next) {
    let corto = await db.cortos.findOne({
        attributes: [
            "idCorto",
            "titulo",
            "fechaEstreno",
            "sinopsis",
            "guionista",
            "presupuesto",
            "idGenero",
            "cantidadNominaciones"
          ],
        where: { idCorto: req.params.id },
    });
    res.json(corto);
});


router.post("/api/cortos/", async (req, res) => {
    try {
      let data = await db.cortos.create({
        titulo: req.body.titulo,
        fechaEstreno: req.body.fechaEstreno,
        sinopsis: req.body.sinopsis,
        guionista: req.body.guionista,
        presupuesto: req.body.presupuesto,
        idGenero: req.body.idGenero,
        cantidadNominaciones: req.body.cantidadNominaciones
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


  router.put("/api/cortos/:id", async (req, res) => {
    try {
        let corto = await db.cortos.findOne({
            attributes: [
                "idCorto",
                "titulo",
                "fechaEstreno",
                "sinopsis",
                "guionista",
                "presupuesto",
                "idGenero",
                "cantidadNominaciones"
              ],
            where: { idCorto: req.params.id },
        });
        if (!corto) {
            res.status(404).json({ message: "Serie no encontrada" });
            return;
        }

        corto.titulo = req.body.titulo;
        corto.fechaEstreno = req.body.fechaEstreno;
        corto.sinopsis = req.body.sinopsis;
        corto.guionista = req.body.guionista;
        corto.presupuesto = req.body.presupuesto;
        corto.idGenero = req.body.idGenero;
        corto.cantidadNominaciones = req.body.cantidadNominaciones;

        await corto.save();
        res.sendStatus(204);
    } catch (err) {
        if (err instanceof ValidationError) {
            // Si son errores de validación, los devolvemos
            let messages = '';
            err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            // Si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw err;
        }
    }
});


router.delete("/api/cortos/:id", async (req, res) => {
    let bajaFisica = true;
  
    if (bajaFisica) {
      // baja fisica
      let filasBorradas = await db.cortos.destroy({
        where: { idCorto: req.params.id },
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