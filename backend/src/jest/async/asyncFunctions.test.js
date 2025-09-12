const { fetchData, fetchWithError } = require("./asyncFunctions");

describe("Funciones asíncronas", () => {
  test("fetchData retorna datos correctos", async () => {
    const data = await fetchData();
    expect(data).toEqual({ data: "Información importante" });
  });

  test("fetchWithError lanza error", async () => {
    await expect(fetchWithError()).rejects.toThrow("Error en la petición");
  });

  test("fetchData funciona con .resolves", async () => {
    await expect(fetchData()).resolves.toEqual({
      data: "Información importante",
    });
  });
});
