const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Datos de ejemplo (simulando una base de datos)
let users = [
  { id: 1, name: "Juan", email: "juan@email.com" },
  { id: 2, name: "María", email: "maria@email.com" },
];

// Routes
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nombre y email son requeridos" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res.status(404).json({ error: "Usuario no encontrado" });

  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = app;
