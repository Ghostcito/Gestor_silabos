import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function App() {
  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Perfil de Usuario</CardTitle>
          <CardDescription>Información básica del usuario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Nombre: Juan Pérez</p>
              <p className="text-sm text-muted-foreground">
                Email: juan@ejemplo.com
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Editar Perfil</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Perfil</DialogTitle>
                  <DialogDescription>
                    Realiza cambios en tu perfil aquí. Guarda cuando termines.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Nombre"
                    defaultValue="Juan Pérez"
                  />
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                    type="email"
                    defaultValue="juan@ejemplo.com"
                  />
                  <Button>Guardar Cambios</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
