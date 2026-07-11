/**
 * Manejador offline basado exactamente en el ChatManager de la versión Vanilla.
 * Proporciona persistencia en localStorage y respuestas simuladas.
 */

// Generar key dinámica por usuario para evitar que se mezclen los historiales
const getStorageKey = () => {
  const user = JSON.parse(localStorage.getItem('user_data') || '{}');
  const userId = user._id || localStorage.getItem("user_id") || "guest";
  return `mateAndTravelChats_${userId}`;
};

// Cargar chats desde localStorage
const loadChats = () => {
  try {
    const stored = localStorage.getItem(getStorageKey());
    return stored ? JSON.parse(stored) : {};
  } catch (_e) {
    return {};
  }
};

// Guardar chats a localStorage
const saveChats = (chats) => {
  localStorage.setItem(getStorageKey(), JSON.stringify(chats));
};

export const offlineChatManager = {
  // Obtener todos los chats
  getAllChats: () => {
    return loadChats();
  },

  // Obtener el historial de un usuario específico
  getChatHistory: (userId) => {
    const chats = loadChats();
    return chats[userId] || { messages: [], name: "", avatar: "", lastUpdate: 0 };
  },

  // Añadir un mensaje al historial
  addMessage: (userId, userName, userAvatar, text, sender) => {
    const chats = loadChats();
    if (!chats[userId]) {
      chats[userId] = {
        id: userId,
        name: userName,
        avatar: userAvatar,
        messages: [],
      };
    } else {
      // Actualizar avatar y nombre por si cambiaron
      if (userName) chats[userId].name = userName;
      if (userAvatar) chats[userId].avatar = userAvatar;
    }

    chats[userId].messages.push({
      text: text,
      sender: sender, // 'sent' (yo) o 'received' (el otro)
      timestamp: new Date().getTime(),
    });
    chats[userId].lastUpdate = new Date().getTime();

    saveChats(chats);
  },

  // Motor de respuestas variadas (idéntico al Vanilla)
  generateReply: (userText) => {
    const text = (userText || "").toLowerCase();

    if (text.includes("hola") || text.includes("buenas")) {
      const replies = [
        "¡Hola! ¿Cómo andás? 😊",
        "¡Ey! Qué bueno cruzar mensaje. 🧉",
        "Holaaa, ¿todo bien por ahí?",
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }

    if (
      text.includes("cuando") ||
      text.includes("fecha") ||
      text.includes("mes")
    ) {
      const replies = [
        "Estaba pensando ir en un par de meses, en temporada baja.",
        "Idealmente para las vacaciones de invierno, si puedo acomodar mis días.",
        "¡Cuando pinte! Soy bastante flexible con las fechas.",
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }

    if (
      text.includes("plata") ||
      text.includes("presupuesto") ||
      text.includes("gastar") ||
      text.includes("precio") ||
      text.includes("gasolero")
    ) {
      const replies = [
        "Yo prefiero ir gasolero, hostels y cocinar nosotros. Así estiramos el viaje.",
        "Tengo un presupuesto medio, ni tan de lujo ni sufriendo jaja.",
        "Me gusta darme algunos gustos con la comida, pero en hospedaje ahorro.",
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }

    if (
      text.includes("viaje") ||
      text.includes("ir") ||
      text.includes("lugar") ||
      text.includes("destino")
    ) {
      const replies = [
        "¡Me re copa la idea! Tengo muchas ganas de recorrer nuevos senderos.",
        "¡Obvio! Yo pongo el mate y vos las facturas 😉",
        "Suena genial. ¿Tenés un itinerario pensado o vamos viendo en el momento?",
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }

    // Default random replies
    const defaultReplies = [
      "Jajaja, tal cual.",
      "Me parece perfecto.",
      "¿Vos qué decís? Yo me adapto.",
      "¡De una! Contá conmigo para esa.",
      "Interesante... contame un poco más de cómo viajás vos.",
      "¡Me encanta la idea! Pinta re bien.",
    ];
    return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  }
};
