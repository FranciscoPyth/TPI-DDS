const request = require("supertest");
const app = require("../index");

describe("GET /api/generos", function () {
  it("Devolveria todos los generos", async function () {
    const res = await request(app)
      .get("/api/generos")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idGenero: expect.any(Number),
          nombreGenero: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/generos/:id", function () {
  it("Devolvería un único género buscado por id", async function () {
    const res = await request(app)
      .get("/api/generos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idGenero: 1,
        nombreGenero: expect.any(String),
      })
    );
  });
});
