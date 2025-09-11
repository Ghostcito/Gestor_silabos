// Funciones simples para testear
const sum = (a, b) => a + b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) throw new Error("No se puede dividir por cero");
  return a / b;
};
const isEven = (n) => n % 2 === 0;

module.exports = { sum, multiply, divide, isEven };
