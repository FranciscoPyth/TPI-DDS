const request = require("supertest");
const app = require("../index");

const cortoAlta = {
  titulo: "CORTO " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  fechaEstreno: new Date().toISOString(),
  sinopsis: "Sinopsis del corto",
  guionista: "Guionista del corto",
  presupuesto: 1000.00,
  idGenero: 5,
  cantidadNominaciones: 10,
};
const cortoModificacion = {
  idCorto: 5,
  titulo: "CORTO " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  fechaEstreno: new Date().toISOString(),
  sinopsis: "Sinopsis del corto modificado",
  guionista: "Guionista del corto modificado",
  presupuesto: 1000.00,
  idGenero: 5,
  cantidadNominaciones: 10,
};

// test route/cortos GET
describe("GET /api/cortos", () => {
  it("Deberia devolver todos los cortos paginados", async () => {
    const res = await request(app).get("/api/cortos?Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Cortos: expect.arrayContaining([
          expect.objectContaining({
            idCorto: expect.any(Number),
            titulo: expect.any(String),
            fechaEstreno: expect.any(String),
            sinopsis: expect.any(String),
            guionista: expect.any(String),
            presupuesto: expect.any(Number),
            idGenero: expect.any(Number),
            cantidadNominaciones: expect.any(Number),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});
 

// test route/cortos GET
describe("GET /api/cortos con filtros", () => {
  it("Deberia devolver los cortos según filtro ", async () => {
    const res = await request(app).get("/api/cortos?titulo=irds&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Cortos)).toEqual(true);
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].titulo.includes("irds") ) {
          return false;
        }
      
      return true;
    }
    }
  });
});


// test route/cortos/:id GET
describe("GET /api/cortos/:id", () => {
  it("Deberia devolver el corto con el id 1", async () => {
    const res = await request(app).get("/api/cortos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idCorto: expect.any(Number),
        titulo: expect.any(String),
        fechaEstreno: expect.any(String),
        sinopsis: expect.any(String),
        guionista: expect.any(String),
        presupuesto: expect.any(Number),
        idGenero: expect.any(Number),
        cantidadNominaciones: expect.any(Number),
      })
    );
  });
});


// test route/cortos POST
describe("POST /api/cortos", () => {
  it("Deberia devolver el corto que acabo de crear", async () => {
    const res = await request(app).post("/api/cortos").send(cortoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idCorto: expect.any(Number),
        titulo: expect.any(String),
        fechaEstreno: expect.any(String),
        sinopsis: expect.any(String),
        guionista: expect.any(String),
        presupuesto: expect.any(Number),
        idGenero: expect.any(Number),
        cantidadNominaciones: expect.any(Number),
      })
    );
  });
});


// test route/cortos/:id PUT
describe("PUT /api/cortos/:id", () => {
  it("Deberia devolver el corto con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/cortos/1")
      .send(cortoModificacion);
    expect(res.statusCode).toEqual(204);
  });
});


// test route/cortos/:id DELETE
describe("DELETE /api/cortos/:id", () => {
  it("Debería devolver el corto con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/cortos/1");
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