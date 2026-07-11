const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const generarToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

const registerUser = async (data) => {
  const { 
    nombre, email, password,
    estiloViaje, presupuesto, estiloCompanero, destino,
    fechaInicio, fechaFin, regiones, progresoPerfil
  } = data;

  if (!nombre || !email || !password) {
    throw { status: 400, message: "Nombre, email y contraseña son obligatorios." };
  }

  if (password.length < 6) {
    throw { status: 400, message: "La contraseña debe tener al menos 6 caracteres." };
  }

  const existe = await Usuario.findOne({ email });
  if (existe) {
    throw { status: 409, message: "Ese email ya está registrado." };
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

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw { status: 400, message: "Email y contraseña son obligatorios." };
  }

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    throw { status: 401, message: "Email o contraseña incorrectos." };
  }

  const esValido = await usuario.compararPassword(password);
  if (!esValido) {
    throw { status: 401, message: "Email o contraseña incorrectos." };
  }

  const token = generarToken(usuario._id);
  return { token, usuario };
};

module.exports = {
  registerUser,
  loginUser
};
