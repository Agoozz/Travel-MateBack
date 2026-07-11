import { fetchAPI } from './api';

const mockUsers = {
  "sofia@mate.com": { nombre: "Sofía", ubicacion: "Córdoba", estilo: "confort", bio: "Busco compañeros para un viaje relajado." },
  "mateo@mate.com": { nombre: "Mateo", ubicacion: "Cafayate", estilo: "mochilero", bio: "¡Hola! Soy Mateo, probando el perfil completo en modo local." },
  "martin@mate.com": { nombre: "Martín", ubicacion: "Neuquén", estilo: "mochilero", bio: "La vida es mejor en una carpa y con un fueguito." },
  "nicolas@mate.com": { nombre: "Nicolás", ubicacion: "Buenos Aires", estilo: "social", bio: "Viajero apasionado, explorando lugares poco conocidos." },
  "maria@mate.com": { nombre: "María", ubicacion: "Salta", estilo: "cultural", bio: "Disfruto los museos, la historia y la buena gastronomía." },
  "juana@mate.com": { nombre: "Juana", ubicacion: "Mendoza", estilo: "social", bio: "Me encanta conocer gente nueva y salir de fiesta." },
  "lucas@mate.com": { nombre: "Lucas", ubicacion: "Rosario", estilo: "aventura", bio: "Siempre con la mochila lista para el próximo destino." },
  "camila@mate.com": { nombre: "Camila", ubicacion: "CABA", estilo: "confort", bio: "Organizo viajes grupales, ¡sumate a la aventura!" },
  "joaquin@mate.com": { nombre: "Joaquín", ubicacion: "La Plata", estilo: "confort", bio: "Prefiero hoteles lindos y excursiones organizadas." },
  "lucia@mate.com": { nombre: "Lucía", ubicacion: "Santa Fe", estilo: "mochilero", bio: "Mochilera de corazón, escapadas de finde largo." },
};

function getOfflineLogin(email, password) {
  if (mockUsers[email] && password === "mate1234") {
    const u = mockUsers[email];
    return {
      token: "offline-token-xyz",
      usuario: {
        _id: "offline-" + Date.now(),
        nombre: u.nombre,
        email: email,
        edad: 26,
        ubicacion: u.ubicacion,
        estiloViaje: u.estilo,
        progresoPerfil: 85,
        bio: u.bio,
      }
    };
  } else if (mockUsers[email] && password !== "mate1234") {
    throw new Error("Contraseña incorrecta para el perfil de prueba (es mate1234).");
  } else {
    // If it's a completely new user not in mock db but offline
    return {
      token: "offline-token-xyz",
      usuario: {
        _id: "offline-" + Date.now(),
        nombre: "Viajero Explorador",
        email: email,
        edad: 26,
        ubicacion: "",
        estiloViaje: "mochilero",
        progresoPerfil: 45,
        bio: "",
      }
    };
  }
}

function getOfflineRegister(nombre, email) {
  return {
    token: "offline-token-xyz",
    usuario: {
      _id: "offline-" + Date.now(),
      nombre: nombre || "Nuevo Viajero",
      email: email,
      edad: 26,
      ubicacion: "",
      estiloViaje: "mochilero",
      progresoPerfil: 45,
      bio: "",
    }
  };
}

export const authService = {
  async login(email, password) {
    try {
      const data = await fetchAPI('/usuarios/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return data;
    } catch (err) {
      console.warn("Backend falló o offline. Iniciando en modo local (Offline)...");
      // Use mock fallback if offline
      if (err.message === "Failed to fetch" || err.message.includes("fetch")) {
        return getOfflineLogin(email, password);
      }
      throw err;
    }
  },

  async register(userData) {
    try {
      const data = await fetchAPI('/usuarios/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return data;
    } catch (err) {
      console.warn("Backend falló o offline. Iniciando en modo local (Offline)...");
      if (err.message === "Failed to fetch" || err.message.includes("fetch")) {
        return getOfflineRegister(userData.nombre, userData.email);
      }
      throw err;
    }
  }
};
