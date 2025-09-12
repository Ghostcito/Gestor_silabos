const request = require("supertest");
const app = require("./app"); // Asegúrate de que app.js tenga las rutas básicas

describe("API with Headers and Query Params", () => {
  test("should accept custom headers in existing route", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("X-Custom-Header", "custom-value")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  test("should handle query parameters in users route", async () => {
    const response = await request(app)
      .get("/api/users")
      .query({ active: "true", limit: "1" });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test alternativo sin file upload si no tienes multer configurado
  test("should handle POST requests with JSON data", async () => {
    const response = await request(app)
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send({ name: "Test", email: "test@example.com" });

    expect(response.status).toBe(201);
  });
});
