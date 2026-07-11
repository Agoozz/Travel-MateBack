const express = require("express");
const verificarToken = require("../middleware/auth");
const mensajeController = require("../controllers/mensajeController");

const router = express.Router();

// GET /api/mensajes/:userId -> Obtener historial de chat con un usuario puntual
router.get("/:userId", verificarToken, mensajeController.getHistorial);

// POST /api/mensajes -> Enviar un nuevo mensaje
router.post("/", verificarToken, mensajeController.enviarMensaje);

module.exports = router;
