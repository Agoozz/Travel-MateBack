// app.js

require("dotenv").config();

const express = require("express");

if (!process.env.JWT_SECRET) {
  console.error("ERROR CRÍTICO: La variable de entorno JWT_SECRET no está definida. Revisa tu archivo .env");
  process.exit(1);
}

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
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:4173',
      process.env.FRONTEND_URL
    ];
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());


// Middleware global para rechazar peticiones si la DB falla o el token es simulado
const mongoose = require("mongoose");
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.includes("offline-")) {
      return res.status(503).json({ error: "Offline Token Detected" });
    }
    if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
      return res.status(503).json({ error: "Database Offline" });
    }
  }
  next();
});

// Ruta raíz (Health Check)
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "🧉 Travel Mate API funcionando correctamente"
  });
});

// Rutas de la API
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/perfiles", perfilesRoutes);
app.use("/api/matches", matchesRoutes);
app.use("/api/mensajes", mensajesRoutes);




app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";
  res.status(status).json({ error: message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🧉 Servidor corriendo en http://localhost:${PORT}`);
});


