const Match = require("../models/Match");
const Usuario = require("../models/Usuario");

function ordenarPar(idA, idB) {
  const a = idA.toString();
  const b = idB.toString();
  return a < b ? [a, b] : [b, a];
}

const invitar = async (yo, otroId) => {
  if (yo === otroId) {
    throw { status: 400, message: "No podés invitarte a vos mismo." };
  }

  const otroUsuario = await Usuario.findById(otroId);
  if (!otroUsuario) {
    throw { status: 404, message: "Usuario no encontrado." };
  }

  const [usuario1, usuario2] = ordenarPar(yo, otroId);
  const yoSoyUsuario1 = (yo === usuario1);

  let match = await Match.findOne({ usuario1, usuario2 });

  if (!match) {
    match = await Match.create({
      usuario1,
      usuario2,
      iniciador: yo,
      usuario1Invito: yoSoyUsuario1,
      usuario2Invito: !yoSoyUsuario1,
      estado: "pendiente"
    });
  } else {
    if (yoSoyUsuario1) match.usuario1Invito = true;
    else match.usuario2Invito = true;

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

const getMatchesForUser = async (yo) => {
  return await Match.find({
    $or: [{ usuario1: yo }, { usuario2: yo }]
  })
    .populate("usuario1", "nombre avatar")
    .populate("usuario2", "nombre avatar");
};

const getMatchStatus = async (yo, otroId) => {
  const [usuario1, usuario2] = ordenarPar(yo, otroId);
  const match = await Match.findOne({ usuario1, usuario2 });

  if (!match) {
    return { estado: "ninguno" };
  }

  return { estado: match.estado, match };
};

module.exports = {
  invitar,
  getMatchesForUser,
  getMatchStatus
};
