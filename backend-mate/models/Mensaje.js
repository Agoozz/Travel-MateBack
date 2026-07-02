const mongoose = require("mongoose");

const mensajeSchema = new mongoose.Schema({
  emisor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  receptor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  texto: { type: String, required: true },
  leido: { type: Boolean, default: false }
}, { timestamps: true });

// Índice para ordenar rápido las conversaciones
mensajeSchema.index({ emisor: 1, receptor: 1, createdAt: 1 });

module.exports = mongoose.model("Mensaje", mensajeSchema);
