// models/Usuario.js

const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
  nombre:          { type: String, required: true, trim: true },
  email:           { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:        { type: String, required: true, minlength: 6 },

  // Datos del perfil de viajero
  edad:            { type: Number, default: null },
  ubicacion:       { type: String, default: "" },
  bio:             { type: String, default: "" },
  avatar:          { type: String, default: "https://i.pravatar.cc/150?img=12" }, // Mantenemos un avatar genérico
  estiloViaje:     { type: String, default: "", enum: ["", "mochilero", "confort", "social", "cultural"] },
  presupuesto:     { type: String, default: "",  enum: ["", "economico", "medio", "premium"] },
  estiloCompanero: { type: String, default: "" },
  regiones:        { type: [String], default: [] },
  destino:         { type: String, default: "" },
  fechaInicio:     { type: String, default: "" },
  fechaFin:        { type: String, default: "" },
  intereses:       { type: [String], default: [] },
  idiomas:         { type: [String], default: [] },
  progresoPerfil:  { type: Number, default: 0 },
  esSeedProfile:   { type: Boolean, default: false }

}, { timestamps: true });

// Hashear contraseña antes de guardar
usuarioSchema.pre("save", async function() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Comparar contraseña al hacer login
usuarioSchema.methods.compararPassword = async function(candidato) {
  return bcrypt.compare(candidato, this.password);
};

// No devolver la contraseña en las respuestas JSON
usuarioSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("Usuario", usuarioSchema);
