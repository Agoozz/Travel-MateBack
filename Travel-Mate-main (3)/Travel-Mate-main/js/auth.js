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

    if (type === 'login') {
        const validLogins = {
            'viajero@mate.com': {
                name: 'Mateo Viajero', age: '28', hometown: 'San Carlos de Bariloche, Río Negro',
                bio: '¡Hola! Soy Mateo. Me apasiona viajar por Argentina con el mate en la mano. Busco compañeres para recorrer senderos de la Patagonia y compartir buenos momentos.',
                travel_style: 'Aventurero Indómito', travel_style_key: 'mochilero', companion_style: 'aventura',
                avatar: 'https://i.pravatar.cc/150?img=11', budget: 'economico', regions: ['cuyo', 'patagonia'],
                destination: 'Patagonia', start_date: '2026-11-10', end_date: '2026-11-25',
                interests: 'Trekking, Fotografía, Comida local', languages: 'Español, Inglés'
            },
            'sofia@mate.com': {
                name: 'Sofía', age: '25', hometown: 'Buenos Aires',
                bio: 'Busco relajarme en la Patagonia, conocer cafeterías de especialidad.',
                travel_style: 'Aventurera Confort', travel_style_key: 'confort', companion_style: 'relax',
                avatar: 'https://i.pravatar.cc/150?img=32', budget: 'premium', regions: ['patagonia'],
                destination: 'Bariloche', start_date: '2026-07-08', end_date: '2026-07-18',
                interests: 'Cultura, Café, Senderismo', languages: 'Español, Inglés'
            },
            'tomas@mate.com': {
                name: 'Tomás', age: '28', hometown: 'Córdoba',
                bio: 'Me encanta conocer culturas, hacer trekking y descubrir nuevos destinos.',
                travel_style: 'Aventurero Mochilero', travel_style_key: 'mochilero', companion_style: 'aventura',
                avatar: 'https://i.pravatar.cc/150?img=12', budget: 'medio', regions: ['norte'],
                destination: 'Tailandia', start_date: '2026-06-01', end_date: '2026-06-20',
                interests: 'Trekking, Fotografía', languages: 'Español'
            },
            'caro@mate.com': {
                name: 'Caro', age: '27', hometown: 'Rosario',
                bio: 'Me encanta descubrir ruinas históricas y museos.',
                travel_style: 'Exploradora Cultural', travel_style_key: 'cultural', companion_style: 'cultura',
                avatar: 'https://i.pravatar.cc/150?img=47', budget: 'medio', regions: ['litoral'],
                destination: 'Misiones', start_date: '2026-08-15', end_date: '2026-08-25',
                interests: 'Historia, Museos, Selva', languages: 'Español, Portugués'
            },
            'martin@mate.com': {
                name: 'Martín', age: '31', hometown: 'Mendoza',
                bio: 'Fan de la naturaleza salvaje, peñas folclóricas y acampar.',
                travel_style: 'Aventurero Gasolero', travel_style_key: 'mochilero', companion_style: 'fiesta',
                avatar: 'https://i.pravatar.cc/150?img=60', budget: 'economico', regions: ['norte'],
                destination: 'Salta', start_date: '2026-06-10', end_date: '2026-06-25',
                interests: 'Camping, Folclore', languages: 'Español'
            },
            'lucia@mate.com': {
                name: 'Lucía', age: '24', hometown: 'Santa Fe',
                bio: 'Viajera espontánea. Me gusta dejarme llevar por la ruta.',
                travel_style: 'Espontánea', travel_style_key: 'mochilero', companion_style: 'relax',
                avatar: 'https://i.pravatar.cc/150?img=20', budget: 'economico', regions: ['centro'],
                destination: 'Córdoba', start_date: '2026-09-01', end_date: '2026-09-15',
                interests: 'Música, Yoga', languages: 'Español'
            },
            'juan@mate.com': {
                name: 'Juan', age: '35', hometown: 'Neuquén',
                bio: 'Amante del buen vino y la gastronomía local.',
                travel_style: 'Viajero Gourmet', travel_style_key: 'confort', companion_style: 'cultura',
                avatar: 'https://i.pravatar.cc/150?img=33', budget: 'premium', regions: ['cuyo'],
                destination: 'Mendoza', start_date: '2026-10-01', end_date: '2026-10-10',
                interests: 'Vino, Gastronomía', languages: 'Español, Inglés'
            },
            'nico@mate.com': {
                name: 'Nico', age: '29', hometown: 'Tucumán',
                bio: 'Fotógrafo aficionado. Busco los mejores paisajes.',
                travel_style: 'Cazador de Paisajes', travel_style_key: 'cultural', companion_style: 'aventura',
                avatar: 'https://i.pravatar.cc/150?img=52', budget: 'medio', regions: ['patagonia'],
                destination: 'Ushuaia', start_date: '2026-12-01', end_date: '2026-12-15',
                interests: 'Fotografía, Naturaleza', languages: 'Español'
            },
            'vale@mate.com': {
                name: 'Valentina', age: '26', hometown: 'La Plata',
                bio: 'Me encanta la playa, el surf y conocer gente de todo el mundo.',
                travel_style: 'Playera', travel_style_key: 'confort', companion_style: 'fiesta',
                avatar: 'https://i.pravatar.cc/150?img=43', budget: 'medio', regions: ['buenosaires'],
                destination: 'Mar del Plata', start_date: '2026-01-10', end_date: '2026-01-20',
                interests: 'Surf, Playa, Fiesta', languages: 'Español, Portugués'
            },
            'agos@mate.com': {
                name: 'Agostina', age: '27', hometown: 'San Juan',
                bio: 'Buscando desconectar de la ciudad y conectar con la montaña.',
                travel_style: 'Aventurera Zen', travel_style_key: 'mochilero', companion_style: 'relax',
                avatar: 'https://i.pravatar.cc/150?img=1', budget: 'economico', regions: ['cuyo', 'norte'],
                destination: 'Jujuy', start_date: '2026-05-01', end_date: '2026-05-15',
                interests: 'Montaña, Meditación', languages: 'Español'
            }
        };

        const user = validLogins[email];
        
        if (!user || password !== '1234') {
            alert('Credenciales incorrectas. Verificá tu correo o contraseña.');
            return; // Abort login
        }

        // Load mock user data dynamically based on the matched user
        localStorage.setItem('user_name', user.name);
        localStorage.setItem('user_age', user.age);
        localStorage.setItem('user_hometown', user.hometown);
        localStorage.setItem('user_bio', user.bio);
        localStorage.setItem('user_travel_style', user.travel_style);
        localStorage.setItem('user_travel_style_key', user.travel_style_key);
        localStorage.setItem('user_companion_style', user.companion_style);
        localStorage.setItem('user_avatar', user.avatar);
        localStorage.setItem('user_budget', user.budget);
        localStorage.setItem('user_regions', JSON.stringify(user.regions));
        
        localStorage.setItem('user_destination', user.destination);
        localStorage.setItem('user_start_date', user.start_date);
        localStorage.setItem('user_end_date', user.end_date);
        localStorage.setItem('user_interests', user.interests);
        localStorage.setItem('user_languages', user.languages);
        
        localStorage.setItem('user_profile_progress', '100');
    } else {
        // Normal flow (arbitrary credentials or registration)
        if (type === 'register') {
            const nameInput = event.target.querySelector('input[placeholder="Ej: Sofía Rodríguez"]');
            if (nameInput && nameInput.value.trim() !== '') {
                localStorage.setItem('user_name', nameInput.value.trim());
            } else {
                localStorage.setItem('user_name', 'Viajero Nuevo');
            }
        } else {
            // Login with other credentials: use email local part as name
            const nameFromEmail = email ? email.split('@')[0] : 'Viajero Mate';
            localStorage.setItem('user_name', nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
        }

        // Apply traveler test results if taken
        if (testStyle) {
            localStorage.setItem('user_travel_style', testStyle);
            localStorage.setItem('user_travel_style_key', testStyleKey || 'mochilero');
            localStorage.setItem('user_budget', testBudget || 'economico');
            localStorage.setItem('user_companion_style', testCompanion || 'aventura');
            localStorage.setItem('user_regions', testRegions || JSON.stringify([]));
            localStorage.setItem('user_destination', testDestination || 'Tailandia');
            if (testStart) localStorage.setItem('user_start_date', testStart);
            if (testEnd) localStorage.setItem('user_end_date', testEnd);
        } else {
            // Check query params if any (e.g. from direct URL navigation with profile query)
            const params = new URLSearchParams(window.location.search);
            const profile = params.get('profile');
            if (profile) {
                localStorage.setItem('user_travel_style', decodeURIComponent(profile));
                const decoded = decodeURIComponent(profile).toLowerCase();
                if (decoded.includes('aventurero')) {
                    localStorage.setItem('user_travel_style_key', 'mochilero');
                    localStorage.setItem('user_companion_style', 'aventura');
                } else if (decoded.includes('confort')) {
                    localStorage.setItem('user_travel_style_key', 'hotel');
                    localStorage.setItem('user_companion_style', 'confort');
                } else if (decoded.includes('social')) {
                    localStorage.setItem('user_travel_style_key', 'mochilero');
                    localStorage.setItem('user_companion_style', 'fiesta');
                } else if (decoded.includes('cultural')) {
                    localStorage.setItem('user_travel_style_key', 'organizado');
                    localStorage.setItem('user_companion_style', 'confort');
                }
                localStorage.setItem('user_budget', 'economico');
                localStorage.setItem('user_regions', JSON.stringify([]));
                localStorage.setItem('user_destination', 'Tailandia');
            } else {
                // Default empty state values
                localStorage.setItem('user_travel_style', 'Aventurero Indómito');
                localStorage.setItem('user_travel_style_key', 'mochilero');
                localStorage.setItem('user_budget', 'economico');
                localStorage.setItem('user_companion_style', 'aventura');
                localStorage.setItem('user_regions', JSON.stringify([]));
                localStorage.setItem('user_destination', 'Tailandia');
            }
            
            // Set defaults for dates
            localStorage.setItem('user_start_date', '2026-06-01');
            localStorage.setItem('user_end_date', '2026-06-20');
        }

        // Initialize default age/bio/regions for new profile
        localStorage.setItem('user_age', '26');
        localStorage.setItem('user_hometown', 'Buenos Aires, Argentina');
        localStorage.setItem('user_bio', '¡Listo para compartir mates y emprender nuevas rutas!');
        localStorage.setItem('user_avatar', 'https://i.pravatar.cc/150?img=12');
        localStorage.setItem('user_interests', 'Trekking, Fotografía, Comida local');
        localStorage.setItem('user_languages', 'Español, Inglés');
        
        localStorage.setItem('user_profile_progress', '45'); // some initial completion due to defaults
    }

    // Show Success screen simulator
    const mainBody = document.body;
    mainBody.innerHTML = `
        <div class="container-fluid min-vh-100 p-0 d-flex align-items-center justify-content-center bg-light">
            <div class="card p-5 border-0 shadow-lg text-center rounded-4 col-xl-4 col-lg-5 col-md-8 mx-auto">
                <div class="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center mx-auto mb-3 step-circle">
                    <i class="bi bi-check-circle-fill fs-1"></i>
                </div>
                <h4 class="fw-bold text-dark mb-2">¡Acceso exitoso!</h4>
                <p class="text-secondary small mb-4">Te estamos redirigiendo a la pantalla de exploración de compañeres...</p>
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>
        </div>
    `;
    setTimeout(() => {
        window.location.replace("inicio.html");
    }, 1500);
}

// Global helper function to autofill the login fields
window.autofillMockCredentials = function() {
    const emailField = document.getElementById('loginEmail');
    const passwordField = document.getElementById('loginPassword');
    
    if (emailField && passwordField) {
        emailField.value = 'viajero@mate.com';
        passwordField.value = '1234';
        
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
