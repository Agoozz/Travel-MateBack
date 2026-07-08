function togglePasswordVisibility(fieldId, btn) {
    const field = document.getElementById(fieldId);
    const icon = btn.querySelector('i');
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    } else {
        field.type = 'password';
        icon.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    }
}

function toggleAuthMode(mode) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const authToggleText = document.getElementById('authToggleText');

    if (mode === 'register') {
        loginForm.classList.add('d-none');
        registerForm.classList.remove('d-none');
        authTitle.innerText = "Registrarse";
        authSubtitle.innerText = "Creá tu cuenta gratis para guardar tu perfil.";
        authToggleText.innerHTML = '¿Ya tenés una cuenta? <a href="#" class="text-success text-decoration-none fw-bold" onclick="toggleAuthMode(\'login\')">Ingresá acá</a>';
    } else {
        loginForm.classList.remove('d-none');
        registerForm.classList.add('d-none');
        authTitle.innerText = "Iniciar Sesión";
        authSubtitle.innerText = "Ingresá tus datos para continuar tu aventura.";
        authToggleText.innerHTML = '¿No tenés una cuenta? <a href="#" class="text-success text-decoration-none fw-bold" onclick="toggleAuthMode(\'register\')">Registrate acá</a>';
    }
}

window.handleAuthSubmit = function(event, type) {
    event.preventDefault();

    // Read test values before clearing or changing session
    const testStyle = localStorage.getItem('user_travel_style');
    const testStyleKey = localStorage.getItem('user_travel_style_key');
    const testBudget = localStorage.getItem('user_budget');
    const testCompanion = localStorage.getItem('user_companion_style');
    const testRegions = localStorage.getItem('user_regions');
    const testDestination = localStorage.getItem('user_destination');
    const testStart = localStorage.getItem('user_start_date');
    const testEnd = localStorage.getItem('user_end_date');

    // Clear previous user session data to keep simulator clean
    // But DON'T clear mateAndTravelChats so matches persist between users!
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('user_')) {
            localStorage.removeItem(key);
        }
    });
    localStorage.removeItem('sentMates');

    let emailInput, passwordInput;
    if (type === 'login') {
        emailInput = document.getElementById('fld_alfa') || document.getElementById('loginEmail');
        passwordInput = document.getElementById('fld_beta') || document.getElementById('loginPassword');
    } else {
        emailInput = event.target.querySelector('input[type="email"]');
        passwordInput = event.target.querySelector('input[type="password"]');
    }
    
    const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
    const password = passwordInput ? passwordInput.value : '';

    async function authenticate() {
        try {
            const url = type === 'login' ? 'http://localhost:3000/api/usuarios/login' : 'http://localhost:3000/api/usuarios/register';
            const bodyData = { email, password };
            
            if (type === 'register') {
                const nameInput = event.target.querySelector('input[placeholder="Ej: Sofía Rodríguez"]');
                bodyData.nombre = nameInput ? nameInput.value.trim() : 'Viajero Mate';
            }
            
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                alert(data.error || 'Error en la autenticación.');
                return;
            }
            
            // Store token and basic info
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('user_name', data.usuario.nombre);
            localStorage.setItem('user_email', data.usuario.email);
            localStorage.setItem('user_id', data.usuario._id);
            
            // Generate some random or default profile data if needed by other components
            localStorage.setItem('user_age', '26');
            localStorage.setItem('user_hometown', 'Buenos Aires, Argentina');
            localStorage.setItem('user_bio', '¡Listo para compartir mates y emprender nuevas rutas!');
            localStorage.setItem('user_avatar', 'https://i.pravatar.cc/150?img=12');
            localStorage.setItem('user_travel_style', testStyle || 'Aventurero Indómito');
            localStorage.setItem('user_travel_style_key', testStyleKey || 'mochilero');
            localStorage.setItem('user_budget', testBudget || 'economico');
            localStorage.setItem('user_companion_style', testCompanion || 'aventura');
            localStorage.setItem('user_destination', testDestination || 'Tailandia');
            localStorage.setItem('user_profile_progress', '100');
            
            showSuccessScreen();
        } catch (error) {
            console.error('Auth error:', error);
            alert('Error de conexión con el servidor.');
        }
    }
    
    authenticate();

    function showSuccessScreen() {
        const mainBody = document.body;
        mainBody.innerHTML = '';
        
        const container = document.createElement('div');
        container.className = 'container-fluid min-vh-100 p-0 d-flex align-items-center justify-content-center bg-light';
        
        const card = document.createElement('div');
        card.className = 'card p-5 border-0 shadow-lg text-center rounded-4 col-xl-4 col-lg-5 col-md-8 mx-auto';
        
        const circle = document.createElement('div');
        circle.className = 'rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center mx-auto mb-3 step-circle';
        const icon = document.createElement('i');
        icon.className = 'bi bi-check-circle-fill fs-1';
        circle.appendChild(icon);
        
        const h4 = document.createElement('h4');
        h4.className = 'fw-bold text-dark mb-2';
        h4.textContent = '¡Acceso exitoso!';
        
        const p = document.createElement('p');
        p.className = 'text-secondary small mb-4';
        p.textContent = 'Te estamos redirigiendo a la pantalla de exploración de compañeres...';
        
        const spinner = document.createElement('div');
        spinner.className = 'spinner-border text-success';
        spinner.setAttribute('role', 'status');
        const span = document.createElement('span');
        span.className = 'visually-hidden';
        span.textContent = 'Cargando...';
        spinner.appendChild(span);
        
        card.appendChild(circle);
        card.appendChild(h4);
        card.appendChild(p);
        card.appendChild(spinner);
        container.appendChild(card);
        mainBody.appendChild(container);
        
        setTimeout(() => {
            window.location.replace("inicio.html");
        }, 1500);
    }
}

// Global helper function to autofill the login fields
window.autofillMockCredentials = function() {
    const emailField = document.getElementById('loginEmail');
    const passwordField = document.getElementById('loginPassword');
    
    if (emailField && passwordField) {
        // Only autofill if the elements exist
        emailField.value = 'viajero@mate.com';
        passwordField.value = '123456'; // Update to a more likely valid password for registering or demo
        
        // Add a nice visual feedback (focus effect)
        emailField.classList.add('border-info');
        passwordField.classList.add('border-info');
        
        setTimeout(() => {
            emailField.classList.remove('border-info');
            passwordField.classList.remove('border-info');
        }, 1000);
    }
}

// Auto-configure view based on URL params (e.g. ?mode=register)
(function() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const profile = params.get('profile');
    
    if (profile) {
        const alertDiv = document.getElementById('profileAlert');
        const resultSpan = document.getElementById('profileResultName');
        if (resultSpan && alertDiv) {
            resultSpan.innerText = decodeURIComponent(profile);
            alertDiv.classList.remove('d-none');
        }
    }
    if (mode === 'register') {
        toggleAuthMode('register');
    }
})();

// Reload page if restored from bfcache (e.g. user pressed back button and sees spinner)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
