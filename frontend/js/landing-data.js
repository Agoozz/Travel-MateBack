(function () {
  // 1. FEATURES DATA
  const featuresData = [
    {
      icon: "bi-shield-check",
      title: "Perfiles Verificados",
      text: "Viajeros reales como vos",
    },
    {
      icon: "bi-bezier2",
      title: "Test de compatibilidad",
      text: "Encontrá tu compañere ideal",
    },
    {
      icon: "bi-chat-left-text",
      title: "Chat seguro",
      text: "Conversaciones privadas y seguras.",
    },
    {
      icon: "bi-geo-alt",
      title: "Destinos reales",
      text: "Explora lugares increíbles.",
    },
  ];

  // 2. HOW IT WORKS DATA
  const stepsData = [
    {
      iconHTML: '<i class="bi bi-pencil-square fs-3"></i>',
      text: "Completa tus datos y crea tu cuenta",
    },
    {
      iconHTML:
        '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16"><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/></svg>',
      text: "Descubre qué viajeros hay disponibles",
    },
    {
      iconHTML: '<i class="bi bi-chat-dots fs-3"></i>',
      text: "Chatea y armen un plan de viaje juntos",
    },
    {
      iconHTML: '<i class="bi bi-airplane-engines fs-3"></i>',
      text: "¡Prepara las valijas y a disfrutar!",
    },
  ];

  // 3. TESTIMONIALS DATA
  const testimonialsData = [
    {
      img: "avatar1.jpg",
      name: "Sofía y Lucas",
      badge: "100% Aventureros",
      badgeColor: "success",
      location: "El Chaltén, Santa Cruz",
      text: '"Conocí a Lucas a través de la app. Descubrimos que ambos queríamos hacer el trekking al Fitz Roy pero no nos animábamos solos. ¡Fue el mejor viaje de mi vida y nos hicimos grandes amigos!"',
    },
    {
      img: "avatar2.jpg",
      name: "Julieta y Mateo",
      badge: "85% Cultura",
      badgeColor: "warning",
      location: "Cafayate, Salta",
      text: '"Queríamos recorrer la ruta del vino y conocer bodegas coloniales en el norte argentino. Compartimos gastos de alquiler de auto y hotel. ¡Gran experiencia de compañerismo!"',
    },
    {
      img: "avatar3.jpg",
      name: "Camila y Sol",
      badge: "96% Vida Nocturna",
      badgeColor: "info",
      location: "Cataratas, Misiones",
      text: '"Viajamos en Semana Santa para disfrutar del parque nacional de día y recorrer peñas y bares de noche. Fue la mejor decisión, nos divertimos muchísimo."',
    },
  ];

  // 4. FAQ DATA
  const faqData = [
    {
      q: "¿Es seguro viajar con alguien que no conozco?",
      a: "La seguridad es nuestra prioridad. Todos los perfiles pasan por un sistema de verificación antes de poder chatear. Además, te recomendamos siempre tener las primeras charlas por nuestro chat interno, coordinar encuentros previos en lugares públicos y compartir tu itinerario con familiares o amigues.",
    },
    {
      q: "¿Cómo se dividen los gastos del viaje?",
      a: "La división de gastos la coordinan ustedes de forma libre antes de partir. Durante el Test de Viajero, indicás tu rango de presupuesto estimado (Económico, Medio o Premium) para que te recomendemos compañeres con expectativas financieras similares y evitar malos entendidos en el camino.",
    },
    {
      q: "¿Qué pasa si cambian mis planes o mis fechas?",
      a: "Podés actualizar tu viaje y tu calendario en cualquier momento desde tu perfil personal en la aplicación. Si ya estabas en contacto con un compañere de viaje, te sugerimos avisarle con la mayor anticipación posible por respeto a su tiempo y planificación.",
    },
    {
      q: "¿La app tiene algún costo?",
      a: "Registrarse, realizar el Test de Viajero y explorar perfiles compatibles es 100% gratis. También ofrecemos herramientas de gamificación donde podés acumular JeviaPuntos cumpliendo misiones de viaje para canjearlos por descuentos en hostales y pasajes locales.",
    },
  ];

  document.addEventListener("DOMContentLoaded", () => {
    // Renderizar Caracter�sticas
    const featuresGrid = document.getElementById("featuresGrid");
    if (featuresGrid) {
      featuresData.forEach((f) => {
        featuresGrid.insertAdjacentHTML(
          "beforeend",
          `
                    <div class="col-xl-3 col-md-6">
                        <div class="d-flex align-items-start gap-3">
                            <div class="fs-1 text-success lh-1"><i class="bi ${f.icon}"></i></div>
                            <div>
                                <h3 class="fs-6 fw-bold mb-1 text-body-emphasis">${f.title}</h3>
                                <p class="text-body-secondary small mb-0">${f.text}</p>
                            </div>
                        </div>
                    </div>
                `,
        );
      });
    }

    // Renderizar C�mo Funciona
    const stepsGrid = document.getElementById("stepsGrid");
    if (stepsGrid) {
      stepsData.forEach((s, idx) => {
        const addArrow =
          idx < stepsData.length - 1
            ? '<div class="d-none d-md-block position-absolute top-50 start-100 translate-middle text-body-tertiary fs-4" style="z-index:-1"><i class="bi bi-chevron-right"></i></div>'
            : "";
        stepsGrid.insertAdjacentHTML(
          "beforeend",
          `
                    <div class="col-md-3 col-sm-6 text-center mb-5 mb-md-0 position-relative">
                        <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm step-circle bg-success-subtle text-success" style="width:70px; height:70px;">
                            ${s.iconHTML}
                        </div>
                        <p class="mt-4 fw-semibold text-body-emphasis fs-6 px-3 lh-sm">${s.text}</p>
                        ${addArrow}
                    </div>
                `,
        );
      });
    }

    // Renderizar Testimonios
    const testimonialsGrid = document.getElementById("testimonialsGrid");
    if (testimonialsGrid) {
      testimonialsData.forEach((t) => {
        testimonialsGrid.insertAdjacentHTML(
          "beforeend",
          `
                    <div class="col-lg-4 col-md-6">
                        <div class="card h-100 shadow-sm border-0 rounded-4 p-4 bg-body-tertiary">
                            <div class="card-body p-0 d-flex flex-column h-100">
                                <div class="d-flex align-items-center gap-3 mb-3">
                                    <div class="rounded-circle border border-2 border-success overflow-hidden testimonial-avatar" style="width:50px; height:50px;">
                                        <img src="images/${t.img}" alt="${t.name}" class="w-100 h-100 object-fit-cover" onerror="this.src='https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}'">
                                    </div>
                                    <div>
                                        <h5 class="fw-bold mb-0 text-body-emphasis">${t.name}</h5>
                                        <span class="badge bg-${t.badgeColor} bg-opacity-10 text-${t.badgeColor} rounded-pill fw-semibold small">${t.badge}</span>
                                    </div>
                                </div>
                                <span class="badge bg-body-tertiary text-body-secondary rounded mb-3 text-start px-2 py-1 small w-fit"><i class="bi bi-geo-alt-fill text-danger me-1"></i> ${t.location}</span>
                                <p class="text-body-secondary small flex-grow-1 lh-base">${t.text}</p>
                            </div>
                        </div>
                    </div>
                `,
        );
      });
    }

    // Renderizar FAQ
    const faqAccordion = document.getElementById("faqAccordion");
    if (faqAccordion) {
      faqData.forEach((f, idx) => {
        faqAccordion.insertAdjacentHTML(
          "beforeend",
          `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="faq-heading-${idx}">
                            <button class="accordion-button collapsed fw-semibold text-body-emphasis py-3 small shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-${idx}" aria-expanded="false" aria-controls="faq-collapse-${idx}">
                                ${f.q}
                            </button>
                        </h2>
                        <div id="faq-collapse-${idx}" class="accordion-collapse collapse" aria-labelledby="faq-heading-${idx}" data-bs-parent="#faqAccordion">
                            <div class="accordion-body text-body-secondary small bg-body lh-lg">
                                ${f.a}
                            </div>
                        </div>
                    </div>
                `,
        );
      });
    }
  })();
})();
