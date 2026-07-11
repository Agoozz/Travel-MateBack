const express = require("express");
const perfilService = require("../services/perfilService");
const verificarToken = require("../middleware/auth");

const router = express.Router();

// ─── GET /api/perfiles ─────────────────────────────────────────
router.get("/", verificarToken, async (req, res) => {
  try {
    const perfiles = await perfilService.getPerfilesForUser(req.usuario);
    res.json({ perfiles });
  } catch (error) {
    console.error("Error en /api/perfiles:", error);
    res.status(500).json({ error: "Error al obtener perfiles." });
  }
});

// ─── PUT /api/perfiles/me ────────────────────────────────────────
router.put("/me", verificarToken, async (req, res) => {
  try {
    const usuarioActualizado = await perfilService.updatePerfil(req.usuario, req.body);
    res.json({ message: "Perfil actualizado correctamente", usuario: usuarioActualizado });
  } catch (error) {
    console.error("Error en PUT /api/perfiles/me:", error);
    res.status(500).json({ error: "Error al actualizar el perfil." });
  }
});

module.exports = router;
