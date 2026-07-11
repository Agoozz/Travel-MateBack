/**
 * Lógica principal del Dashboard y manejo de compañeros de viaje.
 */

// Inicialización de seguridad
(function checkAuth() {
  if (!localStorage.getItem("user_name")) {
    document.body.style.display = "none";
    window.location.replace("../index.html");
  }
  window.addEventListener("pageshow", function (event) {
    if (!localStorage.getItem("user_name")) {
      document.body.style.display = "none";
      window.location.replace("../index.html");
    }
  });
})();

// Inicialización principal
(function () {
  // Estado
  const userName = localStorage.getItem("user_name");
  const profileProgress = localStorage.getItem("user_profile_progress");
  const travelStyle = localStorage.getItem("user_travel_style");

  // Selectores del DOM (Globales a este bloque)
  const subtitleEl = document.getElementById("welcomeSubtitle");
  const progressLine = document.getElementById("sidebarProgressBar");
  const progressTitle = document.getElementById("sidebarProgressTitle");
  const progressDesc = document.getElementById("sidebarProgressDesc");

  // Funciones principales
  if (subtitleEl && userName) {
    subtitleEl.textContent = "Hola, ";
    const strong = document.createElement("strong");
    strong.textContent = userName;
    subtitleEl.appendChild(strong);
    
    const textNode = document.createTextNode(
      travelStyle 
        ? ` (${travelStyle}). Explorá perfiles compatibles con tu estilo de viaje.`
        : `. Explorá perfiles compatibles con tu estilo de viaje.`
    );
    subtitleEl.appendChild(textNode);
  }

  if (progressLine) {
    const progressVal = parseInt(profileProgress) || 0;
    progressLine.style.width = `${progressVal}%`;

    if (progressTitle) {
      if (progressVal >= 100) {
        progressTitle.innerText = "¡Perfil completo! 🧉";
        if (progressDesc)
          progressDesc.innerText =
            "Tu perfil está listo para conectar al 100%.";
      } else if (progressVal > 0) {
        progressTitle.innerText = `Perfil al ${progressVal}%`;
        if (progressDesc)
          progressDesc.innerText =
            "Completalo para obtener mejores afinidades.";
      }
    }
  }

  // Eventos
  document.addEventListener("perfilesListos", function () {
    // Configuración y Estado interno del evento
    const companionProfiles = window.companionProfilesData || {};
    const companionModal = document.getElementById("companionProfileModal");
    const bsCompanionModal = companionModal
      ? new bootstrap.Modal(companionModal)
      : null;

    let companionItems = Array.from(
      document.querySelectorAll(".companion-item"),
    );
    let activeItems = [...companionItems];
    const itemsPerPage = 3;
    let totalPages = Math.ceil(activeItems.length / itemsPerPage);
    let currentPage = 1;

    // Funciones principales (Modal y Paginación)
    function openCompanionModal(profileKey) {
      const profile = companionProfiles[profileKey];
      if (!profile) return;
      window.currentModalUserId = profileKey;

      const modalInviteBtn = document.querySelector(
        "#companionProfileModal .btn-invitar",
      );
      if (modalInviteBtn) {
        modalInviteBtn.dataset.user = profileKey;
        modalInviteBtn.dataset.inviteBound = "";
      }
      const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
      };

      setText("modalCompanionName", `${profile.name} · ${profile.age}`);
      setText("modalCompanionLocation", profile.location);
      setText("modalCompanionType", profile.type);
      setText("modalCompanionAbout", profile.about);
      setText("modalCompanionDestination", profile.destination);
      setText("modalCompanionDates", profile.dates);
      setText("modalCompanionBudget", profile.budget);
      setText("modalCompanionStyle", profile.style);
      setText("modalCompanionLanguages", profile.languages);

      const avatarEl = document.getElementById("modalCompanionAvatar");
      if (avatarEl) avatarEl.src = profile.avatar;

      const tagsContainer = document.getElementById("modalCompanionTags");
      if (tagsContainer) {
        tagsContainer.textContent = "";
        const createTag = (text, icon) => {
          const span = document.createElement("span");
          span.className =
            "badge bg-light text-secondary border border-secondary-subtle py-2 px-3 small";
          
          const iconEl = document.createElement("i");
          iconEl.className = `bi ${icon} text-success me-1`;
          
          span.appendChild(iconEl);
          span.appendChild(document.createTextNode(text));
          return span;
        };
        tagsContainer.appendChild(
          createTag(profile.destination, "bi-map-fill"),
        );
        tagsContainer.appendChild(createTag(profile.style, "bi-backpack-fill"));
        tagsContainer.appendChild(createTag(profile.budget, "bi-cash-stack"));
      }

      const interestsContainer = document.getElementById(
        "modalCompanionInterests",
      );
      if (interestsContainer) {
        interestsContainer.textContent = "";
        profile.interests.forEach((item) => {
          const span = document.createElement("span");
          span.className =
            "badge bg-success bg-opacity-10 text-success rounded-pill py-2 px-3 small";
          span.innerText = item;
          interestsContainer.appendChild(span);
        });
      }

      if (bsCompanionModal) {
        bsCompanionModal.show();
      }
    }

    function removeCompanionByName(name) {
      const itemToRemove = companionItems.find((item) => {
        const h4 = item.querySelector("h4");
        return h4 && h4.innerText.split("·")[0].trim() === name;
      });

      if (itemToRemove) {
        itemToRemove.remove();

        companionItems = companionItems.filter((item) => item !== itemToRemove);
        activeItems = activeItems.filter((item) => item !== itemToRemove);

        totalPages = Math.ceil(activeItems.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
          currentPage = totalPages;
        } else if (totalPages === 0) {
          currentPage = 1;
        }
        renderCompanions();
      }
    }

    function renderCompanions() {
      companionItems.forEach((item) => item.classList.add("d-none"));

      const start = (currentPage - 1) * itemsPerPage;
      const end = currentPage * itemsPerPage;
      const pageItems = activeItems.slice(start, end);

      pageItems.forEach((item) => item.classList.remove("d-none"));

      const paginationContainer = document.getElementById(
        "companionsPagination",
      );
      if (!paginationContainer) return;

      paginationContainer.textContent = "";
      
      const prevBtn = document.createElement("li");
      prevBtn.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
      prevBtn.id = "prevPageBtn";
      const prevLink = document.createElement("button");
      prevLink.className = "page-link border-success text-success fw-semibold shadow-none";
      prevLink.textContent = "Anterior";
      prevBtn.appendChild(prevLink);
      paginationContainer.appendChild(prevBtn);
      
      if (totalPages === 0) {
        const noRes = document.createElement("li");
        noRes.className = "page-item disabled";
        const noResBtn = document.createElement("button");
        noResBtn.className = "page-link border-success text-muted shadow-none";
        noResBtn.textContent = "Sin resultados";
        noRes.appendChild(noResBtn);
        paginationContainer.appendChild(noRes);
      } else {
        for (let i = 1; i <= totalPages; i++) {
          const isActive = i === currentPage;
          const li = document.createElement("li");
          li.className = `page-item ${isActive ? "active" : ""}`;
          li.dataset.page = i;
          const btn = document.createElement("button");
          btn.className = `page-link border-success ${isActive ? "bg-success text-white" : "text-success"} shadow-none`;
          btn.textContent = i;
          li.appendChild(btn);
          paginationContainer.appendChild(li);
        }
      }
      
      const nextBtn = document.createElement("li");
      nextBtn.className = `page-item ${currentPage === totalPages || totalPages === 0 ? "disabled" : ""}`;
      nextBtn.id = "nextPageBtn";
      const nextLink = document.createElement("button");
      nextLink.className = "page-link border-success text-success fw-semibold shadow-none";
      nextLink.textContent = "Siguiente";
      nextBtn.appendChild(nextLink);
      paginationContainer.appendChild(nextBtn);

      // Eventos dinámicos de paginación
      paginationContainer
        .querySelectorAll(".page-item[data-page]")
        .forEach((li) => {
          li.addEventListener("click", function (e) {
            e.preventDefault();
            currentPage = parseInt(this.getAttribute("data-page"));
            renderCompanions();
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
        });

      const prevBtnEl = document.getElementById("prevPageBtn");
      if (prevBtnEl && currentPage > 1) {
        prevBtnEl.addEventListener("click", function (e) {
          e.preventDefault();
          currentPage--;
          renderCompanions();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }

      const nextBtnEl = document.getElementById("nextPageBtn");
      if (nextBtnEl && currentPage < totalPages) {
        nextBtnEl.addEventListener("click", function (e) {
          e.preventDefault();
          currentPage++;
          renderCompanions();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    }

    // Inicialización del evento
    if (companionItems.length > 0) {
      renderCompanions();
    }

    document.querySelectorAll(".btn-view-profile").forEach((btn) => {
      btn.addEventListener("click", function () {
        openCompanionModal(this.dataset.user);
      });
    });


    // Selectores del DOM (Búsqueda)
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const btnClearSearch = document.getElementById("btnClearSearch");

    // Funciones principales (Búsqueda)
    function executeSearch() {
      if (!searchInput) return;
      const query = searchInput.value.toLowerCase().trim();

      if (query === "") {
        activeItems = [...companionItems];
      } else {
        activeItems = companionItems.filter((item) => {
          const textContent = item.innerText.toLowerCase();
          return textContent.includes(query);
        });
      }

      currentPage = 1;
      totalPages = Math.ceil(activeItems.length / itemsPerPage);
      renderCompanions();
    }

    // Eventos (Búsqueda)
    if (searchBtn) {
      searchBtn.addEventListener("click", executeSearch);
    }

    if (btnClearSearch) {
      btnClearSearch.addEventListener("click", function () {
        if (searchInput) searchInput.value = "";
        if (searchBtn) searchBtn.click();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          executeSearch();
        }
      });
    }

    document.querySelectorAll(".quick-filter").forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        if (searchInput && searchBtn) {
          searchInput.value = this.getAttribute("data-filter");
          executeSearch();
        }
      });
    });

    // ==========================================
    // MATCH & CHAT SIMULATION LOGIC
    // ==========================================
    
    // Selectores del DOM (Chat y Match)
    const matchOverlay = document.getElementById("matchOverlay");
    const matchTargetAvatar = document.getElementById("matchTargetAvatar");
    const matchSubtitle = document.getElementById("matchSubtitle");
    const chatOffcanvasEl = document.getElementById("chatOffcanvas");
    let chatOffcanvas;
    let overlayChatPolling = null;
    const chatMessages = document.getElementById("chatMessages");
    const chatTypingIndicator = document.getElementById("chatTypingIndicator");
    const chatName = document.getElementById("chatName");
    const chatAvatar = document.getElementById("chatAvatar");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    
    // Estado (Chat)
    let currentChatUserId = null;

    // Funciones principales (Chat)
    async function fetchAndRenderOverlayChat() {
      if (!currentChatUserId || !chatMessages) return;
      const token = localStorage.getItem("token");
      if (!token || token.startsWith("offline-") || window.isBackendOffline) return;

      try {
        const res = await fetch(`${API_BASE}/mensajes/${currentChatUserId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        
        Array.from(chatMessages.children).forEach((child) => {
          if (!child.classList.contains("typing-indicator")) {
            child.remove();
          }
        });

        const currentUserId = localStorage.getItem("user_id");

        data.forEach((msg) => {
           const type = msg.emisor === currentUserId ? "sent" : "received";
           appendMessage(msg.texto, type, false);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } catch(e) {
          window.isBackendOffline = true;
        }
    }

    function loadChatHistory(userId) {
      if (!chatMessages) return;

      Array.from(chatMessages.children).forEach((child) => {
        if (!child.classList.contains("typing-indicator")) {
          child.remove();
        }
      });

      const history = ChatManager.getChatHistory(userId);
      if (history && history.messages.length > 0) {
        history.messages.forEach((msg) => {
          appendMessage(msg.text, msg.sender, false);
        });
      }

      chatMessages.scrollTop = chatMessages.scrollHeight;
      return history && history.messages.length > 0;
    }

    function simulateMatchAndChat(targetId, targetName, targetAvatarSrc) {
      currentChatUserId = targetId;

      const matchUserAvatar = document.getElementById("matchUserAvatar");
      const userAvatarSrc =
        localStorage.getItem("user_avatar") ||
        "https://i.pravatar.cc/150?img=60";
      if (matchUserAvatar) matchUserAvatar.src = userAvatarSrc;

      if (matchTargetAvatar) matchTargetAvatar.src = targetAvatarSrc;
      if (matchSubtitle) matchSubtitle.classList.add("d-none");

      const matchModalEl = document.getElementById("matchModal");
      let bsMatchModal = null;
      if (matchModalEl) {
        bsMatchModal = new bootstrap.Modal(matchModalEl);
        bsMatchModal.show();
        setTimeout(() => {
          if (matchSubtitle) matchSubtitle.classList.remove("d-none");
        }, 800);
      }

      if (chatName) chatName.innerText = targetName;
      if (chatAvatar) chatAvatar.src = targetAvatarSrc;

      const hasHistory = loadChatHistory(targetId);

      setTimeout(() => {
        if (bsMatchModal) bsMatchModal.hide();

        if (typeof bsCompanionModal !== "undefined" && bsCompanionModal) {
          bsCompanionModal.hide();
        }

        setTimeout(() => {
          if (chatOffcanvas) chatOffcanvas.show();

          if (!hasHistory) {
            setTimeout(() => {
              if (chatTypingIndicator)
                chatTypingIndicator.classList.add("active");
              if (chatMessages)
                chatMessages.scrollTop = chatMessages.scrollHeight;

              const token = localStorage.getItem("token") || "";
              if (window.isBackendOffline || token.startsWith("offline-")) {
                setTimeout(() => {
                  if (chatTypingIndicator)
                    chatTypingIndicator.classList.remove("active");
                  const firstMsg = `¡Hola! Qué bueno coincidir 😊 ¿Tenés fechas pensadas para tu viaje? 🧉`;
                  ChatManager.addMessage(
                    targetId,
                    targetName,
                    targetAvatarSrc,
                    firstMsg,
                    "received",
                  );
                  appendMessage(firstMsg, "received");
                }, 2000);
              } else {
                if (chatTypingIndicator) chatTypingIndicator.classList.remove("active");
              }
            }, 800);
          }
        }, 300);
      }, 3000);
    }

    // Funciones auxiliares (Chat)
    function appendMessage(text, type, animate = true) {
      if (!chatMessages) return;
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

      if (chatTypingIndicator) {
        chatMessages.insertBefore(msgDiv, chatTypingIndicator);
      } else {
        chatMessages.appendChild(msgDiv);
      }
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Eventos (Chat y Match)
    if (chatOffcanvasEl) {
      chatOffcanvas = new bootstrap.Offcanvas(chatOffcanvasEl);
      
      chatOffcanvasEl.addEventListener('shown.bs.offcanvas', () => {
        const token = localStorage.getItem("token") || "";
        if (!token.startsWith("offline-")) {
          fetchAndRenderOverlayChat();
          if(overlayChatPolling) clearInterval(overlayChatPolling);
          overlayChatPolling = setInterval(fetchAndRenderOverlayChat, 3000);
        }
      });

      chatOffcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
        if(overlayChatPolling) clearInterval(overlayChatPolling);
      });
    }

    if (chatForm) {
      chatForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (text && currentChatUserId) {
          const targetName = chatName.innerText;
          const targetAvatarSrc = chatAvatar.src;

          ChatManager.addMessage(
            currentChatUserId,
            targetName,
            targetAvatarSrc,
            text,
            "sent",
          );
          appendMessage(text, "sent");
          chatInput.value = "";

          const token = localStorage.getItem("token");
          if (token && !token.startsWith("offline-") && !window.isBackendOffline) {
            fetch(API_BASE + "/mensajes", {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify({ receptorId: currentChatUserId, texto: text })
            }).catch(e => { window.isBackendOffline = true; });
          }

          if (window.isBackendOffline || (token && token.startsWith("offline-"))) {
            setTimeout(() => {
              if (chatTypingIndicator)
                chatTypingIndicator.classList.add("active");
              chatMessages.scrollTop = chatMessages.scrollHeight;

              setTimeout(
                () => {
                  if (chatTypingIndicator)
                    chatTypingIndicator.classList.remove("active");
                  const reply = ChatManager.generateReply(text);
                  ChatManager.addMessage(
                    currentChatUserId,
                    targetName,
                    targetAvatarSrc,
                    reply,
                    "received",
                  );
                  appendMessage(reply, "received");
                },
                1500 + Math.random() * 1500,
              );
            }, 1000);
          }
        }
      });
    }

    document.body.addEventListener("click", async function (e) {
      const btn = e.target.closest(".btn-invitar");
      if (!btn) return;
      e.preventDefault();
      
      if (btn.disabled) return;
      btn.disabled = true;

      const targetId = btn.dataset.user;
      const card = btn.closest(".companion-item");
      let targetName = "Viajero";
      let targetAvatarSrc = "https://i.pravatar.cc/150?img=11";

      if (card) {
        const nameEl = card.querySelector("h4");
        if (nameEl) targetName = nameEl.innerText.split("·")[0].trim();
        const imgEl = card.querySelector("img");
        if (imgEl) targetAvatarSrc = imgEl.src;
      }

      if (!targetId) {
        btn.disabled = false;
        return;
      }

      btn.textContent = " Enviando...";
      const spinner = document.createElement("span");
      spinner.className = "spinner-border spinner-border-sm";
      btn.prepend(spinner);

      const mateIcon = document.createElement("div");
      mateIcon.innerText = "🧉";
      mateIcon.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;font-size:2rem;pointer-events:none;z-index:9999;transition:all 1.2s cubic-bezier(0.34,1.56,0.64,1)`;
      document.body.appendChild(mateIcon);
      mateIcon.getBoundingClientRect();
      const moveX = window.innerWidth / 2 - e.clientX - 16;
      const moveY = window.innerHeight / 2 - e.clientY - 16;
      mateIcon.style.transform = `translate(${moveX}px,${moveY}px) scale(5) rotate(720deg)`;
      mateIcon.style.opacity = "0";
      setTimeout(() => mateIcon.remove(), 1200);

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_BASE}/matches/invitar/${targetId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();

        setTimeout(() => {
          btn.textContent = " Enviado";
          const checkIcon = document.createElement("i");
          checkIcon.className = "bi bi-check-circle-fill";
          btn.prepend(checkIcon);
          btn.classList.remove("btn-success");
          btn.classList.add("btn-secondary");

          if (data.hayMatch) {
            removeCompanionByName(targetName);
            simulateMatchAndChat(targetId, targetName, targetAvatarSrc);
          }
        }, 1200);
      } catch (err) {
        console.error("Error de conexión:", err);
        setTimeout(() => {
          btn.textContent = " Error";
          btn.classList.remove("btn-success");
          btn.classList.add("btn-danger");
        }, 1200);
      }
    });

    // Eventos (Scroll)
    const backToTopBtn = document.getElementById("btnBackToTop");
    if (backToTopBtn) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTopBtn.classList.remove("d-none");
          setTimeout(() => (backToTopBtn.style.opacity = "1"), 10);
        } else {
          backToTopBtn.style.opacity = "0";
          setTimeout(() => {
            if (window.scrollY <= 300) backToTopBtn.classList.add("d-none");
          }, 300);
        }
      });

      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }); // end perfilesListos listener

document.querySelectorAll(".btn-logout-profile").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../index.html";
  });
});
})();
