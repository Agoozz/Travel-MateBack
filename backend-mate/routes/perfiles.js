const express        = require("express");
const Usuario        = require("../models/Usuario");
const Match          = require("../models/Match");
const verificarToken = require("../middleware/auth");

const router = express.Router();

// ─── Algoritmo de afinidad (0-100) ────────────────────────────
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

// ─── GET /api/perfiles ─────────────────────────────────────────
router.get("/", verificarToken, async (req, res) => {
  try {
    const usuarioActual = req.usuario;

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

    // Buscar usuarios que no sean el actual y que no estén en la lista de excluidos
    const otrosUsuarios = await Usuario.find({ 
      _id: { $ne: usuarioActual._id, $nin: excludeIds } 
    });

    const perfilesConAfinidad = otrosUsuarios.map(u => {
      const afinidad = calcularAfinidad(usuarioActual, u);
      return { ...u.toJSON(), afinidad };
    });

    perfilesConAfinidad.sort((a, b) => b.afinidad - a.afinidad);

    res.json({ perfiles: perfilesConAfinidad });

  } catch (error) {
    console.error("Error en /api/perfiles:", error);
    res.status(500).json({ error: "Error al obtener perfiles." });
  }
});
// ─── PUT /api/perfiles/me ────────────────────────────────────────
router.put("/me", verificarToken, async (req, res) => {
  try {
    const { nombre, ubicacion, bio, estiloViaje, presupuesto, disponibilidad, fechaInicio, fechaFin } = req.body;
    
    // Solo actualizamos campos permitidos
    if (nombre !== undefined) req.usuario.nombre = nombre;
    if (ubicacion !== undefined) req.usuario.ubicacion = ubicacion;
    if (bio !== undefined) req.usuario.bio = bio;
    if (estiloViaje !== undefined) req.usuario.estiloViaje = estiloViaje;
    if (presupuesto !== undefined) req.usuario.presupuesto = presupuesto;
    if (disponibilidad !== undefined) req.usuario.disponibilidad = disponibilidad;
    if (fechaInicio !== undefined) req.usuario.fechaInicio = fechaInicio;
    if (fechaFin !== undefined) req.usuario.fechaFin = fechaFin;
    
    await req.usuario.save();

    res.json({ message: "Perfil actualizado correctamente", usuario: req.usuario });
  } catch (error) {
    console.error("Error en PUT /api/perfiles/me:", error);
    res.status(500).json({ error: "Error al actualizar el perfil." });
  }
});

module.exports = router;
