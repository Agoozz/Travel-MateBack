/**
 * Manejo del tema oscuro/claro y persistencia.
 */

// Inicialización
(function () {
  // Estado
  const savedTheme = localStorage.getItem("theme") || "light";
  
  // Funciones principales
  function updateToggleButtons(theme) {
    const toggles = document.querySelectorAll(".theme-toggle");
    toggles.forEach((toggle) => {
      const icon = toggle.querySelector("i");
      if (icon) {
        if (theme === "dark") {
          icon.className = "bi bi-sun-fill text-warning";
        } else {
          icon.className = "bi bi-moon-fill text-secondary";
        }
      }
      const textSpan = toggle.querySelector(".theme-toggle-text");
      if (textSpan) {
        textSpan.textContent = theme === "dark" ? "Modo Claro" : "Modo Oscuro";
      }
    });
  }

  // Se asigna a window para que sea invocable globalmente si fuera necesario
  window.toggleTheme = function () {
    const currentTheme = document.documentElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateToggleButtons(newTheme);
  };

  // Eventos
  document.addEventListener("DOMContentLoaded", () => {
    const currentTheme = document.documentElement.getAttribute("data-bs-theme") || "light";
    updateToggleButtons(currentTheme);

    const toggles = document.querySelectorAll(".theme-toggle");
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        window.toggleTheme();
      });
    });
  });

  // Ejecución inmediata inicial
  document.documentElement.setAttribute("data-bs-theme", savedTheme);
})();
