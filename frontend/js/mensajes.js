/**
 * Lógica de la página de mensajes y bandeja de entrada.
 */

// Inicialización de seguridad (Guard)
(function checkAuth() {
  if (!localStorage.getItem("user_name")) {
    window.location.replace("index.html");
  }
  window.addEventListener("pageshow", function (event) {
    if (event.persisted && !localStorage.getItem("user_name")) {
      window.location.replace("index.html");
    }
  });
})();

// Constantes
const token = localStorage.getItem("token");
const myId = localStorage.getItem("user_id");

// Estado
let currentUserId = null;
let pollingInterval = null;
let isBackendOnline = true; // Asumimos online por defecto hasta que falle una petición
let chatHistory = []; // Almacena historial de chat local si está en fallback

// Selectores del DOM
const contactsList = document.getElementById("contactsList");
const noChatsMsg = document.getElementById("noChatsMsg");
const activeChatContainer = document.getElementById("activeChatContainer");
const emptyStateContainer = document.getElementById("emptyStateContainer");
const activeChatAvatar = document.getElementById("activeChatAvatar");
const activeChatName = document.getElementById("activeChatName");
const pageChatMessages = document.getElementById("pageChatMessages");
const pageTypingIndicator = document.getElementById("pageTypingIndicator");
const pageChatForm = document.getElementById("pageChatForm");
const pageChatInput = document.getElementById("pageChatInput");

// Funciones principales
async function loadContacts() {
  try {
    if (!token) throw new Error("No token");

    // 1. Intentar cargar desde el backend
    const response = await fetch(`${API_BASE}/matches`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Backend no disponible");

    isBackendOnline = true;
    const data = await response.json();
    const matches = data.matches || [];

    // Filtrar matches confirmados y formatear
    const validMatches = matches.filter((m) => m.estado === "matched");

    if (validMatches.length === 0) {
      noChatsMsg.classList.remove("d-none");
      contactsList.textContent = "";
      return;
    }

    noChatsMsg.classList.add("d-none");
    contactsList.textContent = "";

    validMatches.forEach((m) => {
      const isMeUsuario1 = m.usuario1._id === myId;
      const otherUser = isMeUsuario1 ? m.usuario2 : m.usuario1;
      renderContactItem(
        otherUser._id,
        otherUser.nombre,
        otherUser.avatar,
        "Abre para ver los mensajes",
      );
    });
  } catch (error) {
    // 2. Fallback: cargar desde ChatManager (Local)
    console.warn(
      "Backend offline o error al cargar contactos. Activando modo Fallback local.",
      error,
    );
    isBackendOnline = false;

    const chats = ChatManager.getAllChats();
    const userIds = Object.keys(chats).sort(
      (a, b) => chats[b].lastUpdate - chats[a].lastUpdate,
    );

    if (userIds.length === 0) {
      noChatsMsg.classList.remove("d-none");
      contactsList.textContent = "";
      return;
    }

    noChatsMsg.classList.add("d-none");
    contactsList.textContent = "";

    userIds.forEach((id) => {
      const chat = chats[id];
      const lastMsg =
        chat.messages.length > 0
          ? chat.messages[chat.messages.length - 1].text
          : "";
      renderContactItem(id, chat.name, chat.avatar, lastMsg);
    });
  }
}

// Funciones auxiliares
function renderContactItem(id, name, avatar, lastMsg) {
  const item = document.createElement("div");
  item.className = `list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 ${currentUserId === id ? "active" : ""}`;
  item.dataset.id = id;
  item.style.cursor = "pointer";
  const img = document.createElement("img");
  img.src = avatar;
  img.className = "rounded-circle object-fit-cover";
  img.width = 50;
  img.height = 50;

  const div = document.createElement("div");
  div.className = "flex-grow-1 overflow-hidden";

  const headerDiv = document.createElement("div");
  headerDiv.className = "d-flex justify-content-between align-items-baseline";
  const h6 = document.createElement("h6");
  h6.className = "mb-0 fw-bold";
  h6.textContent = name;
  headerDiv.appendChild(h6);

  const p = document.createElement("p");
  p.className = "mb-0 small text-muted text-truncate";
  p.textContent = lastMsg;

  div.appendChild(headerDiv);
  div.appendChild(p);

  item.appendChild(img);
  item.appendChild(div);
  
  // Evento asignado dinámicamente
  item.addEventListener("click", () => openChat(id, name, avatar));
  
  contactsList.appendChild(item);
}

function appendMessage(text, type, animate = true) {
  const msgDiv = document.createElement("div");
  const baseClasses =
    "p-2 px-3 mb-2 rounded-4 shadow-sm w-75 position-relative";
  const typeClasses =
    type === "sent"
      ? "bg-success text-white align-self-end ms-auto"
      : "bg-body-secondary text-body-emphasis align-self-start border border-light-subtle";

  msgDiv.className = `${baseClasses} ${typeClasses}`;
  if (!animate) msgDiv.style.animation = "none";
  msgDiv.innerText = text;

  if (pageTypingIndicator.parentNode === pageChatMessages) {
    pageChatMessages.insertBefore(msgDiv, pageTypingIndicator);
  } else {
    pageChatMessages.appendChild(msgDiv);
  }
  pageChatMessages.scrollTop = pageChatMessages.scrollHeight;
}

// Funciones principales
async function loadMessages() {
  if (!currentUserId) return;

  try {
    if (!isBackendOnline) throw new Error("Fallback mode");

    const response = await fetch(`${API_BASE}/mensajes/${currentUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Fetch failed");

    const mensajes = await response.json();

    // Si no hay mensajes nuevos comparado con la longitud anterior, no redibujar todo
    if (chatHistory.length === mensajes.length) return;

    chatHistory = mensajes;
    renderMessages(
      chatHistory.map((m) => ({
        text: m.texto,
        type: m.emisor === myId ? "sent" : "received",
      })),
    );
  } catch (error) {
    // Fallback: local
    const chat = ChatManager.getChatHistory(currentUserId);
    if (chatHistory.length !== chat.messages.length) {
      chatHistory = chat.messages;
      renderMessages(
        chatHistory.map((m) => ({
          text: m.text,
          type: m.sender,
        })),
      );
    }
  }
}

// Funciones auxiliares
function renderMessages(messages) {
  pageChatMessages.textContent = "";
  pageChatMessages.appendChild(pageTypingIndicator);
  messages.forEach((msg) => {
    appendMessage(msg.text, msg.type, false);
  });
}

// Funciones principales
function openChat(id, name, avatar) {
  currentUserId = id;
  emptyStateContainer.classList.add("d-none");
  activeChatContainer.classList.remove("d-none");

  activeChatName.innerText = name;
  activeChatAvatar.src = avatar;

  // Highlight contact
  document
    .querySelectorAll(".list-group-item")
    .forEach((el) => el.classList.remove("active"));
  const activeEl = document.querySelector(`.list-group-item[data-id="${id}"]`);
  if (activeEl) activeEl.classList.add("active");

  // Limpiar mensajes y cargar iniciales
  chatHistory = [];
  pageChatMessages.textContent = "";
  pageChatMessages.appendChild(pageTypingIndicator);
  loadMessages();

  // Iniciar polling
  if (pollingInterval) clearInterval(pollingInterval);
  pollingInterval = setInterval(loadMessages, 3000);
}

// Eventos
pageChatForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const text = pageChatInput.value.trim();
  if (text && currentUserId) {
    const targetName = activeChatName.innerText;
    const targetAvatarSrc = activeChatAvatar.src;

    // Optimistic append
    appendMessage(text, "sent");
    pageChatInput.value = "";

    try {
      if (!isBackendOnline) throw new Error("Fallback mode");

      const response = await fetch(`${API_BASE}/mensajes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receptorId: currentUserId, texto: text }),
      });

      if (!response.ok) throw new Error("Send failed");

      // Refrescar mensajes
      loadMessages();
    } catch (error) {
      // Fallback: usar ChatManager
      ChatManager.addMessage(
        currentUserId,
        targetName,
        targetAvatarSrc,
        text,
        "sent",
      );
      loadContacts();

      // Simular respuesta local solo en modo fallback
      setTimeout(() => {
        pageTypingIndicator.classList.remove("d-none");
        pageTypingIndicator.classList.add("d-flex");
        pageChatMessages.scrollTop = pageChatMessages.scrollHeight;

        setTimeout(
          () => {
            pageTypingIndicator.classList.add("d-none");
            pageTypingIndicator.classList.remove("d-flex");
            const reply = ChatManager.generateReply(text);
            ChatManager.addMessage(
              currentUserId,
              targetName,
              targetAvatarSrc,
              reply,
              "received",
            );
            loadMessages();
            loadContacts();
          },
          1500 + Math.random() * 1500,
        );
      }, 1000);
    }
  }
});

document.querySelectorAll(".btn-logout-profile").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "index.html";
  });
});

// Inicialización
loadContacts();
