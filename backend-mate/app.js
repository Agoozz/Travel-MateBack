// app.js

require("dotenv").config();

const express       = require("express");
const cors          = require("cors");
const path          = require("path");
const conectarDB    = require("./config/db");
const usuariosRoutes = require("./routes/usuarios");
const perfilesRoutes = require("./routes/perfiles");
const matchesRoutes  = require("./routes/matches");
const mensajesRoutes = require("./routes/mensajes");

const app = express();

// Conectar a MongoDB
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir el frontend (HTML, CSS, JS, imágenes)
app.use(express.static(__dirname));

// Rutas de la API
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/perfiles", perfilesRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/mensajes", mensajesRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🧉 Servidor corriendo en http://localhost:${PORT}`);
});
