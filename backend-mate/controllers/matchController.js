const matchService = require("../services/matchService");

const invitar = async (req, res, next) => {
  try {
    const yoId = req.usuario._id.toString();
    const otroId = req.params.userId;
    const resultado = await matchService.invitar(yoId, otroId);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};

const getMisMatches = async (req, res, next) => {
  try {
    const yoId = req.usuario._id.toString();
    const matches = await matchService.obtenerMisMatches(yoId);
    res.json({ matches });
  } catch (error) {
    next(error);
  }
};

const getEstadoMatch = async (req, res, next) => {
  try {
    const yoId = req.usuario._id.toString();
    const otroId = req.params.userId;
    const estado = await matchService.obtenerEstadoMatch(yoId, otroId);
    res.json(estado);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  invitar,
  getMisMatches,
  getEstadoMatch
};
