(function() {
    let currentStep = 1;
    let userAnswers = {
        tipoViaje: '',
        presupuesto: '',
        region: '',
        fechas: [],
        companero: ''
    };

    const today = new Date();
    let displayYear = today.getFullYear();
    let displayMonth = today.getMonth();

    const modal = document.getElementById('travelerTestModal');
    const btnPrev = document.getElementById('btnPrevStep');
    const btnNext = document.getElementById('btnNextStep');
    const footer = document.getElementById('testModalFooter');
    const progressLine = document.getElementById('stepperLineProgress');

    const isPantallas = window.location.pathname.includes('/pantallas/');
    const basePath = isPantallas ? '../' : '';

    const profiles = {
        aventurero: {
            title: "Aventurero Indómito",
            desc: "Sos un explorador nato. Te motivan los desafíos físicos, la conexión profunda con la naturaleza salvaje y el trekking. No buscás lujos, sino experiencias auténticas y la libertad de moverte a tu propio ritmo con la mochila a cuestas.",
            image: basePath + "images/resultado_aventurero.jpg"
        },
        confort: {
            title: "Buscador de Confort y Relax",
            desc: "Para vos, viajar es sinónimo de descansar, mimarte y recargar energías en entornos cómodos y placenteros. Te encantan los buenos hoteles, spas, degustación de platos selectos y paseos organizados sin preocupaciones logísticas.",
            image: basePath + "images/resultado_confort.jpg"
        },
        social: {
            title: "Explorador Social",
            desc: "Buscás conectar con la gente, la música y la noche de cada lugar. Disfrutás compartir un fogón, recorrer bares locales, participar de fiestas tradicionales y hacer nuevos amigos en hostels y tours grupales.",
            image: basePath + "images/resultado_social.jpg"
        },
        cultural: {
            title: "Explorador Cultural e Histórico",
            desc: "Te apasiona la historia local, las leyendas de cada pueblo, la arquitectura colonial, los museos y el patrimonio arqueológico. Buscás viajes enriquecedores que te dejen nuevos aprendizajes e historias que contar.",
            image: basePath + "images/resultado_cultural.jpg"
        }
    };

    const recommendations = {
        noa: {
            aventurero: "Jujuy (Salinas Grandes y senderos de altura en Purmamarca y Tilcara).",
            confort: "Salta (Cafayate, bodegas de altura y hoteles coloniales premium con spa).",
            social: "Salta Capital (Peñas folclóricas de la calle Balcarce y peatonales activas).",
            cultural: "Tucumán (Ruinas de Quilmes) y La Rioja (Parque Nacional Talampaya)."
        },
        nea: {
            aventurero: "Chaco (El Impenetrable) y Formosa (Bañado La Estrella en lancha de aventura).",
            confort: "Misiones (Cataratas del Iguazú y resorts ecológicos premium de selva).",
            social: "Corrientes (Esteros del Iberá, playas fluviales y costanera con fiesta).",
            cultural: "Misiones (Ruinas Jesuíticas de San Ignacio Miní, patrimonio mundial)."
        },
        cuyo: {
            aventurero: "Mendoza (Alta Montaña, senderismo al pie del Aconcagua y rafting en Potrerillos).",
            confort: "Mendoza (Bodegas exclusivas en Valle de Uco y hoteles boutique de viñedos).",
            social: "San Luis (Potrero de los Funes y deportes grupales en el lago).",
            cultural: "San Juan (Parque Provincial Ischigualasto / Valle de la Luna)."
        },
        pampeana: {
            aventurero: "Córdoba (Trekking en el Cerro Champaquí y acampada en Los Gigantes).",
            confort: "Buenos Aires (Hoteles premium frente al mar en Mar del Plata o estancias exclusivas).",
            social: "CABA (San Telmo y Palermo, recorridos urbanos y cervecerías artesanales).",
            cultural: "Santa Fe (Casco histórico) y Entre Ríos (Palacio San José)."
        },
        patagonia: {
            aventurero: "Río Negro (El Bolsón, caminatas al Cajón del Azul y refugios de montaña).",
            confort: "Neuquén (Villa La Angostura, cabañas premium de troncos y lagos pacíficos).",
            social: "Río Negro (Bariloche, cervecerías del Circuito Chico y hostels activos).",
            cultural: "Chubut (Avistaje de ballenas en Puerto Madryn y museos galeses en Gaiman)."
        }
    };

    function isDaySelected(day) {
        return userAnswers.fechas.some(f => f.day === day && f.month === displayMonth && f.year === displayYear);
    }

    function toggleDaySelection(day) {
        const index = userAnswers.fechas.findIndex(f => f.day === day && f.month === displayMonth && f.year === displayYear);
        if (index !== -1) {
            userAnswers.fechas.splice(index, 1);
        } else {
            userAnswers.fechas.push({ day, month: displayMonth, year: displayYear });
        }
        renderCalendar();
        updateButtonState();
    }

    function renderCalendar() {
        const titleText = new Date(displayYear, displayMonth).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
        document.getElementById('calendarMonthTitle').innerText = titleText.charAt(0).toUpperCase() + titleText.slice(1);

        const firstDayIndex = new Date(displayYear, displayMonth, 1).getDay();
        const totalDays = new Date(displayYear, displayMonth + 1, 0).getDate();
        const prevTotalDays = new Date(displayYear, displayMonth, 0).getDate();

        const grid = document.getElementById('calendarDaysGrid');
        grid.innerHTML = '';

        // Previous month's trailing days
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'calendar-day-btn text-muted small opacity-50';
            btn.disabled = true;
            btn.innerText = prevTotalDays - i;
            grid.appendChild(btn);
        }

        // Active month's days
        for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'calendar-day-btn small fw-semibold';
            
            const cellDate = new Date(displayYear, displayMonth, dayNum);
            const cellMidnight = new Date(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate());
            const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            if (cellMidnight < todayMidnight) {
                btn.disabled = true;
                btn.className += ' text-muted opacity-25';
            } else {
                btn.addEventListener('click', () => toggleDaySelection(dayNum));
            }

            if (isDaySelected(dayNum)) {
                btn.classList.add('selected', 'bg-success', 'text-white', 'border-success', 'border-2');
            }

            btn.innerText = dayNum;
            grid.appendChild(btn);
        }

        // Next month's leading days
        const totalCells = firstDayIndex + totalDays;
        const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let i = 1; i <= remainingCells; i++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'calendar-day-btn text-muted small opacity-50';
            btn.disabled = true;
            btn.innerText = i;
            grid.appendChild(btn);
        }

        // Disable calendar back button if on current month
        const btnCalPrev = document.getElementById('calPrevMonth');
        if (displayYear === today.getFullYear() && displayMonth === today.getMonth()) {
            btnCalPrev.disabled = true;
        } else {
            btnCalPrev.disabled = false;
        }
    }

    document.getElementById('calPrevMonth').addEventListener('click', () => {
        if (displayYear > today.getFullYear() || displayMonth > today.getMonth()) {
            if (displayMonth === 0) {
                displayMonth = 11;
                displayYear--;
            } else {
                displayMonth--;
            }
            renderCalendar();
        }
    });

    document.getElementById('calNextMonth').addEventListener('click', () => {
        if (displayMonth === 11) {
            displayMonth = 0;
            displayYear++;
        } else {
            displayMonth++;
        }
        renderCalendar();
    });

    document.querySelectorAll('.test-option-card').forEach(card => {
        const key = card.getAttribute('data-key');
        const value = card.getAttribute('data-value');
        
        card.addEventListener('click', () => {
            document.querySelectorAll(`.test-option-card[data-key="${key}"]`).forEach(c => {
                c.classList.remove('selected', 'border-success', 'bg-success-subtle', 'border-2');
            });
            card.classList.add('selected', 'border-success', 'bg-success-subtle', 'border-2');
            userAnswers[key] = value;
            updateButtonState();
        });
    });

    function updateButtonState() {
        let enabled = false;
        if (currentStep === 1 && userAnswers.tipoViaje) enabled = true;
        if (currentStep === 2 && userAnswers.presupuesto) enabled = true;
        if (currentStep === 3 && userAnswers.region) enabled = true;
        if (currentStep === 4 && userAnswers.fechas.length > 0) enabled = true;
        if (currentStep === 5 && userAnswers.companero) enabled = true;

        if (enabled) {
            btnNext.removeAttribute('disabled');
        } else {
            btnNext.setAttribute('disabled', 'true');
        }
    }

    function updateStepVisibility() {
        document.querySelectorAll('.step-circle-indicator').forEach(indicator => {
            const stepNum = parseInt(indicator.getAttribute('data-step'));
            indicator.classList.remove('active', 'completed');
            if (stepNum === currentStep) {
                indicator.classList.add('active');
            } else if (stepNum < currentStep) {
                indicator.classList.add('completed');
                indicator.innerHTML = '<i class="bi bi-check-lg"></i>';
            } else {
                indicator.innerHTML = stepNum;
            }
        });

        const progressWidth = ((currentStep - 1) / 4) * 100;
        progressLine.style.width = `${progressWidth}%`;

        document.querySelectorAll('.wizard-step').forEach(stepDiv => {
            stepDiv.classList.add('d-none');
        });
        
        const currentStepDiv = document.querySelector(`.wizard-step[data-step="${currentStep}"]`);
        if (currentStepDiv) {
            currentStepDiv.classList.remove('d-none');
        }

        btnPrev.disabled = currentStep === 1;
        updateButtonState();
    }

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepVisibility();
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentStep < 5) {
            currentStep++;
            updateStepVisibility();
        } else {
            showLoading();
        }
    });

    function showLoading() {
        document.querySelectorAll('.wizard-step').forEach(stepDiv => {
            stepDiv.classList.add('d-none');
        });
        footer.classList.add('d-none');
        
        const loadingScreen = document.getElementById('testLoadingScreen');
        loadingScreen.classList.remove('d-none');
        
        let percent = 0;
        const progressBar = document.getElementById('loadingProgress');
        const interval = setInterval(() => {
            percent += 5;
            progressBar.style.width = `${percent}%`;
            if (percent >= 100) {
                clearInterval(interval);
                calculateResult();
            }
        }, 100);
    }

    function calculateResult() {
        let aventurero = 0;
        let confort = 0;
        let social = 0;
        let cultural = 0;

        if (userAnswers.tipoViaje === 'mochilero') { aventurero += 3; social += 1.5; }
        else if (userAnswers.tipoViaje === 'hotel') { confort += 3; cultural += 1; }
        else if (userAnswers.tipoViaje === 'organizado') { cultural += 3; confort += 1.5; }

        if (userAnswers.presupuesto === 'economico') { aventurero += 2; social += 1; }
        else if (userAnswers.presupuesto === 'medio') { social += 2; cultural += 1.5; }
        else if (userAnswers.presupuesto === 'premium') { confort += 3; cultural += 1; }

        if (userAnswers.companero === 'aventura') { aventurero += 3; social += 0.5; }
        else if (userAnswers.companero === 'fiesta') { social += 3; }
        else if (userAnswers.companero === 'confort') { confort += 2; cultural += 3; }

        const maxScore = Math.max(aventurero, confort, social, cultural);
        let selectedProfile = 'aventurero';
        if (maxScore === confort) selectedProfile = 'confort';
        else if (maxScore === social) selectedProfile = 'social';
        else if (maxScore === cultural) selectedProfile = 'cultural';

        const profile = profiles[selectedProfile];
        document.getElementById('resultProfileTitle').innerText = profile.title;
        document.getElementById('resultProfileDesc').innerText = profile.desc;
        document.getElementById('resultProfileImage').src = profile.image;

        const regionName = {
            noa: 'Noroeste (NOA)',
            nea: 'Noreste (NEA)',
            cuyo: 'Cuyo',
            pampeana: 'Pampeana',
            patagonia: 'Patagónica'
        }[userAnswers.region];

        const destText = recommendations[userAnswers.region][selectedProfile];
        document.getElementById('resultDestinationsText').innerHTML = `Basado en tu interés por la región <strong>${regionName}</strong> y tu perfil de <strong>${profile.title}</strong>, te recomendamos explorar:<br><br><strong>${destText}</strong>`;

        document.getElementById('testLoadingScreen').classList.add('d-none');
        document.getElementById('testResultScreen').classList.remove('d-none');
    }

    function restartTest() {
        currentStep = 1;
        userAnswers = {
            tipoViaje: '',
            presupuesto: '',
            region: '',
            fechas: [],
            companero: ''
        };
        displayYear = today.getFullYear();
        displayMonth = today.getMonth();
        
        document.querySelectorAll('.test-option-card').forEach(card => {
            card.classList.remove('selected', 'border-success', 'bg-success-subtle', 'border-2');
        });
        
        document.getElementById('testResultScreen').classList.add('d-none');
        document.getElementById('testLoadingScreen').classList.add('d-none');
        footer.classList.remove('d-none');
        
        updateStepVisibility();
        renderCalendar();
    }

    const btnRestartTestEl = document.getElementById('btnRestartTest');
    if (btnRestartTestEl) {
        btnRestartTestEl.addEventListener('click', restartTest);
    }

    modal.addEventListener('show.bs.modal', function () {
        restartTest();
    });

    function saveTestResultsToLocalStorage() {
        const resultTitle = document.getElementById('resultProfileTitle').innerText;
        const resultDesc = document.getElementById('resultProfileDesc').innerText;
        localStorage.setItem('user_travel_style', resultTitle);
        localStorage.setItem('user_bio', resultDesc);
        localStorage.setItem('user_travel_style_key', userAnswers.tipoViaje || 'mochilero');
        localStorage.setItem('user_budget', userAnswers.presupuesto || 'economico');
        localStorage.setItem('user_companion_style', userAnswers.companero || 'aventura');
        
        const regionKey = userAnswers.region || 'patagonia';
        localStorage.setItem('user_regions', JSON.stringify([regionKey]));
        
        const regionLabel = {
            noa: 'Noroeste (NOA)',
            nea: 'Noreste (NEA)',
            cuyo: 'Cuyo',
            pampeana: 'Pampeana',
            patagonia: 'Patagonia'
        }[regionKey] || 'Patagonia';
        localStorage.setItem('user_destination', regionLabel);
        
        if (userAnswers.fechas && userAnswers.fechas.length > 0) {
            const dateObjects = userAnswers.fechas.map(f => new Date(f.year, f.month, f.day));
            dateObjects.sort((a, b) => a - b);
            
            const start = dateObjects[0];
            const end = dateObjects[dateObjects.length - 1];
            
            const startStr = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
            const endStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;
            
            localStorage.setItem('user_start_date', startStr);
            localStorage.setItem('user_end_date', endStr);
        }
    }

    // Find Partner redirects to dedicated Login/Register page
    const btnRegisterAndSave = document.getElementById('btnRegisterAndSave');
    if (btnRegisterAndSave) {
        btnRegisterAndSave.addEventListener('click', function() {
            saveTestResultsToLocalStorage();
            const resultTitle = document.getElementById('resultProfileTitle').innerText;
            const encodedTitle = encodeURIComponent(resultTitle);
            window.location.href = `pantallas/iniciar_sesion.html?mode=register&profile=${encodedTitle}`;
        });
    }
    
    const btnLoginAndSave = document.getElementById('btnLoginAndSave');
    if (btnLoginAndSave) {
        btnLoginAndSave.addEventListener('click', function() {
            saveTestResultsToLocalStorage();
            const resultTitle = document.getElementById('resultProfileTitle').innerText;
            const encodedTitle = encodeURIComponent(resultTitle);
            window.location.href = `pantallas/iniciar_sesion.html?mode=login&profile=${encodedTitle}`;
        });
    }

    // Save Profile from within perfil.html
    const btnSaveTestProfile = document.getElementById('btnSaveTestProfile');
    if (btnSaveTestProfile) {
        btnSaveTestProfile.addEventListener('click', function() {
            saveTestResultsToLocalStorage();
        });
    }

})();
