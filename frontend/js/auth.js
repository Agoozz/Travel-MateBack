// ============================================================
//  js/auth.js — Login/Register conectado a Express + MongoDB
//  Mate & Travel
// ============================================================

const API = API_BASE + "/usuarios";

// ─── UI: mostrar/ocultar contraseña ─────────────────────────
window.togglePasswordVisibility = function (fieldId, btn) {
  const field = document.getElementById(fieldId);
  const icon = btn.querySelector("i");
  if (field.type === "password") {
    field.type = "text";
    icon.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
  } else {
    field.type = "password";
    icon.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
  }
};

// ─── UI: alternar formulario login/register ──────────────────
window.toggleAuthMode = function (mode) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const authTitle = document.getElementById("authTitle");
  const authSubtitle = document.getElementById("authSubtitle");
  const authToggleText = document.getElementById("authToggleText");

  if (mode === "register") {
    loginForm.classList.add("d-none");
    registerForm.classList.remove("d-none");
    authTitle.innerText = "Registrarse";
    authSubtitle.innerText = "Creá tu cuenta gratis para guardar tu perfil.";
    authToggleText.textContent = "¿Ya tenés una cuenta? ";
    const link = document.createElement("a");
    link.href = "#";
    link.className = "text-success text-decoration-none fw-bold";
    link.onclick = (e) => { e.preventDefault(); toggleAuthMode('login'); };
    link.textContent = "Ingresá acá";
    authToggleText.appendChild(link);
  } else {
    loginForm.classList.remove("d-none");
    registerForm.classList.add("d-none");
    authTitle.innerText = "Iniciar Sesión";
    authSubtitle.innerText = "Ingresá tus datos para continuar tu aventura.";
    authToggleText.textContent = "¿No tenés una cuenta? ";
    const link = document.createElement("a");
    link.href = "#";
    link.className = "text-success text-decoration-none fw-bold";
    link.onclick = (e) => { e.preventDefault(); toggleAuthMode('register'); };
    link.textContent = "Registrate acá";
    authToggleText.appendChild(link);
  }
};

// ─── Mostrar error inline ────────────────────────────────────
function showError(msg) {
  let el = document.getElementById("authError");
  if (!el) {
    el = document.createElement("div");
    el.id = "authError";
    el.className = "alert alert-danger py-2 small mt-3 rounded-3";
    const form = document.querySelector(".card-body") || document.body;
    form.prepend(el);
  }
  el.innerText = msg;
  el.classList.remove("d-none");
}

function clearError() {
  const el = document.getElementById("authError");
  if (el) el.classList.add("d-none");
}

// ─── Guardar sesión en localStorage ─────────────────────────
function saveSession(token, usuario) {
  localStorage.setItem("token", token);
  localStorage.setItem("user_id", usuario._id);
  localStorage.setItem("user_name", usuario.nombre || "");
  localStorage.setItem("user_age", usuario.edad || 26);
  localStorage.setItem("user_hometown", usuario.ubicacion || "");
  localStorage.setItem("user_bio", usuario.bio || "");
  localStorage.setItem("user_avatar", usuario.avatar || "");
  localStorage.setItem("user_travel_style", usuario.estiloViaje || "mochilero");
  localStorage.setItem(
    "user_travel_style_key",
    usuario.estiloViaje || "mochilero",
  );
  localStorage.setItem("user_budget", usuario.presupuesto || "economico");
  localStorage.setItem(
    "user_companion_style",
    usuario.estiloCompanero || "aventura",
  );
  localStorage.setItem("user_regions", JSON.stringify(usuario.regiones || []));
  localStorage.setItem("user_destination", usuario.destino || "");
  localStorage.setItem("user_start_date", usuario.fechaInicio || "");
  localStorage.setItem("user_end_date", usuario.fechaFin || "");
  localStorage.setItem("user_interests", (usuario.intereses || []).join(", "));
  localStorage.setItem("user_languages", (usuario.idiomas || []).join(", "));
  localStorage.setItem("user_profile_progress", usuario.progresoPerfil || 45);
}

// ─── Pantalla de éxito + redirect ────────────────────────────
function showSuccessAndRedirect() {
  document.body.textContent = ""; // Clear body
  
  const container = document.createElement("div");
  container.className = "container-fluid min-vh-100 p-0 d-flex align-items-center justify-content-center bg-light";
  
  const card = document.createElement("div");
  card.className = "card p-5 border-0 shadow-lg text-center rounded-4 col-xl-4 col-lg-5 col-md-8 mx-auto";
  
  const circle = document.createElement("div");
  circle.className = "rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center mx-auto mb-3 step-circle";
  const icon = document.createElement("i");
  icon.className = "bi bi-check-circle-fill fs-1";
  circle.appendChild(icon);
  
  const h4 = document.createElement("h4");
  h4.className = "fw-bold text-dark mb-2";
  h4.textContent = "¡Acceso exitoso!";
  
  const p = document.createElement("p");
  p.className = "text-secondary small mb-4";
  p.textContent = "Te estamos redirigiendo...";
  
  const spinner = document.createElement("div");
  spinner.className = "spinner-border text-success";
  spinner.setAttribute("role", "status");
  const spinnerText = document.createElement("span");
  spinnerText.className = "visually-hidden";
  spinnerText.textContent = "Cargando...";
  spinner.appendChild(spinnerText);
  
  card.appendChild(circle);
  card.appendChild(h4);
  card.appendChild(p);
  card.appendChild(spinner);
  
  container.appendChild(card);
  document.body.appendChild(container);
  setTimeout(() => {
    window.location.href = "inicio.html";
  }, 1500);
}

// ─── Submit principal ────────────────────────────────────────
window.handleAuthSubmit = async function (event, type) {
  event.preventDefault();
  clearError();

  const form = event.target;
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Cargando...";
  }

  try {
    let endpoint, body;

    if (type === "login") {
      endpoint = `${API}/login`;
      body = { email, password };
    } else {
      const nameInput = form.querySelector(
        'input[placeholder="Ej: Sofía Rodríguez"]',
      );
      const nombre = nameInput ? nameInput.value.trim() : "";
      if (!nombre) {
        showError("El nombre es obligatorio.");
        return;
      }
      endpoint = `${API}/register`;
      body = { nombre, email, password };
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status >= 500) {
        throw new Error("Backend devolvió 500: Fallo de DB");
      }
      showError(data.error || "Ocurrió un error. Intentá de nuevo.");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = type === "login" ? "Ingresar" : "Registrarse";
      }
      return;
    }

    saveSession(data.token, data.usuario);
    showSuccessAndRedirect();
  } catch (err) {
    console.warn("Backend no detectado. Iniciando en modo local (Offline)...");

    // Diccionario de 10 usuarios offline
    const mockUsers = {
      "sofia@mate.com": {
        nombre: "Sofía",
        ubicacion: "Córdoba",
        estilo: "confort",
        bio: "Busco compañeros para un viaje relajado.",
      },
      "mateo@mate.com": {
        nombre: "Mateo",
        ubicacion: "Cafayate",
        estilo: "mochilero",
        bio: "¡Hola! Soy Mateo, probando el perfil completo en modo local.",
      },
      "martin@mate.com": {
        nombre: "Martín",
        ubicacion: "Neuquén",
        estilo: "mochilero",
        bio: "La vida es mejor en una carpa y con un fueguito.",
      },
      "nicolas@mate.com": {
        nombre: "Nicolás",
        ubicacion: "Buenos Aires",
        estilo: "social",
        bio: "Viajero apasionado, explorando lugares poco conocidos.",
      },
      "maria@mate.com": {
        nombre: "María",
        ubicacion: "Salta",
        estilo: "cultural",
        bio: "Disfruto los museos, la historia y la buena gastronomía.",
      },
      "juana@mate.com": {
        nombre: "Juana",
        ubicacion: "Mendoza",
        estilo: "social",
        bio: "Me encanta conocer gente nueva y salir de fiesta.",
      },
      "lucas@mate.com": {
        nombre: "Lucas",
        ubicacion: "Rosario",
        estilo: "aventura",
        bio: "Siempre con la mochila lista para el próximo destino.",
      },
      "camila@mate.com": {
        nombre: "Camila",
        ubicacion: "CABA",
        estilo: "confort",
        bio: "Organizo viajes grupales, ¡sumate a la aventura!",
      },
      "joaquin@mate.com": {
        nombre: "Joaquín",
        ubicacion: "La Plata",
        estilo: "confort",
        bio: "Prefiero hoteles lindos y excursiones organizadas.",
      },
      "lucia@mate.com": {
        nombre: "Lucía",
        ubicacion: "Santa Fe",
        estilo: "mochilero",
        bio: "Mochilera de corazón, escapadas de finde largo.",
      },
    };

    let mockNombre =
      type === "login"
        ? "Viajero Explorador"
        : form
            .querySelector('input[placeholder="Ej: Sofía Rodríguez"]')
            ?.value.trim() || "Nuevo Viajero";
    let mockBio = "";
    let mockUbicacion = "";
    let mockEstilo = "mochilero";

    if (type === "login") {
      if (mockUsers[email] && password === "mate1234") {
        const u = mockUsers[email];
        mockNombre = u.nombre;
        mockBio = u.bio;
        mockUbicacion = u.ubicacion;
        mockEstilo = u.estilo;
      } else if (mockUsers[email] && password !== "mate1234") {
        showError(
          "Contraseña incorrecta para el perfil de prueba (es mate1234).",
        );
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = "Ingresar";
        }
        return;
      }
    }

    const mockUser = {
      _id: "offline-" + Date.now(),
      nombre: mockNombre,
      email: email,
      edad: 26,
      ubicacion: mockUbicacion,
      estiloViaje: mockEstilo,
      progresoPerfil: mockNombre !== "Viajero Explorador" ? 85 : 45,
      bio: mockBio,
    };

    saveSession("offline-token-xyz", mockUser);
    showSuccessAndRedirect();
  }
};

// ─── Logout ──────────────────────────────────────────────────
window.handleLogout = function (e) {
  if (e) e.preventDefault();
  // Preserve chats
  const chatKeys = Object.keys(localStorage).filter((k) =>
    k.startsWith("mateAndTravelChats"),
  );
  const chatData = chatKeys.map((k) => ({
    key: k,
    val: localStorage.getItem(k),
  }));
  localStorage.clear();
  chatData.forEach((c) => localStorage.setItem(c.key, c.val));
  window.location.href = "index.html";
};

// ─── Autofill credenciales de prueba ─────────────────────────
window.autofillMockCredentials = function () {
  const emailField = document.getElementById("loginEmail");
  const passwordField = document.getElementById("loginPassword");
  if (emailField && passwordField) {
    emailField.value = "tomas@mate.com";
    passwordField.value = "mate1234";
    emailField.classList.add("border-info");
    passwordField.classList.add("border-info");
    setTimeout(() => {
      emailField.classList.remove("border-info");
      passwordField.classList.remove("border-info");
    }, 1000);
  }
};

// ─── Auto-configurar modo según URL ─────────────────────────
(function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get("mode") === "register") toggleAuthMode("register");
})();
