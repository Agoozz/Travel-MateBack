/**
 * Carga de perfiles reales desde la API (o mock local).
 * Se ejecuta antes que dashboard.js
 */

// Inicialización
(async function cargarPerfiles() {
  // Estado
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "iniciar_sesion.html";
    return;
  }

  // Selectores del DOM
  const cardsContainer = document.querySelector(".row .col-12");
  if (!cardsContainer) return;

  // Configuración
  const ESTILO_LABEL = {
    mochilero: "Mochilero",
    confort: "Confort",
    social: "Social",
    cultural: "Cultural",
  };
  const PRESUPUESTO_LABEL = {
    economico: "USD 500-900",
    medio: "USD 900-1500",
    premium: "USD 1500+",
  };
  const TIPO_LABEL = {
    mochilero: "Aventurero Mochilero",
    confort: "Viajero Confort",
    social: "Viajero Social",
    cultural: "Explorador Cultural",
  };

  // Funciones auxiliares
  function formatearFecha(fechaStr) {
    if (!fechaStr) return "";
    const [y, m, d] = fechaStr.split("-");
    const meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    return `${d} ${meses[parseInt(m, 10) - 1]}`;
  }

  // Funciones principales
  function renderProfiles(perfilesList) {
    window.companionProfilesData = {};
    cardsContainer.textContent = "";

    perfilesList.forEach((p) => {
      const key = p._id;

      window.companionProfilesData[key] = {
        name: p.nombre,
        age: p.edad,
        location: p.ubicacion,
        type: TIPO_LABEL[p.estiloViaje] || "Viajero",
        about: p.bio,
        destination: p.destino,
        dates: `${formatearFecha(p.fechaInicio)} - ${formatearFecha(p.fechaFin)}`,
        budget: PRESUPUESTO_LABEL[p.presupuesto] || "",
        style: ESTILO_LABEL[p.estiloViaje] || "",
        interests: p.intereses || [],
        languages: (p.idiomas || []).join(", "),
        avatar: p.avatar,
      };

      const template = document.getElementById("companion-card-template");
      if (template) {
        const clone = template.content.cloneNode(true);
        const cardNode = clone.querySelector(".companion-item");

        clone.querySelector(".avatar-img").src = p.avatar;
        clone.querySelector(".avatar-img").alt = p.nombre;

        const afinidadBadge = clone.querySelector(".afinidad-badge");
        if (p.afinidad !== undefined) {
          afinidadBadge.textContent = `${p.afinidad}% Afinidad`;
        } else {
          afinidadBadge.style.display = "none";
        }

        clone.querySelector(".name-age").textContent = `${p.nombre} · ${p.edad}`;
        clone.querySelector(".type-text").textContent =
          TIPO_LABEL[p.estiloViaje] || "Viajero";
        clone.querySelector(".location-text").textContent = p.ubicacion;
        clone.querySelector(".destination-text").textContent = p.destino;
        clone.querySelector(".style-text").textContent =
          ESTILO_LABEL[p.estiloViaje] || "";
        clone.querySelector(".budget-text").textContent =
          PRESUPUESTO_LABEL[p.presupuesto] || "";
        clone.querySelector(".bio-text").textContent = p.bio;

        clone.querySelector(".btn-view-profile").dataset.user = key;
        clone.querySelector(".btn-invitar").dataset.user = key;

        cardsContainer.appendChild(clone);
      }
    });

    const paginationDiv = document.createElement("div");
    paginationDiv.className =
      "d-flex justify-content-center mt-4 mb-5 pagination-container";

    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Page navigation");

    const ul = document.createElement("ul");
    ul.className = "pagination pagination-sm";
    ul.id = "companionsPagination";

    nav.appendChild(ul);
    paginationDiv.appendChild(nav);
    cardsContainer.appendChild(paginationDiv);
  }

  // Inicialización (Lógica de red)
  try {
    const response = await fetch(API_BASE + "/perfiles", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      localStorage.clear();
      window.location.href = "iniciar_sesion.html";
      return;
    }

    const data = await response.json();
    const perfiles = data.perfiles || [];

    renderProfiles(perfiles);
    document.dispatchEvent(new CustomEvent("perfilesListos"));
  } catch (err) {
    console.error("Error de conexión:", err);
    window.isBackendOffline = true;
    
    // Optional: display error message directly on the cards container
    cardsContainer.innerHTML = '<div class="alert alert-danger text-center w-100">Servidor apagado. No se pudieron cargar los perfiles.</div>';
  }
})();
