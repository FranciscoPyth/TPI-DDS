const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


router.get("/api/documentales", async function (req, res, next) {
    // consulta de documentales con filtros y paginacion
    let where = {};
    if (req.query.titulo != undefined && req.query.titulo !== "") {
        where.titulo = {
            [Op.like]: "%" + req.query.titulo + "%",
        };
    }
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.documentales.findAndCountAll({
        attributes: [
            "idDocumental",
            "titulo",
            "investigador",
            "director",
            "idGenero",
            "fechaEstreno",
        ],
        order: [["titulo", "ASC"]],
        where,
        offset: (Pagina - 1) * TamañoPagina,
        limit: TamañoPagina,
    });

    return res.json({ Documentales: rows, RegistrosTotal: count });
});


router.get("/api/documentales/:id", async function (req, res, next) {
    let documental = await db.documentales.findOne({
        attributes: [
           "idDocumental",
            "titulo",
            "investigador",
            "director",
            "idGenero",
            "fechaEstreno",
        ],
        where: { idDocumental: req.params.id },
    });
    res.json(documental);
});


router.post("/api/documentales/", async (req, res) => {
    try {
        let data = await db.documentales.create({
            titulo: req.body.titulo,
            investigador: req.body.investigador,
            director: req.body.director,
            idGenero: req.body.idGenero,
            fechaEstreno: req.body.fechaEstreno,
        });
        res.status(200).json(data.dataValues); // devolvemos el registro agregado!
    } catch (err) {
        if (err instanceof ValidationError) {
            // si son errores de validación, los devolvemos
            let messages = '';
            err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            // si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw err;
        }
    }
});

router.put("/api/documentales/:id", async (req, res) => {
    try {
        let documental = await db.documentales.findOne({
            attributes: [
                "idDocumental",
                "titulo",
                "investigador",
                "director",
                "idGenero",
                "fechaEstreno",
            ],
            where: { idDocumental: req.params.id },
        });
        if (!documental) {
            res.status(404).json({ message: "Documental no encontrado" });
            return;
        }
        documental.titulo = req.body.titulo;
        documental.investigador = req.body.investigador;
        documental.director = req.body.director;
        documental.idGenero = req.body.idGenero;
        documental.fechaEstreno = req.body.fechaEstreno;
        await documental.save();
        res.sendStatus(204);
    } catch (err) {
        if (err instanceof ValidationError) {
            // si son errores de validación, los devolvemos
            let messages = '';
            err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            // si son errores desconocidos, los dejamos que los controle el middleware de errores
            throw err;
        }
    }
});

router.delete("/api/documentales/:id", async (req, res) => {
    let bajaFisica = true;

    if (bajaFisica) {
        // baja fisica
        let filasBorradas = await db.documentales.destroy({
            where: { idDocumental: req.params.id },
        });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    }
});

module.exports = router;