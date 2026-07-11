const Match = require("../models/Match");
const Usuario = require("../models/Usuario");

function ordenarPar(idA, idB) {
  const a = idA.toString();
  const b = idB.toString();
  return a < b ? [a, b] : [b, a];
}

const invitar = async (yoId, otroId) => {
  if (yoId === otroId) {
    const err = new Error("No podés invitarte a vos mismo.");
    err.statusCode = 400;
    throw err;
  }

  const otroUsuario = await Usuario.findById(otroId);
  if (!otroUsuario) {
    const err = new Error("Usuario no encontrado.");
    err.statusCode = 404;
    throw err;
  }

  const [usuario1, usuario2] = ordenarPar(yoId, otroId);
  const yoSoyUsuario1 = (yoId === usuario1);

  let match = await Match.findOne({ usuario1, usuario2 });

  if (!match) {
    // Primera invitación entre estos dos usuarios
    match = await Match.create({
      usuario1,
      usuario2,
      iniciador: yoId,
      usuario1Invito: yoSoyUsuario1,
      usuario2Invito: !yoSoyUsuario1,
      estado: "pendiente"
    });
  } else {
    // Ya existe un documento: marcar que yo también invité
    if (yoSoyUsuario1) match.usuario1Invito = true;
    else match.usuario2Invito = true;

    // Si ambos invitaron → ¡Hay Mate!
    if (match.usuario1Invito && match.usuario2Invito && match.estado !== "matched") {
      match.estado = "matched";
      match.matchedAt = new Date();
    }

    await match.save();
  }

  const hayMatch = match.estado === "matched";

  return {
    match,
    hayMatch,
    mensaje: hayMatch ? "¡Hay Mate! 🧉" : "Invitación enviada."
  };
};

const obtenerMisMatches = async (yoId) => {
  const matches = await Match.find({
    $or: [{ usuario1: yoId }, { usuario2: yoId }]
  })
    .populate("usuario1", "nombre avatar")
    .populate("usuario2", "nombre avatar");

  return matches;
};

const obtenerEstadoMatch = async (yoId, otroId) => {
  const [usuario1, usuario2] = ordenarPar(yoId, otroId);
  const match = await Match.findOne({ usuario1, usuario2 });

  if (!match) {
    return { estado: "ninguno" };
  }

  return { estado: match.estado, match };
};

module.exports = {
  invitar,
  obtenerMisMatches,
  obtenerEstadoMatch
};
