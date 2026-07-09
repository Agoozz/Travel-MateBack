const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mate_travel");
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error.message);
    console.warn("⚠️ El servidor continuará ejecutándose, pero las funciones que requieren base de datos fallarán.");
  }
};

module.exports = conectarDB;

// Version sin React