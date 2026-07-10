// app.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const usuariosRoutes = require("./routes/usuarios");
const perfilesRoutes = require("./routes/perfiles");
const matchesRoutes = require("./routes/matches");
const mensajesRoutes = require("./routes/mensajes");


const app = express();

// Conectar a MongoDB
conectarDB();
// Middlewares
app.use(cors());
app.use(express.json());


// Middleware global para forzar modo offline en el frontend si la DB falla o hay token offline
const mongoose = require("mongoose");
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.includes("offline-")) {
      return res.status(503).send("Offline Token Detected");
    }
    if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
      return res.status(503).send("Database Offline");
    }
  }
  next();
});

// Rutas de la API
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/perfiles", perfilesRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/mensajes", mensajesRoutes);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🧉 Servidor corriendo en http://localhost:${PORT}`);
});

// Version sin React
