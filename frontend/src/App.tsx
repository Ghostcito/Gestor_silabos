import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <div className="p-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Bienvenido a Gestor de Sílabos
        </h1>
        <p className="text-gray-700">
          Un pequeño CRUD para gestionar sílabos académicos.
        </p>
      </div>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
