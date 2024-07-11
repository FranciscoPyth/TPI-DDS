const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/generos", async function (req, res, next) {
  let data = await db.generos.findAll({
    attributes: ["idGenero", "nombreGenero"],
  });
  res.json(data);
});

router.get("/api/generos/:id", async function (req, res, next) {
    try {
        let genero = await db.generos.findOne({
          where: { idGenero: req.params.id },
          attributes: ["idGenero", "nombreGenero"],
        });
        if (genero) res.json(genero);
        else res.status(404).json({ message: 'genero no encontrado' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
