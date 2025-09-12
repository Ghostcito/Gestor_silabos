const request = require("supertest");
const app = require("./app");

describe("Performance Testing", () => {
  test("should respond within 500ms", async () => {
    const start = Date.now();
    const response = await request(app).get("/api/users");
    const duration = Date.now() - start;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(500);
  });

  test("should handle concurrent requests", async () => {
    const requests = Array(10)
      .fill()
      .map(() => request(app).get("/api/users"));

    const responses = await Promise.all(requests);

    responses.forEach((response) => {
      expect(response.status).toBe(200);
    });
  });
});
