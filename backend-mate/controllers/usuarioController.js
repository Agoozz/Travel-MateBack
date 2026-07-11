const usuarioService = require("../services/usuarioService");

const registrar = async (req, res, next) => {
  try {
    const resultado = await usuarioService.registrar(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const resultado = await usuarioService.login(email, password);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};

const getMe = (req, res, next) => {
  try {
    res.json({ usuario: req.usuario });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrar,
  login,
  getMe
};
