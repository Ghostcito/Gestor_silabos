import "./App.css";

function App() {
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Mi Aplicación</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Botón de ejemplo
          </button>
          <p className="mt-4 text-gray-700">Despues de rebase</p>
        </div>
      </div>
    </>
  );
}

export default App;
