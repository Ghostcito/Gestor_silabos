const request = require("supertest");
const app = require("./app");

describe("API Users", () => {
  // Test GET /api/users
  describe("GET /api/users", () => {
    test("should return all users", async () => {
      const response = await request(app).get("/api/users");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("email");
    });
  });

  // Test GET /api/users/:id
  describe("GET /api/users/:id", () => {
    test("should return a specific user", async () => {
      const response = await request(app).get("/api/users/1");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", 1);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("email");
    });

    test("should return 404 for non-existent user", async () => {
      const response = await request(app).get("/api/users/999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });
  });

  // Test POST /api/users
  describe("POST /api/users", () => {
    test("should create a new user", async () => {
      const newUser = {
        name: "Carlos",
        email: "carlos@email.com",
      };

      const response = await request(app).post("/api/users").send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name", "Carlos");
      expect(response.body).toHaveProperty("email", "carlos@email.com");
    });

    test("should return 400 for missing fields", async () => {
      const invalidUser = { name: "Ana" }; // Falta email

      const response = await request(app).post("/api/users").send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  // Test PUT /api/users/:id
  describe("PUT /api/users/:id", () => {
    test("should update an existing user", async () => {
      const updatedData = {
        name: "Juan Updated",
        email: "juan.updated@email.com",
      };

      const response = await request(app).put("/api/users/1").send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "Juan Updated");
      expect(response.body).toHaveProperty("email", "juan.updated@email.com");
    });

    test("should return 404 for non-existent user", async () => {
      const response = await request(app)
        .put("/api/users/999")
        .send({ name: "No existe" });

      expect(response.status).toBe(404);
    });
  });

  // Test DELETE /api/users/:id
  describe("DELETE /api/users/:id", () => {
    test("should delete an existing user", async () => {
      const response = await request(app).delete("/api/users/1");

      expect(response.status).toBe(204);
    });

    test("should return 404 for non-existent user", async () => {
      const response = await request(app).delete("/api/users/999");

      expect(response.status).toBe(404);
    });
  });
});
