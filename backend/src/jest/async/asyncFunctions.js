const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "Información importante" });
    }, 100);
  });
};

const fetchWithError = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Error en la petición"));
    }, 100);
  });
};

module.exports = { fetchData, fetchWithError };
