const Mensaje = require("../models/Mensaje");

const getMessages = async (yo, otro) => {
  return await Mensaje.find({
    $or: [
      { emisor: yo, receptor: otro },
      { emisor: otro, receptor: yo }
    ]
  }).sort({ createdAt: 1 });
};

const sendMessage = async (yo, receptorId, texto) => {
  if (!receptorId || !texto) {
    throw { status: 400, message: "Faltan datos obligatorios." };
  }

  return await Mensaje.create({
    emisor: yo,
    receptor: receptorId,
    texto
  });
};

module.exports = {
  getMessages,
  sendMessage
};
