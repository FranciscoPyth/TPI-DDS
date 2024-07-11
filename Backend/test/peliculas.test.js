const request = require("supertest");
const app = require("../index");

const peliculaAlta = {
  titulo: "Pelicula " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  fechaEstreno: new Date().toISOString(),
  duracion: 123,
  idGenero: 1,
  cantidadPremios: 11,
};
const peliculaModificacion = {
  idPelicula: 5,
  titulo: "Pelicula " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  fechaEstreno: new Date().toISOString(),
  duracion: 321,
  idGenero: 5,
  cantidadPremios: 30,
};

// test route/peliculas GET
describe("GET /api/peliculas", () => {
  it("Deberia devolver todos las peliculas paginadas", async () => {
    const res = await request(app).get("/api/peliculas?Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Pelis: expect.arrayContaining([
          expect.objectContaining({
            idPelicula: expect.any(Number),
            titulo: expect.any(String),
            fechaEstreno: expect.any(String),
            duracion: expect.any(Number),
            idGenero: expect.any(Number),
            cantidadPremios: expect.any(Number),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});
 

// test route/peliculas GET
describe("GET /api/peliculas con filtros", () => {
  it("Deberia devolver las peliculas según filtro ", async () => {
    const res = await request(app).get("/api/peliculas?titulo=arry&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Pelis)).toEqual(true);
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].titulo.includes("arry") ) {
          return false;
        }
      
      return true;
    }
    }
  });
});


// test route/peliculas/:id GET
describe("GET /api/peliculas/:id", () => {
  it("Deberia devolver la pelicula con el id 1", async () => {
    const res = await request(app).get("/api/peliculas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idPelicula: expect.any(Number),
        titulo: expect.any(String),
        fechaEstreno: expect.any(String),
        duracion: expect.any(Number),
        idGenero: expect.any(Number),
        cantidadPremios: expect.any(Number),
      })
    );
  });
});


// test route/peliculas POST
describe("POST /api/peliculas", () => {
  it("Deberia devolver la pelicula que acabo de crear", async () => {
    const res = await request(app).post("/api/peliculas").send(peliculaAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idPelicula: expect.any(Number),
        titulo: expect.any(String),
        fechaEstreno: expect.any(String),
        duracion: expect.any(Number),
        idGenero: expect.any(Number),
        cantidadPremios: expect.any(Number),
      })
    );
  });
});


// test route/peliculas/:id PUT
describe("PUT /api/peliculas/:id", () => {
  it("Deberia devolver la pelicula con el id 1 modificada", async () => {
    const res = await request(app)
      .put("/api/peliculas/1")
      .send(peliculaModificacion);
    expect(res.statusCode).toEqual(204);
  });
});


// test route/peliculas/:id DELETE
describe("DELETE /api/peliculas/:id", () => {
  it("Debería devolver la pelicula con el id 1 borrada", async () => {
    const res = await request(app).delete("/api/peliculas/1");
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

