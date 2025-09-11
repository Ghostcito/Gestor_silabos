const { sum, multiply, divide, isEven } = require("./math");

describe("Funciones matemáticas", () => {
  test("suma correctamente", () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(-1, 5)).toBe(4);
    expect(sum(0, 0)).toBe(0);
  });

  test("multiplica correctamente", () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(5, 0)).toBe(0);
    expect(multiply(-2, 4)).toBe(-8);
  });

  test("divide correctamente", () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(9, 3)).toBe(3);
  });

  test("lanza error al dividir por cero", () => {
    expect(() => divide(10, 0)).toThrow("No se puede dividir por cero");
  });

  test("detecta números pares", () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(3)).toBe(false);
    expect(isEven(0)).toBe(true);
  });
});
