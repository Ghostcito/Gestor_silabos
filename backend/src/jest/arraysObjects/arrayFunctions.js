const filterAdults = (people) => people.filter((person) => person.age >= 18);

const findByName = (people, name) =>
  people.find((person) => person.name.toLowerCase() === name.toLowerCase());

const sortByAge = (people) => [...people].sort((a, b) => a.age - b.age);

module.exports = { filterAdults, findByName, sortByAge };
