// routes/usuarios.js

const express         = require("express");
const jwt             = require("jsonwebtoken");
const Usuario         = require("../models/Usuario");
const verificarToken  = require("../middleware/auth");

const router = express.Router();

// ─── Helper: generar JWT ─────────────────────────────────────
const generarToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

// ─── POST /api/usuarios/register ─────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Nombre, email y contraseña son obligatorios." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres." });
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(409).json({ error: "Ese email ya está registrado." });
    }

    const usuario = await Usuario.create({ nombre, email, password });
    const token   = generarToken(usuario._id);

    res.status(201).json({ token, usuario });

  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// ─── POST /api/usuarios/login ─────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios." });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: "Email o contraseña incorrectos." });
    }

    const esValido = await usuario.compararPassword(password);
    if (!esValido) {
      return res.status(401).json({ error: "Email o contraseña incorrectos." });
    }

    const token = generarToken(usuario._id);
    res.json({ token, usuario });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// ─── GET /api/usuarios/me ─────────────────────────────────────
// Ruta protegida: devuelve el perfil del usuario logueado
router.get("/me", verificarToken, (req, res) => {
  res.json({ usuario: req.usuario });
});

module.exports = router;
