const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");


router.get("/api/series", async function (req, res, next) {
    // consulta de artículos con filtros y paginacion
    let where = {};
    if (req.query.titulo != undefined && req.query.titulo !== "") {
      where.titulo = {
        [Op.like]: "%" + req.query.titulo + "%",
      };
    }
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.series.findAndCountAll({
      attributes: [
        "idSerie",
        "titulo",
        "descripcion",
        "fechaEstreno",
        "temporadas",
        "idGenero",
        "calificacion",
        "creador",
        "trailer_url",
      ],
      order: [["titulo", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });
  
    return res.json({ Series: rows, RegistrosTotal: count });
  });


router.get("/api/series/:id", async function (req, res, next) {
    let serie = await db.series.findOne({
        attributes: [
            "idSerie",
            "titulo",
            "descripcion",
            "fechaEstreno",
            "temporadas",
            "idGenero",
            "calificacion",
            "creador",
            "trailer_url"
        ],
        where: { idSerie: req.params.id },
    });
    res.json(serie);
});


router.post("/api/series/", async (req, res) => {
    try {
      let data = await db.series.create({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fechaEstreno: req.body.fechaEstreno,
        temporadas: req.body.temporadas,
        idGenero: req.body.idGenero,
        calificacion: req.body.calificacion,
        creador: req.body.creador,
        trailer_url: req.body.trailer_url
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


  router.put("/api/series/:id", async (req, res) => {
    try {
        let serie = await db.series.findOne({
            attributes: [
                "idSerie",
                "titulo",
                "descripcion",
                "fechaEstreno",
                "temporadas",
                "idGenero",
                "calificacion",
                "creador",
                "trailer_url"
            ],
            where: { idSerie: req.params.id },
        });
        if (!serie) {
            res.status(404).json({ message: "Serie no encontrada" });
            return;
        }

        serie.titulo = req.body.titulo;
        serie.descripcion = req.body.descripcion;
        serie.fechaEstreno = req.body.fechaEstreno;
        serie.temporadas = req.body.temporadas;
        serie.idGenero = req.body.idGenero;
        serie.calificacion = req.body.calificacion;
        serie.creador = req.body.creador;
        serie.trailer_url = req.body.trailer_url;

        await serie.save();
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


router.delete("/api/series/:id", async (req, res) => {
    let bajaFisica = true; // Se debería decidir en base a algún criterio si es baja física o lógica

    if (bajaFisica) {
        // Baja física
        try {
            let filasBorradas = await db.series.destroy({
                where: { idSerie: req.params.id }
            });
            if (filasBorradas === 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404); // Recurso no encontrado si no se borró ninguna fila
            }
        } catch (err) {
            res.status(500).json({ error: "Error interno del servidor" });
        }
    } else {
        // Baja lógica
        try {
            let data = await db.sequelize.query(
                "UPDATE series SET estado = CASE WHEN estado = 'Active' THEN 'Ended' ELSE 'Active' END WHERE idSerie = :idSerie",
                {
                    replacements: { idSerie: +req.params.id }
                }
            );
            res.sendStatus(200);
        } catch (err) {
            if (err instanceof ValidationError) {
                // Errores de validación de Sequelize
                const messages = err.errors.map((x) => x.message);
                res.status(400).json(messages);
            } else {
                // Otros errores
                res.status(500).json({ error: "Error interno del servidor" });
            }
        }
    }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
    "/api/seriesJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
      /* #swagger.security = [{
                 "bearerAuth1": []
          }] */
  
      // #swagger.tags = ['Articulos']
      // #swagger.summary = 'obtiene todos los Artículos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
      const { rol } = res.locals.user;
      if (rol !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }
  
      let items = await db.series.findAll({
        attributes: [
            "idSerie",
            "titulo",
            "descripcion",
            "fechaEstreno",
            "temporadas",
            "idGenero",
            "calificacion",
            "creador",
            "trailer_url"
        ],
        order: [["titulo", "ASC"]],
      });
      res.json(items);
    }
  );
  

module.exports = router;