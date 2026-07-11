const Usuario = require("../models/Usuario");
const Match = require("../models/Match");

function calcularAfinidad(userA, userB) {
  let score = 0;

  // Estilo de viaje — 30 pts
  const compatibles = {
    mochilero: ["mochilero", "social"],
    confort:   ["confort", "cultural"],
    social:    ["social", "mochilero"],
    cultural:  ["cultural", "confort"]
  };
  if (userA.estiloViaje === userB.estiloViaje) score += 30;
  else if (compatibles[userA.estiloViaje]?.includes(userB.estiloViaje)) score += 15;

  // Presupuesto — 25 pts
  const nivelPresupuesto = { economico: 1, medio: 2, premium: 3 };
  const diff = Math.abs(nivelPresupuesto[userA.presupuesto] - nivelPresupuesto[userB.presupuesto]);
  if (diff === 0) score += 25;
  else if (diff === 1) score += 12;

  // Regiones en común — 20 pts
  const regionesComunes = (userA.regiones || []).filter(r => (userB.regiones || []).includes(r));
  score += Math.min(regionesComunes.length * 10, 20);

  // Fechas que se solapan — 15 pts
  if (userA.fechaInicio && userA.fechaFin && userB.fechaInicio && userB.fechaFin) {
    const startA = new Date(userA.fechaInicio), endA = new Date(userA.fechaFin);
    const startB = new Date(userB.fechaInicio), endB = new Date(userB.fechaFin);
    if (startA <= endB && startB <= endA) score += 15;
  }

  // Intereses en común — 10 pts
  const interesesComunes = (userA.intereses || []).filter(i => (userB.intereses || []).includes(i));
  score += Math.min(interesesComunes.length * 3, 10);

  return Math.round(score);
}

const getPerfilesForUser = async (usuarioActual) => {
  const matches = await Match.find({
    $or: [{ usuario1: usuarioActual._id }, { usuario2: usuarioActual._id }]
  });

  const excludeIds = matches.map(m => {
    const isUser1 = m.usuario1.equals(usuarioActual._id);
    const isUser2 = m.usuario2.equals(usuarioActual._id);
    
    if (m.estado === 'matched') {
      return isUser1 ? m.usuario2 : m.usuario1;
    }
    
    if (m.estado === 'pendiente') {
      if (isUser1 && m.usuario1Invito) return m.usuario2;
      if (isUser2 && m.usuario2Invito) return m.usuario1;
    }
    
    return null;
  }).filter(id => id !== null);

  const otrosUsuarios = await Usuario.find({ 
    _id: { $ne: usuarioActual._id, $nin: excludeIds } 
  });

  const perfilesConAfinidad = otrosUsuarios.map(u => {
    const afinidad = calcularAfinidad(usuarioActual, u);
    return { ...u.toJSON(), afinidad };
  });

  perfilesConAfinidad.sort((a, b) => b.afinidad - a.afinidad);

  return perfilesConAfinidad;
};

const updatePerfil = async (usuario, data) => {
  const { nombre, ubicacion, bio, estiloViaje, presupuesto, fechaInicio, fechaFin } = data;
  
  if (nombre !== undefined) usuario.nombre = nombre;
  if (ubicacion !== undefined) usuario.ubicacion = ubicacion;
  if (bio !== undefined) usuario.bio = bio;
  if (estiloViaje !== undefined) usuario.estiloViaje = estiloViaje;
  if (presupuesto !== undefined) usuario.presupuesto = presupuesto;
  if (fechaInicio !== undefined) usuario.fechaInicio = fechaInicio;
  if (fechaFin !== undefined) usuario.fechaFin = fechaFin;
  
  await usuario.save();
  return usuario;
};

module.exports = {
  getPerfilesForUser,
  updatePerfil
};
