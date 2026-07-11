const perfilService = require("../services/perfilService");

const getPerfiles = async (req, res, next) => {
  try {
    const usuarioActualId = req.usuario._id;
    const perfiles = await perfilService.obtenerPerfilesConAfinidad(usuarioActualId);
    res.json({ perfiles });
  } catch (error) {
    next(error);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const usuarioActualId = req.usuario._id;
    const datosActualizacion = req.body;
    
    const usuarioActualizado = await perfilService.actualizarPerfil(usuarioActualId, datosActualizacion);
    
    res.json({ message: "Perfil actualizado correctamente", usuario: usuarioActualizado });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPerfiles,
  updateMe
};
