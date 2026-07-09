// middleware/auth.js

const jwt     = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

module.exports = async function verificarToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado." });
    }

    const token   = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto_super_seguro_123");

    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado." });
    }

    req.usuario = usuario; // disponible en las rutas protegidas
    next();

  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
};

// Version sin React