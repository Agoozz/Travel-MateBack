const express = require("express");
const Mensaje = require("../models/Mensaje");
const verificarToken = require("../middleware/auth");

const router = express.Router();

// GET /api/mensajes/:userId -> Obtener historial de chat con un usuario puntual
router.get("/:userId", verificarToken, async (req, res) => {
  try {
    const yo = req.usuario._id.toString();
    const otro = req.params.userId;

    const mensajes = await Mensaje.find({
      $or: [
        { emisor: yo, receptor: otro },
        { emisor: otro, receptor: yo }
      ]
    }).sort({ createdAt: 1 });

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
    const yo = req.usuario._id.toString();

    if (!receptorId || !texto) {
      return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    const nuevoMensaje = await Mensaje.create({
      emisor: yo,
      receptor: receptorId,
      texto
    });

    res.json(nuevoMensaje);
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    res.status(500).json({ error: "Error al enviar mensaje." });
  }
});

module.exports = router;
