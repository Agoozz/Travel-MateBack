const express = require("express");
const mensajeService = require("../services/mensajeService");
const verificarToken = require("../middleware/auth");

const router = express.Router();

// GET /api/mensajes/:userId -> Obtener historial de chat con un usuario puntual
router.get("/:userId", verificarToken, async (req, res) => {
  try {
    const mensajes = await mensajeService.getMessages(req.usuario._id.toString(), req.params.userId);
    res.json(mensajes);
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
    res.status(500).json({ error: "Error al obtener mensajes." });
  }
});

// POST /api/mensajes -> Enviar un nuevo mensaje
router.post("/", verificarToken, async (req, res) => {
  try {
    const { receptorId, texto } = req.body;
    const nuevoMensaje = await mensajeService.sendMessage(req.usuario._id.toString(), receptorId, texto);
    res.json(nuevoMensaje);
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ error: error.message });
    } else {
      console.error("Error al enviar mensaje:", error);
      res.status(500).json({ error: "Error al enviar mensaje." });
    }
  }
});

module.exports = router;
