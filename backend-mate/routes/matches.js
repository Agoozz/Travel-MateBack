const express = require("express");
const verificarToken = require("../middleware/auth");
const matchController = require("../controllers/matchController");

const router = express.Router();

// ─── POST /api/matches/invitar/:userId ─────────────────────────
router.post("/invitar/:userId", verificarToken, matchController.invitar);

// ─── GET /api/matches ───────────────────────────────────────────
router.get("/", verificarToken, matchController.getMisMatches);

// ─── GET /api/matches/estado/:userId ────────────────────────────
router.get("/estado/:userId", verificarToken, matchController.getEstadoMatch);

module.exports = router;
