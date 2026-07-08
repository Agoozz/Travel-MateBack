// ============================================================
//  js/auth.js — Login/Register conectado a Express + MongoDB
//  Mate & Travel
// ============================================================

const API = "/api/usuarios";

// ─── UI: mostrar/ocultar contraseña ─────────────────────────
window.togglePasswordVisibility = function(fieldId, btn) {
  const field = document.getElementById(fieldId);
  const icon  = btn.querySelector("i");
  if (field.type === "password") {
    field.type = "text";
    icon.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
  } else {
    field.type = "password";
    icon.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
  }
};

// ─── UI: alternar formulario login/register ──────────────────
window.toggleAuthMode = function(mode) {
  const loginForm      = document.getElementById("loginForm");
  const registerForm   = document.getElementById("registerForm");
  const authTitle      = document.getElementById("authTitle");
  const authSubtitle   = document.getElementById("authSubtitle");
  const authToggleText = document.getElementById("authToggleText");

  if (mode === "register") {
    loginForm.classList.add("d-none");
    registerForm.classList.remove("d-none");
    authTitle.innerText    = "Registrarse";
    authSubtitle.innerText = "Creá tu cuenta gratis para guardar tu perfil.";
    authToggleText.innerHTML = '¿Ya tenés una cuenta? <a href="#" class="text-success text-decoration-none fw-bold" onclick="toggleAuthMode(\'login\')">Ingresá acá</a>';
  } else {
    loginForm.classList.remove("d-none");
    registerForm.classList.add("d-none");
    authTitle.innerText    = "Iniciar Sesión";
    authSubtitle.innerText = "Ingresá tus datos para continuar tu aventura.";
    authToggleText.innerHTML = '¿No tenés una cuenta? <a href="#" class="text-success text-decoration-none fw-bold" onclick="toggleAuthMode(\'register\')">Registrate acá</a>';
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
  localStorage.setItem("token",                token);
  localStorage.setItem("user_id",              usuario._id);
  localStorage.setItem("user_name",            usuario.nombre          || "");
  localStorage.setItem("user_age",             usuario.edad            || 26);
  localStorage.setItem("user_hometown",        usuario.ubicacion       || "");
  localStorage.setItem("user_bio",             usuario.bio             || "");
  localStorage.setItem("user_avatar",          usuario.avatar          || "");
  localStorage.setItem("user_travel_style",    usuario.estiloViaje     || "mochilero");
  localStorage.setItem("user_travel_style_key",usuario.estiloViaje     || "mochilero");
  localStorage.setItem("user_budget",          usuario.presupuesto     || "economico");
  localStorage.setItem("user_companion_style", usuario.estiloCompanero || "aventura");
  localStorage.setItem("user_regions",         JSON.stringify(usuario.regiones || []));
  localStorage.setItem("user_destination",     usuario.destino         || "");
  localStorage.setItem("user_start_date",      usuario.fechaInicio     || "");
  localStorage.setItem("user_end_date",        usuario.fechaFin        || "");
  localStorage.setItem("user_interests",       (usuario.intereses || []).join(", "));
  localStorage.setItem("user_languages",       (usuario.idiomas   || []).join(", "));
  localStorage.setItem("user_profile_progress",usuario.progresoPerfil  || 45);
}

// ─── Pantalla de éxito + redirect ────────────────────────────
function showSuccessAndRedirect() {
  document.body.innerHTML = `
    <div class="container-fluid min-vh-100 p-0 d-flex align-items-center justify-content-center bg-light">
      <div class="card p-5 border-0 shadow-lg text-center rounded-4 col-xl-4 col-lg-5 col-md-8 mx-auto">
        <div class="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center mx-auto mb-3 step-circle">
          <i class="bi bi-check-circle-fill fs-1"></i>
        </div>
        <h4 class="fw-bold text-dark mb-2">¡Acceso exitoso!</h4>
        <p class="text-secondary small mb-4">Te estamos redirigiendo...</p>
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
    </div>`;
  setTimeout(() => { window.location.href = "inicio.html"; }, 1500);
}

// ─── Submit principal ────────────────────────────────────────
window.handleAuthSubmit = async function(event, type) {
  event.preventDefault();
  clearError();

  const form          = event.target;
  const emailInput    = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const email         = emailInput    ? emailInput.value.trim() : "";
  const password      = passwordInput ? passwordInput.value     : "";

  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = "Cargando..."; }

  try {
    let endpoint, body;

    if (type === "login") {
      endpoint = `${API}/login`;
      body     = { email, password };
    } else {
      const nameInput = form.querySelector('input[placeholder="Ej: Sofía Rodríguez"]');
      const nombre    = nameInput ? nameInput.value.trim() : "";
      if (!nombre) { showError("El nombre es obligatorio."); return; }
      endpoint = `${API}/register`;
      body     = { nombre, email, password };
    }

    const response = await fetch(endpoint, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
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
    showError("No se pudo conectar al servidor. ¿Está corriendo Node?");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = type === "login" ? "Ingresar" : "Registrarse";
    }
    console.error(err);
  }
};

// ─── Logout ──────────────────────────────────────────────────
window.handleLogout = function(e) {
  if (e) e.preventDefault();
  localStorage.clear();
  window.location.href = "../index.html";
};

// ─── Autofill credenciales de prueba ─────────────────────────
window.autofillMockCredentials = function() {
  const emailField    = document.getElementById("loginEmail");
  const passwordField = document.getElementById("loginPassword");
  if (emailField && passwordField) {
    emailField.value    = "tomas@mate.com";
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
(function() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("mode") === "register") toggleAuthMode("register");
})();
