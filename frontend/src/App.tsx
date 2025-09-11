import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import "./index.css"; // Tus propios estilos

function App() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="Button violet">Ajustes de Usuario</button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              Ajustes de Usuario
            </Dialog.Title>

            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="TabsList">
                <Tabs.Trigger className="TabsTrigger" value="profile">
                  Perfil
                </Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="security">
                  Seguridad
                </Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="preferences">
                  Preferencias
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content className="TabsContent" value="profile">
                <div className="space-y-4">
                  <h3>Información del Perfil</h3>
                  <input placeholder="Nombre" className="Input" />
                  <input placeholder="Email" className="Input" />
                </div>
              </Tabs.Content>

              <Tabs.Content className="TabsContent" value="security">
                <div className="space-y-4">
                  <h3>Configuración de Seguridad</h3>
                  <button className="Button">Cambiar Contraseña</button>
                  <button className="Button">
                    Autenticación de Dos Factores
                  </button>
                </div>
              </Tabs.Content>

              <Tabs.Content className="TabsContent" value="preferences">
                <div className="space-y-4">
                  <h3>Preferencias</h3>
                  <label>
                    <input type="checkbox" /> Tema Oscuro
                  </label>
                  <label>
                    <input type="checkbox" /> Notificaciones por Email
                  </label>
                </div>
              </Tabs.Content>
            </Tabs.Root>

            <div className="DialogActions">
              <Dialog.Close asChild>
                <button className="Button green">Guardar</button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button className="Button">Cancelar</button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default App;
