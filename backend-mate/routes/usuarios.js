// routes/usuarios.js

const express = require("express");
const usuarioService = require("../services/usuarioService");
const verificarToken = require("../middleware/auth");

const router = express.Router();

// ─── POST /api/usuarios/register ─────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const result = await usuarioService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.error("Error en register:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }
});

// ─── POST /api/usuarios/login ─────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await usuarioService.loginUser(email, password);
    res.json(result);
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.error("Error en login:", error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }
});

// ─── GET /api/usuarios/me ─────────────────────────────────────
// Ruta protegida: devuelve el perfil del usuario logueado
router.get("/me", verificarToken, (req, res) => {
  res.json({ usuario: req.usuario });
});

module.exports = router;
