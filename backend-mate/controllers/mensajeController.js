const mensajeService = require("../services/mensajeService");

const getHistorial = async (req, res, next) => {
  try {
    const yoId = req.usuario._id.toString();
    const otroId = req.params.userId;
    const mensajes = await mensajeService.obtenerHistorial(yoId, otroId);
    res.json(mensajes);
  } catch (error) {
    next(error);
  }
};

const enviarMensaje = async (req, res, next) => {
  try {
    const { receptorId, texto } = req.body;
    const yoId = req.usuario._id.toString();
    const nuevoMensaje = await mensajeService.enviarMensaje(yoId, receptorId, texto);
    res.json(nuevoMensaje);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHistorial,
  enviarMensaje
};
