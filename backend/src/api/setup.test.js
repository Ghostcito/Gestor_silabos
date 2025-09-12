const request = require("supertest");
const app = require("./app");

describe("API with Setup", () => {
  let testUserId;

  // Setup antes de todos los tests
  beforeAll(async () => {
    // Crear un usuario de prueba
    const response = await request(app).post("/api/users").send({
      name: "Test User",
      email: "test@email.com",
    });

    testUserId = response.body.id;
  });

  // Cleanup después de todos los tests
  afterAll(async () => {
    if (testUserId) {
      await request(app).delete(`/api/users/${testUserId}`);
    }
  });

  test("should use test user from setup", async () => {
    const response = await request(app).get(`/api/users/${testUserId}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test User");
  });
});
