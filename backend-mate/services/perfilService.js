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

function calcularProgreso(usuario) {
  // Campos obligatorios para considerar el perfil completo
  const requiredFields = [
    "estiloViaje",
    "presupuesto",
    "regiones",
    "destino",
    "estiloCompanero",
    "fechaInicio",
    "fechaFin"
  ];
  
  let validCount = 0;
  requiredFields.forEach(field => {
    const val = usuario[field];
    if (Array.isArray(val) && val.length > 0) {
      validCount++;
    } else if (typeof val === 'string' && val.trim() !== '') {
      validCount++;
    }
  });

  const percent = Math.floor((validCount / requiredFields.length) * 100);
  return percent === 100 ? 100 : percent;
}

const obtenerPerfilesConAfinidad = async (usuarioActualId) => {
  const usuarioActual = await Usuario.findById(usuarioActualId);
  if (!usuarioActual) {
    const err = new Error("Usuario no encontrado.");
    err.statusCode = 404;
    throw err;
  }

  // Buscar matches donde el usuario actual esté involucrado
  const matches = await Match.find({
    $or: [{ usuario1: usuarioActual._id }, { usuario2: usuarioActual._id }]
  });

  // Extraer IDs de usuarios a excluir
  const excludeIds = matches.map(m => {
    const isUser1 = m.usuario1.equals(usuarioActual._id);
    const isUser2 = m.usuario2.equals(usuarioActual._id);
    
    // Excluir si ya son matches confirmados
    if (m.estado === 'matched') {
      return isUser1 ? m.usuario2 : m.usuario1;
    }
    
    // Excluir si el usuario actual ya invitó a la otra persona
    if (m.estado === 'pendiente') {
      if (isUser1 && m.usuario1Invito) return m.usuario2;
      if (isUser2 && m.usuario2Invito) return m.usuario1;
    }
    
    return null;
  }).filter(id => id !== null);

  // Buscar usuarios que no sean el actual, que tengan progreso 100, y que no estén en la lista de excluidos
  const otrosUsuarios = await Usuario.find({ 
    _id: { $ne: usuarioActual._id, $nin: excludeIds },
    progresoPerfil: 100
  });

  const perfilesConAfinidad = otrosUsuarios.map(u => {
    const afinidad = calcularAfinidad(usuarioActual, u);
    return { ...u.toJSON(), afinidad };
  });

  perfilesConAfinidad.sort((a, b) => b.afinidad - a.afinidad);

  return perfilesConAfinidad;
};

const actualizarPerfil = async (usuarioId, datosActualizacion) => {
  const usuario = await Usuario.findById(usuarioId);
  if (!usuario) {
    const err = new Error("Usuario no encontrado.");
    err.statusCode = 404;
    throw err;
  }

  const { 
    nombre, 
    ubicacion, 
    bio, 
    estiloViaje, 
    presupuesto, 
    fechaInicio, 
    fechaFin,
    destino,
    estiloCompanero,
    regiones,
    edad,
    avatar,
    idiomas,
    intereses
  } = datosActualizacion;
  
  if (nombre !== undefined) usuario.nombre = nombre;
  if (ubicacion !== undefined) usuario.ubicacion = ubicacion;
  if (bio !== undefined) usuario.bio = bio;
  if (estiloViaje !== undefined) usuario.estiloViaje = estiloViaje;
  if (presupuesto !== undefined) usuario.presupuesto = presupuesto;
  if (fechaInicio !== undefined) usuario.fechaInicio = fechaInicio;
  if (fechaFin !== undefined) usuario.fechaFin = fechaFin;
  if (destino !== undefined) usuario.destino = destino;
  if (estiloCompanero !== undefined) usuario.estiloCompanero = estiloCompanero;
  if (regiones !== undefined) usuario.regiones = regiones;
  if (edad !== undefined) usuario.edad = edad;
  if (avatar !== undefined) usuario.avatar = avatar;
  if (idiomas !== undefined) usuario.idiomas = idiomas;
  if (intereses !== undefined) usuario.intereses = intereses;

  usuario.progresoPerfil = calcularProgreso(usuario);
  
  await usuario.save();

  return usuario;
};

module.exports = {
  obtenerPerfilesConAfinidad,
  actualizarPerfil
};
