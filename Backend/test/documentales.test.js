const request = require("supertest");
const app = require("../index");

const documentalAlta = {
    titulo: "Documental " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
    investigador: "Investigador " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
    director: "Director " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
    idGenero: 1,
    fechaEstreno: new Date().toISOString(),
};
const documentalModificacion = {
    idDocumental: 5,
    titulo: "Documental " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
   investigador: "Investigador " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
    director: "Director " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
    idGenero: 13,
    fechaEstreno: new Date().toISOString(),
};

// test route/documentales GET
describe("GET /api/documentales", () => {
    it("Deberia devolver todos los documentales paginados", async () => {
        const res = await request(app).get("/api/documentales?Pagina=1");
        expect(res.statusCode).toEqual(200);

        expect(res.body).toEqual(
            expect.objectContaining({
                Documentales: expect.arrayContaining([
                    expect.objectContaining({
                        idDocumental: expect.any(Number),
                        titulo: expect.any(String),
                        investigador: expect.any(String),
                        director: expect.any(String),
                        idGenero: expect.any(Number),
                        fechaEstreno: expect.any(String),
                    }),
                ]),
                RegistrosTotal: expect.any(Number),
            })
        );
    });
});


// test route/documentales GET
describe("GET /api/documentales con filtros", () => {
    it("Deberia devolver los documentales según filtro ", async () => {
        const res = await request(app).get("/api/documentales?titulo=ck&Pagina=1");
        expect(res.statusCode).toEqual(200);


        console.log(res.body.Documentales);
        console.log(verificarPropiedades(res.body.Documentales));
        expect(verificarPropiedades(res.body.Documentales)).toEqual(true);

        function verificarPropiedades(array) {
            for (let i = 0; i < array.length; i++) {
                if (!array[i].titulo.includes("ck")) {
                    return false;
                }

                return true;
            }
        }
    });
});


// test route/documentales/:id GET
describe("GET /api/documentales/:id", () => {
    it("Deberia devolver el documental con el id 1", async () => {
        const res = await request(app).get("/api/documentales/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                idDocumental: expect.any(Number),
                titulo: expect.any(String),
                investigador: expect.any(String),
                director: expect.any(String),
                idGenero: expect.any(Number),
                fechaEstreno: expect.any(String),
            })
        );
    });
});


// test route/documentales POST
describe("POST /api/documentales", () => {
    it("Deberia devolver el documental que acabo de crear", async () => {
        const res = await request(app).post("/api/documentales").send(documentalAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                idDocumental: expect.any(Number),
                titulo: expect.any(String),
                investigador: expect.any(String),
                director: expect.any(String),
                idGenero: expect.any(Number),
                fechaEstreno: expect.any(String),
            })
        );
    });
});


// test route/documentales/:id PUT
describe("PUT /api/documentales/:id", () => {
    it("Deberia devolver el documental con el id 1 modificado", async () => {
        const res = await request(app)
            .put("/api/documentales/1")
            .send(documentalModificacion);
        expect(res.statusCode).toEqual(204);
    });
});


// test route/documentales/:id DELETE
describe("DELETE /api/documentales/:id", () => {
    it("Debería devolver el documental con el id 1 borrado", async () => {
        const res = await request(app).delete("/api/documentales/1");
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

