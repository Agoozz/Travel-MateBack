const express = require("express");
const verificarToken = require("../middleware/auth");
const usuarioController = require("../controllers/usuarioController");

const router = express.Router();

// ─── POST /api/usuarios/register ─────────────────────────────
router.post("/register", usuarioController.registrar);

// ─── POST /api/usuarios/login ─────────────────────────────────
router.post("/login", usuarioController.login);

// ─── GET /api/usuarios/me ─────────────────────────────────────
router.get("/me", verificarToken, usuarioController.getMe);

module.exports = router;
