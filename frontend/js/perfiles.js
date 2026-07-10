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
        avatar: p.avatar
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
          afinidadBadge.style.display = 'none';
        }

        clone.querySelector(".name-age").textContent = `${p.nombre} · ${p.edad}`;
        clone.querySelector(".type-text").textContent = TIPO_LABEL[p.estiloViaje] || "Viajero";
        clone.querySelector(".location-text").textContent = p.ubicacion;
        clone.querySelector(".destination-text").textContent = p.destino;
        clone.querySelector(".style-text").textContent = ESTILO_LABEL[p.estiloViaje] || "";
        clone.querySelector(".budget-text").textContent = PRESUPUESTO_LABEL[p.presupuesto] || "";
        clone.querySelector(".bio-text").textContent = p.bio;

        clone.querySelector(".btn-view-profile").dataset.user = key;
        clone.querySelector(".btn-invitar").dataset.user = key;

        cardsContainer.appendChild(clone);
      }
    });

    const paginationDiv = document.createElement("div");
    paginationDiv.className = "d-flex justify-content-center mt-4 mb-5 pagination-container";
    
    // Instead of innerHTML for pagination structure, create it via DOM to be safe
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Page navigation");
    
    const ul = document.createElement("ul");
    ul.className = "pagination pagination-sm";
    ul.id = "companionsPagination";
    
    // We leave it empty for dashboard.js to fill, or just attach the UL
    nav.appendChild(ul);
    paginationDiv.appendChild(nav);
    cardsContainer.appendChild(paginationDiv);
  }

  try {
    const response = await fetch(API_BASE + "/perfiles", {
      headers: { Authorization: `Bearer ${token}` }
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
    console.warn("Backend offline. Usando perfiles mock.");
    const mockPerfiles = [
      { _id: "m1", nombre: "Nico", edad: 29, ubicacion: "Buenos Aires", estiloViaje: "mochilero", bio: "Viajero apasionado, me gusta explorar lugares poco conocidos.", destino: "Patagonia", fechaInicio: "2024-11-01", fechaFin: "2024-11-15", presupuesto: "economico", intereses: ["Trekking", "Fotografía"], idiomas: ["Español", "Inglés"], avatar: "https://randomuser.me/api/portraits/men/32.jpg", afinidad: 90 },
      { _id: "m2", nombre: "Sofía", edad: 25, ubicacion: "Córdoba", estiloViaje: "confort", bio: "Busco compañeros para un viaje relajado.", destino: "Mendoza", fechaInicio: "2024-12-05", fechaFin: "2024-12-20", presupuesto: "medio", intereses: ["Vino", "Montaña"], idiomas: ["Español"], avatar: "https://randomuser.me/api/portraits/women/44.jpg", afinidad: 85 },
      { _id: "m3", nombre: "Lucas", edad: 31, ubicacion: "Rosario", estiloViaje: "social", bio: "Me encanta conocer gente nueva y salir de fiesta.", destino: "Cataratas", fechaInicio: "2024-10-10", fechaFin: "2024-10-17", presupuesto: "economico", intereses: ["Fiesta", "Cultura"], idiomas: ["Español", "Portugués"], avatar: "https://randomuser.me/api/portraits/men/65.jpg", afinidad: 80 },
      { _id: "m4", nombre: "Valentina", edad: 27, ubicacion: "Mendoza", estiloViaje: "cultural", bio: "Disfruto los museos, la historia y la buena gastronomía.", destino: "Salta", fechaInicio: "2025-01-10", fechaFin: "2025-01-25", presupuesto: "medio", intereses: ["Historia", "Comida"], idiomas: ["Español", "Inglés", "Francés"], avatar: "https://randomuser.me/api/portraits/women/68.jpg", afinidad: 78 },
      { _id: "m5", nombre: "Martín", edad: 34, ubicacion: "Neuquén", estiloViaje: "mochilero", bio: "La vida es mejor en una carpa y con un fueguito.", destino: "Ushuaia", fechaInicio: "2024-11-20", fechaFin: "2024-12-10", presupuesto: "economico", intereses: ["Camping", "Naturaleza"], idiomas: ["Español"], avatar: "https://randomuser.me/api/portraits/men/22.jpg", afinidad: 75 },
      { _id: "m6", nombre: "Camila", edad: 23, ubicacion: "CABA", estiloViaje: "social", bio: "Organizo viajes grupales, ¡sumate a la aventura!", destino: "Bariloche", fechaInicio: "2024-08-15", fechaFin: "2024-08-30", presupuesto: "medio", intereses: ["Ski", "Fiesta"], idiomas: ["Español", "Inglés"], avatar: "https://randomuser.me/api/portraits/women/24.jpg", afinidad: 72 },
      { _id: "m7", nombre: "Joaquín", edad: 28, ubicacion: "La Plata", estiloViaje: "confort", bio: "Prefiero hoteles lindos y excursiones organizadas.", destino: "Iguazú", fechaInicio: "2024-09-01", fechaFin: "2024-09-08", presupuesto: "premium", intereses: ["Relax", "Fotografía"], idiomas: ["Español"], avatar: "https://randomuser.me/api/portraits/men/50.jpg", afinidad: 68 },
      { _id: "m8", nombre: "Agustina", edad: 26, ubicacion: "Mar del Plata", estiloViaje: "cultural", bio: "Mochilera de corazón, pero me adapto a todo.", destino: "Jujuy", fechaInicio: "2024-10-05", fechaFin: "2024-10-20", presupuesto: "economico", intereses: ["Cultura", "Artesanía"], idiomas: ["Español"], avatar: "https://randomuser.me/api/portraits/women/12.jpg", afinidad: 65 },
      { _id: "m9", nombre: "Facundo", edad: 30, ubicacion: "Tucumán", estiloViaje: "social", bio: "Siempre con el mate listo para compartir.", destino: "Córdoba", fechaInicio: "2024-11-05", fechaFin: "2024-11-12", presupuesto: "medio", intereses: ["Mate", "Asado"], idiomas: ["Español"], avatar: "https://randomuser.me/api/portraits/men/15.jpg", afinidad: 60 },
      { _id: "m10", nombre: "Lucía", edad: 29, ubicacion: "Santa Fe", estiloViaje: "confort", bio: "Escapada de fin de semana largo para desconectar.", destino: "Mendoza", fechaInicio: "2024-10-11", fechaFin: "2024-10-14", presupuesto: "premium", intereses: ["Spa", "Vino"], idiomas: ["Español"], avatar: "https://randomuser.me/api/portraits/women/33.jpg", afinidad: 55 }
    ];
    renderProfiles(mockPerfiles);
    document.dispatchEvent(new CustomEvent("perfilesListos"));
  }

})();
