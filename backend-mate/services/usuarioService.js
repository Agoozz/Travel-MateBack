const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const generarToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

const registrar = async (datos) => {
  const { 
    nombre, email, password,
    estiloViaje, presupuesto, estiloCompanero, destino,
    fechaInicio, fechaFin, regiones, progresoPerfil
  } = datos;

  if (!nombre || !email || !password) {
    const err = new Error("Nombre, email y contraseña son obligatorios.");
    err.statusCode = 400;
    throw err;
  }

  if (password.length < 6) {
    const err = new Error("La contraseña debe tener al menos 6 caracteres.");
    err.statusCode = 400;
    throw err;
  }

  const existe = await Usuario.findOne({ email });
  if (existe) {
    const err = new Error("Ese email ya está registrado.");
    err.statusCode = 409;
    throw err;
  }

  const usuarioData = { nombre, email, password };
  if (estiloViaje) usuarioData.estiloViaje = estiloViaje;
  if (presupuesto) usuarioData.presupuesto = presupuesto;
  if (estiloCompanero) usuarioData.estiloCompanero = estiloCompanero;
  if (destino) usuarioData.destino = destino;
  if (fechaInicio) usuarioData.fechaInicio = fechaInicio;
  if (fechaFin) usuarioData.fechaFin = fechaFin;
  if (regiones) usuarioData.regiones = regiones;
  if (progresoPerfil) usuarioData.progresoPerfil = progresoPerfil;

  const usuario = await Usuario.create(usuarioData);
  const token = generarToken(usuario._id);

  return { token, usuario };
};

const login = async (email, password) => {
  if (!email || !password) {
    const err = new Error("Email y contraseña son obligatorios.");
    err.statusCode = 400;
    throw err;
  }

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const err = new Error("Email o contraseña incorrectos.");
    err.statusCode = 401;
    throw err;
  }

  const esValido = await usuario.compararPassword(password);
  if (!esValido) {
    const err = new Error("Email o contraseña incorrectos.");
    err.statusCode = 401;
    throw err;
  }

  const token = generarToken(usuario._id);
  return { token, usuario };
};

module.exports = {
  registrar,
  login
};
