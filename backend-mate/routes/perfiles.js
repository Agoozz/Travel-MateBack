const express = require("express");
const verificarToken = require("../middleware/auth");
const perfilController = require("../controllers/perfilController");

const router = express.Router();

// ─── GET /api/perfiles ─────────────────────────────────────────
router.get("/", verificarToken, perfilController.getPerfiles);

// ─── PUT /api/perfiles/me ────────────────────────────────────────
router.put("/me", verificarToken, perfilController.updateMe);

module.exports = router;
