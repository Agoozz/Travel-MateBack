// routes/matches.js

const express = require("express");
const matchService = require("../services/matchService");
const verificarToken = require("../middleware/auth");

const router = express.Router();

// ─── POST /api/matches/invitar/:userId ─────────────────────────
router.post("/invitar/:userId", verificarToken, async (req, res) => {
  try {
    const result = await matchService.invitar(req.usuario._id.toString(), req.params.userId);
    res.json(result);
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.error("Error en /api/matches/invitar:", error);
      res.status(500).json({ error: "Error al procesar la invitación." });
    }
  }
});

// ─── GET /api/matches ───────────────────────────────────────────
router.get("/", verificarToken, async (req, res) => {
  try {
    const matches = await matchService.getMatchesForUser(req.usuario._id.toString());
    res.json({ matches });
  } catch (error) {
    console.error("Error en GET /api/matches:", error);
    res.status(500).json({ error: "Error al obtener matches." });
  }
});

// ─── GET /api/matches/estado/:userId ────────────────────────────
router.get("/estado/:userId", verificarToken, async (req, res) => {
  try {
    const result = await matchService.getMatchStatus(req.usuario._id.toString(), req.params.userId);
    res.json(result);
  } catch (error) {
    console.error("Error en /api/matches/estado:", error);
    res.status(500).json({ error: "Error al consultar el estado." });
  }
});

module.exports = router;
