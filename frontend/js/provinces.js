/**
 * Lógica para filtrado y pestañas de provincias/destinos.
 */

// Inicialización
(function () {
  // Selectores del DOM
  const searchInput = document.getElementById("searchProvince");
  const cards = document.querySelectorAll(".province-card");
  const tabButtons = document.querySelectorAll(".region-tab");
  
  // Estado
  let activeRegion = "destacados";

  // Funciones principales
  function updateVisibility() {
    const term = searchInput.value.toLowerCase().trim();
    const normalizedTerm = term
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (normalizedTerm !== "") {
      document.getElementById("regionTabs").classList.add("d-none");
      cards.forEach((card) => {
        const name = card.getAttribute("data-name").toLowerCase();
        const normalized = name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (normalized.includes(normalizedTerm)) {
          card.classList.remove("d-none");
        } else {
          card.classList.add("d-none");
        }
      });
    } else {
      document.getElementById("regionTabs").classList.remove("d-none");
      cards.forEach((card) => {
        const region = card.getAttribute("data-region");
        const isFeatured = card.getAttribute("data-featured") === "true";

        if (activeRegion === "destacados" && isFeatured) {
          card.classList.remove("d-none");
        } else if (activeRegion === region) {
          card.classList.remove("d-none");
        } else {
          card.classList.add("d-none");
        }
      });
    }
  }

  // Eventos
  if (searchInput) {
    searchInput.addEventListener("input", updateVisibility);
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      tabButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      activeRegion = this.getAttribute("data-target");
      updateVisibility();
    });
  });

  // Ejecución inmediata inicial
  if (searchInput && cards.length > 0) {
    updateVisibility();
  }
})();
