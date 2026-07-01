// ============================================================
//  js/perfiles.js — Carga perfiles reales desde la API
//  Se ejecuta ANTES que dashboard.js
//  Genera las tarjetas .companion-item con datos de MongoDB
//  y expone window.companionProfilesData para el modal
// ============================================================

(async function cargarPerfiles() {

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "iniciar_sesion.html";
    return;
  }

  const cardsContainer = document.querySelector(".row .col-12");
  if (!cardsContainer) return;

  // Mapas de texto legible para mostrar en las tarjetas
  const ESTILO_LABEL = {
    mochilero: "Mochilero",
    confort:   "Confort",
    social:    "Social",
    cultural:  "Cultural"
  };
  const PRESUPUESTO_LABEL = {
    economico: "USD 500-900",
    medio:     "USD 900-1500",
    premium:   "USD 1500+"
  };
  const TIPO_LABEL = {
    mochilero: "Aventurero Mochilero",
    confort:   "Viajero Confort",
    social:    "Viajero Social",
    cultural:  "Explorador Cultural"
  };

  function formatearFecha(fechaStr) {
    if (!fechaStr) return "";
    const [y, m, d] = fechaStr.split("-");
    const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    return `${d} ${meses[parseInt(m, 10) - 1]}`;
  }

  try {
    const response = await fetch("https://mate-travel-backend.onrender.com/api/perfiles", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.status === 401) {
      localStorage.clear();
      window.location.href = "iniciar_sesion.html";
      return;
    }

    const data = await response.json();
    const perfiles = data.perfiles || [];

    // Objeto global usado por dashboard.js para abrir el modal "Ver perfil"
    window.companionProfilesData = {};

    cardsContainer.innerHTML = "";

    perfiles.forEach((p) => {
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
        avatar: p.avatar
      };

      const card = document.createElement("div");
      card.className = "card rounded-4 shadow-sm border-0 mb-4 companion-item";
      card.innerHTML = `
        <div class="card-body p-0">
          <div class="row align-items-center">
            <div class="col-md-2 text-center mb-3 mb-md-0">
              <div class="companion-avatar-wrap mx-auto">
                <img src="${p.avatar}" alt="${p.nombre}">
              </div>
            </div>
            <div class="col-md-7">
              <div class="d-flex align-items-center gap-2 flex-wrap mb-2">
                <span class="badge rounded-pill bg-success bg-opacity-10 text-success border border-success border-opacity-10">${p.afinidad}% Afinidad</span>
                <h4 class="fw-bold mb-0 text-body-emphasis">${p.nombre} · ${p.edad}</h4>
              </div>
              <p class="text-body-secondary small mb-2 companion-type-badge"><i class="bi bi-flag-fill"></i> ${TIPO_LABEL[p.estiloViaje] || "Viajero"}</p>
              <p class="text-body-secondary small mb-2">
                <i class="bi bi-geo-alt-fill text-success"></i> ${p.ubicacion}
              </p>
              <div class="d-flex gap-2 flex-wrap mb-3">
                <span class="badge rounded-pill bg-body-tertiary text-body-secondary border border-secondary-subtle py-1 px-3 small"><i class="bi bi-map-fill text-success"></i> <span>${p.destino}</span></span>
                <span class="badge rounded-pill bg-body-tertiary text-body-secondary border border-secondary-subtle py-1 px-3 small"><i class="bi bi-backpack-fill text-success"></i> <span>${ESTILO_LABEL[p.estiloViaje] || ""}</span></span>
                <span class="badge rounded-pill bg-body-tertiary text-body-secondary border border-secondary-subtle py-1 px-3 small"><i class="bi bi-cash-stack"></i> <span>${PRESUPUESTO_LABEL[p.presupuesto] || ""}</span></span>
              </div>
              <p class="text-body-secondary small mb-0 lh-sm">
                ${p.bio}
              </p>
            </div>
            <div class="col-md-3 text-end mt-3 mt-md-0">
              <button type="button" class="btn btn-outline-success border-2 w-100 mb-2 rounded-pill fw-semibold py-2 btn-sm btn-view-profile" data-user="${key}">
                Ver perfil
              </button>
              <button class="btn btn-success bg-gradient text-white rounded-pill w-100 d-flex align-items-center justify-content-center gap-2 py-2 btn-sm btn-invitar" data-user="${key}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <line x1="13" y1="7" x2="18" y2="2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
                  <path d="M6 9c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v3c0 4.4-3.6 7-8 7s-8-2.6-8-7V9zm2 .5H16V12c0 3.3-2.7 5-6 5s-6-1.7-6-5V9.5z" fill-rule="evenodd"/>
                </svg>
                Invitar un mate
              </button>
            </div>
          </div>
        </div>`;
      cardsContainer.appendChild(card);
    });

    // Avisamos a dashboard.js que ya puede inicializarse
    document.dispatchEvent(new CustomEvent("perfilesListos"));

  } catch (err) {
    console.error("Error cargando perfiles:", err);
    cardsContainer.innerHTML = `<p class="text-danger">No se pudieron cargar los perfiles. ¿Está corriendo el servidor?</p>`;
  }

})();
