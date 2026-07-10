// models/Usuario.js

const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
  nombre:          { type: String, required: true, trim: true },
  email:           { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:        { type: String, required: true, minlength: 6 },

  // Datos del perfil de viajero
  edad:            { type: Number, default: 26 },
  ubicacion:       { type: String, default: "Buenos Aires, Argentina" },
  bio:             { type: String, default: "¡Listo para compartir mates y emprender nuevas rutas!" },
  avatar:          { type: String, default: "https://i.pravatar.cc/150?img=12" },
  estiloViaje:     { type: String, default: "mochilero", enum: ["mochilero", "confort", "social", "cultural"] },
  presupuesto:     { type: String, default: "economico",  enum: ["economico", "medio", "premium"] },
  estiloCompanero: { type: String, default: "aventura" },
  regiones:        { type: [String], default: [] },
  destino:         { type: String, default: "" },
  fechaInicio:     { type: String, default: "" },
  fechaFin:        { type: String, default: "" },
  intereses:       { type: [String], default: ["Trekking", "Fotografía", "Comida local"] },
  idiomas:         { type: [String], default: ["Español"] },
  progresoPerfil:  { type: Number, default: 45 },
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
