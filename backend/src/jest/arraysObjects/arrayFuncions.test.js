const { filterAdults, findByName, sortByAge } = require("./arrayFunctions");

describe("Funciones de arrays", () => {
  const people = [
    { name: "Juan", age: 25 },
    { name: "María", age: 17 },
    { name: "Pedro", age: 30 },
    { name: "Ana", age: 16 },
  ];

  test("filtra adultos", () => {
    const adults = filterAdults(people);
    expect(adults).toHaveLength(2);
    expect(adults).toEqual([
      { name: "Juan", age: 25 },
      { name: "Pedro", age: 30 },
    ]);
  });

  test("encuentra por nombre", () => {
    const person = findByName(people, "juan");
    expect(person).toEqual({ name: "Juan", age: 25 });
    expect(findByName(people, "Carlos")).toBeUndefined();
  });

  test("ordena por edad", () => {
    const sorted = sortByAge(people);
    expect(sorted[0].age).toBe(16);
    expect(sorted[3].age).toBe(30);
  });
});
