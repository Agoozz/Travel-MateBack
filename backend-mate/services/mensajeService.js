const Mensaje = require("../models/Mensaje");

const obtenerHistorial = async (yoId, otroId) => {
  const mensajes = await Mensaje.find({
    $or: [
      { emisor: yoId, receptor: otroId },
      { emisor: otroId, receptor: yoId }
    ]
  }).sort({ createdAt: 1 });

  return mensajes;
};

const enviarMensaje = async (yoId, receptorId, texto) => {
  if (!receptorId || !texto) {
    const err = new Error("Faltan datos obligatorios.");
    err.statusCode = 400;
    throw err;
  }

  const nuevoMensaje = await Mensaje.create({
    emisor: yoId,
    receptor: receptorId,
    texto
  });

  return nuevoMensaje;
};

module.exports = {
  obtenerHistorial,
  enviarMensaje
};
