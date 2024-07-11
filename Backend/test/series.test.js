const request = require("supertest");
const app = require("../index");

const serieAlta = {
  titulo: "SERIE " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  descripcion: "Descripcion de la serie",
  fechaEstreno: new Date().toISOString(),
  temporadas: 3,
  idGenero: 5,
  calificacion: 9.5,
  creador: "Creador de la serie",
  trailer_url: "https://www.youtube.com/watch?v=123456",
};
const serieModificacion = {
  idSerie: 5,
  titulo: "Serie " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  descripcion: "Descripcion modificada de la serie",
  fechaEstreno: new Date().toISOString(),
  temporadas: 321,
  idGenero: 1,
  calificacion: 9.9,
  creador: "Creador modificado de la serie",
  trailer_url: "https://www.youtube.com/watch?v=4444",
};

// test route/series GET
describe("GET /api/series", () => {
  it("Deberia devolver todos las series paginadas", async () => {
    const res = await request(app).get("/api/series?Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Series: expect.arrayContaining([
          expect.objectContaining({
            idSerie: expect.any(Number),
            titulo: expect.any(String),
            descripcion: expect.any(String),
            fechaEstreno: expect.any(String),
            temporadas: expect.any(Number),
            idGenero: expect.any(Number),
            calificacion: expect.any(Number),
            creador: expect.any(String),
            trailer_url: expect.any(String),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});
 

// test route/series GET
describe("GET /api/series con filtros", () => {
  it("Deberia devolver las series según filtro ", async () => {
    const res = await request(app).get("/api/series?titulo=ranger&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Series)).toEqual(true);
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].titulo.includes("ranger") ) {
          return false;
        }
      
      return true;
    }
    }
  });
});


// test route/series/:id GET
describe("GET /api/series/:id", () => {
  it("Deberia devolver la serie con el id 1", async () => {
    const res = await request(app).get("/api/series/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idSerie: expect.any(Number),
        titulo: expect.any(String),
        descripcion: expect.any(String),
        fechaEstreno: expect.any(String),
        temporadas: expect.any(Number),
        idGenero: expect.any(Number),
        calificacion: expect.any(Number),
        creador: expect.any(String),
        trailer_url: expect.any(String),
      })
    );
  });
});


// test route/series POST
describe("POST /api/series", () => {
  it("Deberia devolver la serie que acabo de crear", async () => {
    const res = await request(app).post("/api/series").send(serieAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idSerie: expect.any(Number),
        titulo: expect.any(String),
        descripcion: expect.any(String),
        fechaEstreno: expect.any(String),
        temporadas: expect.any(Number),
        idGenero: expect.any(Number),
        calificacion: expect.any(Number),
        creador: expect.any(String),
        trailer_url: expect.any(String),
      })
    );
  });
});


// test route/peliculas/:id PUT
describe("PUT /api/series/:id", () => {
  it("Deberia devolver la serie con el id 1 modificada", async () => {
    const res = await request(app)
      .put("/api/series/1")
      .send(serieModificacion);
    expect(res.statusCode).toEqual(204);
  });
});


// test route/peliculas/:id DELETE
describe("DELETE /api/series/:id", () => {
  it("Debería devolver la serie con el id 1 borrada", async () => {
    const res = await request(app).delete("/api/series/1");
    expect(res.statusCode).toEqual(200);

    // baja lógica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     IdArticulo: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );
  });
});