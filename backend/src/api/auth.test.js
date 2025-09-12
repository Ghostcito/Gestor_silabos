const request = require("supertest");

// Mock de la app express para testing
const express = require("express");
const app = express();

app.use(express.json());

// Simulamos un middleware de auth más estricto
app.use((req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Token requerido" });
  }

  // Validar formato "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Formato de token inválido" });
  }

  const token = parts[1];

  // Solo aceptar tokens específicos para testing
  const validTokens = ["valid-token-123", "test-token-456"];
  if (!validTokens.includes(token)) {
    return res.status(401).json({ error: "Token inválido" });
  }

  // Token válido, continuar
  req.user = { id: 1, role: "admin" };
  next();
});

// Ruta protegida
app.get("/api/protected/users", (req, res) => {
  res.json([{ id: 1, name: "Usuario protegido" }]);
});

describe("Protected Routes", () => {
  test("should access protected route with valid auth token", async () => {
    const response = await request(app)
      .get("/api/protected/users")
      .set("Authorization", "Bearer valid-token-123");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("should reject without auth token", async () => {
    const response = await request(app).get("/api/protected/users");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  test("should reject with invalid token format - missing Bearer", async () => {
    const response = await request(app)
      .get("/api/protected/users")
      .set("Authorization", "Invalid token format");

    expect(response.status).toBe(401);
    expect(response.body.error).toContain("Formato de token inválido");
  });

  test("should reject with invalid token format - only Bearer", async () => {
    const response = await request(app)
      .get("/api/protected/users")
      .set("Authorization", "Bearer");

    expect(response.status).toBe(401);
  });

  test("should reject with invalid token content", async () => {
    const response = await request(app)
      .get("/api/protected/users")
      .set("Authorization", "Bearer invalid-token-content");

    expect(response.status).toBe(401);
    expect(response.body.error).toContain("Token inválido");
  });
});
