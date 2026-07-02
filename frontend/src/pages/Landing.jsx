import { useState } from 'react';
import { Link } from 'react-router-dom';

const provincesData = [
  { name: 'Misiones', region: 'nea', featured: true, img: 'misiones.png', desc: 'Las majestuosas Cataratas del Iguazú, una de las 7 maravillas naturales, tierra colorada y selva paranaense.' },
  { name: 'Mendoza', region: 'cuyo', featured: true, img: 'mendoza.png', desc: 'La capital internacional del vino al pie del Aconcagua. Viñedos de Malbec y turismo de aventura.' },
  { name: 'Río Negro', region: 'patagonia', featured: true, img: 'rio_negro.png', desc: 'Bariloche y el lago Nahuel Huapi, chocolates artesanales, y las playas atlánticas en Las Grutas.' },
  { name: 'Jujuy', region: 'noa', featured: true, img: 'jujuy.png', desc: 'La Quebrada de Humahuaca con su Cerro de los Siete Colores y las inmensas Salinas Grandes.' },
  { name: 'Salta', region: 'noa', featured: false, img: 'salta.png', desc: 'Arquitectura colonial, peñas folclóricas, el Tren a las Nubes, y viñedos de altura en Cafayate.' },
  { name: 'Formosa', region: 'nea', featured: false, img: 'formosa.png', desc: 'El Bañado La Estrella ofrece un espectáculo natural inigualable.' },
  { name: 'Tucumán', region: 'noa', featured: false, img: 'tucuman.png', desc: 'El jardín de la República. Ruinas precolombinas de Quilmes.' },
  { name: 'Catamarca', region: 'noa', featured: false, img: 'catamarca.png', desc: 'Paisajes lunares en el Campo de Piedra Pómez.' },
  { name: 'Santiago del Estero', region: 'noa', featured: false, img: 'santiago_del_estero.png', desc: 'Las termas de Río Hondo con sus aguas curativas medicinales y hotelería de relax.' },
  { name: 'Chaco', region: 'nea', featured: false, img: 'chaco.jpg', desc: 'El impenetrable chaqueño ofrece un turismo de aventura salvaje y avistaje de fauna.' },
  { name: 'Corrientes', region: 'nea', featured: false, img: 'corrientes.png', desc: 'El portal de acceso a los Esteros del Iberá, uno de los humedales más grandes del planeta.' },
  { name: 'La Rioja', region: 'noa', featured: false, img: 'la_rioja.png', desc: 'El Parque Nacional Talampaya con sus inmensos paredones rojizos esculpidos.' },
  { name: 'San Juan', region: 'cuyo', featured: false, img: 'san_juan.png', desc: 'El Parque Provincial Ischigualasto (Valle de la Luna) con sus fósiles de dinosaurios.' },
  { name: 'Córdoba', region: 'pampeana', featured: false, img: 'cordoba.png', desc: 'Sierras, ríos cristalinos y lagos en Punilla y Calamuchita.' },
  { name: 'Santa Fe', region: 'pampeana', featured: false, img: 'santa_fe.png', desc: 'El delta del Paraná, paseos costeros en su capital y Rosario, cuna de la bandera.' },
  { name: 'Entre Ríos', region: 'pampeana', featured: false, img: 'entre_rios.png', desc: 'Playas fluviales, termas terapéuticas en todo el territorio y carnavales.' },
  { name: 'San Luis', region: 'cuyo', featured: false, img: 'san_luis.png', desc: 'Sierras puntanas con microclima excepcional en Merlo.' },
  { name: 'La Pampa', region: 'pampeana', featured: false, img: 'la_pampa.jpg', desc: 'El Parque Nacional Lihuel Calel, bosques de caldenes, y la llanura pampeana.' },
  { name: 'Buenos Aires', region: 'pampeana', featured: false, img: 'buenos_aires.jpg', desc: 'Playas atlánticas, lagunas pampeanas e inmensa llanura ideal para turismo rural.' },
  { name: 'CABA', region: 'pampeana', featured: false, img: 'caba.jpg', desc: 'El Obelisco, San Telmo, Caminito en La Boca y una vibrante oferta cultural.' },
  { name: 'Neuquén', region: 'patagonia', featured: false, img: 'neuquen.jpg', desc: 'Lagos glaciares color turquesa rodeados de bosques de araucarias.' },
  { name: 'Chubut', region: 'patagonia', featured: false, img: 'chubut.jpg', desc: 'Ballenas francas australes en Puerto Madryn, pingüinos en Punta Tombo.' },
  { name: 'Santa Cruz', region: 'patagonia', featured: false, img: 'santa_cruz.jpg', desc: 'El imponente Glaciar Perito Moreno en El Calafate y El Chaltén.' },
  { name: 'Tierra del Fuego', region: 'patagonia', featured: false, img: 'tierra_del_fuego.jpg', desc: 'Ushuaia, el fin del mundo. Canal de Beagle y el Parque Nacional Lapataia.' }
];

// --- DATA ---
const featuresData = [
  { icon: 'bi-shield-check', title: 'Perfiles Verificados', text: 'Viajeros reales como vos' },
  { icon: 'bi-bezier2', title: 'Test de compatibilidad', text: 'Encontrá tu compañere ideal' },
  { icon: 'bi-chat-left-text', title: 'Chat seguro', text: 'Conversaciones privadas y seguras.' },
  { icon: 'bi-geo-alt', title: 'Destinos reales', text: 'Explora lugares increíbles.' }
];

const stepsData = [
  { iconHTML: <i className="bi bi-pencil-square fs-3"></i>, text: 'Completa tus datos y crea tu cuenta' },
  { iconHTML: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16"><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/></svg>, text: 'Descubre qué viajeros hay disponibles' },
  { iconHTML: <i className="bi bi-chat-dots fs-3"></i>, text: 'Chatea y armen un plan de viaje juntos' },
  { iconHTML: <i className="bi bi-airplane-engines fs-3"></i>, text: '¡Prepara las valijas y a disfrutar!' }
];

const testimonialsData = [
  { img: 'avatar1.jpg', name: 'Sofía y Lucas', badge: '100% Aventureros', badgeColor: 'success', location: 'El Chaltén, Santa Cruz', text: '"Conocí a Lucas a través de la app. Descubrimos que ambos queríamos hacer el trekking al Fitz Roy pero no nos animábamos solos. ¡Fue el mejor viaje de mi vida y nos hicimos grandes amigos!"' },
  { img: 'avatar2.jpg', name: 'Julieta y Mateo', badge: '85% Cultura', badgeColor: 'warning', location: 'Cafayate, Salta', text: '"Queríamos recorrer la ruta del vino y conocer bodegas coloniales en el norte argentino. Compartimos gastos de alquiler de auto y hotel. ¡Gran experiencia de compañerismo!"' },
  { img: 'avatar3.jpg', name: 'Camila y Sol', badge: '96% Vida Nocturna', badgeColor: 'info', location: 'Cataratas, Misiones', text: '"Viajamos en Semana Santa para disfrutar del parque nacional de día y recorrer peñas y bares de noche. Fue la mejor decisión, nos divertimos muchísimo."' }
];

const faqData = [
  { q: '¿Es seguro viajar con alguien que no conozco?', a: 'La seguridad es nuestra prioridad. Todos los perfiles pasan por un sistema de verificación antes de poder chatear. Además, te recomendamos siempre tener las primeras charlas por nuestro chat interno, coordinar encuentros previos en lugares públicos y compartir tu itinerario con familiares o amigues.' },
  { q: '¿Cómo se dividen los gastos del viaje?', a: 'La división de gastos la coordinan ustedes de forma libre antes de partir. Durante el Test de Viajero, indicás tu rango de presupuesto estimado (Económico, Medio o Premium) para que te recomendemos compañeres con expectativas financieras similares y evitar malos entendidos en el camino.' },
  { q: '¿Qué pasa si cambian mis planes o mis fechas?', a: 'Podés actualizar tu viaje y tu calendario en cualquier momento desde tu perfil personal en la aplicación. Si ya estabas en contacto con un compañere de viaje, te sugerimos avisarle con la mayor anticipación posible por respeto a su tiempo y planificación.' },
  { q: '¿La app tiene algún costo?', a: 'Registrarse, realizar el Test de Viajero y explorar perfiles compatibles es 100% gratis. También ofrecemos herramientas de gamificación donde podés acumular JeviaPuntos cumpliendo misiones de viaje para canjearlos por descuentos en hostales y pasajes locales.' }
];

const Landing = () => {
  const [activeRegion, setActiveRegion] = useState('destacados');
  const [searchTerm, setSearchTerm] = useState('');

  const normalizeText = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredProvinces = provincesData.filter(p => {
    const term = normalizeText(searchTerm);
    if (term) {
      return normalizeText(p.name).includes(term);
    }
    if (activeRegion === 'destacados') return p.featured;
    return p.region === activeRegion;
  });

  return (
    <>
      {/* HERO SECTION */}
      <header className="py-4 py-lg-5">
        <div className="container-fluid px-lg-5">
          <div className="row align-items-center g-4">
            
            {/* Left Column (Content) */}
            <div className="col-lg-7 px-lg-4">
              <div className="ps-lg-3">
                <h1 className="display-5 fw-bold mb-3 lh-sm text-body-emphasis">
                  Encontrá tu compañere ideal <span className="text-success">de viaje</span>
                </h1>
                <p className="text-body-secondary mb-4 fs-5 lh-base">
                  Conectamos viajeros con intereses compatibles para que vivas experiencias inolvidables.
                </p>
                
                {/* CTA Buttons */}
                <div className="d-flex flex-wrap gap-2 gap-sm-3 mb-5">
                  <button className="btn btn-success rounded-pill px-4 py-2.5 fw-semibold shadow-sm" data-bs-toggle="modal" data-bs-target="#travelerTestModal">
                    Comenzar test
                  </button>
                  <a href="#como-funciona" className="btn btn-outline-success border-2 rounded-pill px-4 py-2.5 fw-semibold text-decoration-none">
                    Cómo funciona
                  </a>
                </div>
                
                {/* Social Proof */}
                <div className="d-flex align-items-center gap-3 mt-4">
                  <div className="d-flex align-items-center">
                    <img src="/images/avatar1.jpg" alt="Avatar" width="38" height="38" className="rounded-circle border border-2 border-white me-n2" />
                    <img src="/images/avatar2.jpg" alt="Avatar" width="38" height="38" className="rounded-circle border border-2 border-white me-n2" />
                    <img src="/images/avatar3.jpg" alt="Avatar" width="38" height="38" className="rounded-circle border border-2 border-white" />
                  </div>
                  <span className="text-body-secondary small fw-semibold">
                    +10000 viajeros encontraron su viaje ideal
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right Column (Carousel) */}
            <div className="col-lg-5 position-relative overflow-hidden px-lg-0">
              <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
                </div>
                
                {/* Carousel Items */}
                <div className="carousel-inner rounded-4 shadow-sm">
                  <div className="carousel-item active">
                    <img src="/images/lago.jpg" alt="Lago" className="d-block w-100 carousel-img" />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/vinedo.jpg" alt="Viñedo" className="d-block w-100 carousel-img" />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/ciudad.jpg" alt="Ciudad" className="d-block w-100 carousel-img" />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/catedral.jpg" alt="Catedral" className="d-block w-100 carousel-img" />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/norte.jpg" alt="Norte" className="d-block w-100 carousel-img" />
                  </div>
                </div>
                
                {/* Carousel Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="border-top py-4 mt-4">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {featuresData.map((f, idx) => (
              <div className="col-xl-3 col-md-6" key={idx}>
                <div className="d-flex align-items-start gap-3">
                  <div className="fs-1 text-success lh-1"><i className={`bi ${f.icon}`}></i></div>
                  <div>
                    <h3 className="fs-6 fw-bold mb-1 text-body-emphasis">{f.title}</h3>
                    <p className="text-body-secondary small mb-0">{f.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS SECTION */}
      <section id="destinos" className="py-5 bg-body-tertiary border-top">
        <div className="container py-4">
          <div className="text-center mb-5 mx-auto col-lg-8">
            <h2 className="display-5 fw-bold mb-3 text-body-emphasis">Destinos turísticos</h2>
            <p className="text-body-secondary fs-5 fw-normal mb-4">
              Explorá la belleza natural y cultural de cada rincón de Argentina.
            </p>
          </div>

          <div className="row justify-content-center mb-5">
            <div className="col-md-6 col-lg-5">
              <div className="input-group shadow-sm rounded-pill overflow-hidden bg-body border border-light">
                <span className="input-group-text bg-body border-0 ps-3">
                  <i className="bi bi-search text-success"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control border-0 py-2 fs-6 shadow-none" 
                  placeholder="Buscar provincia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {!searchTerm && (
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
              {[
                { id: 'destacados', label: 'Destacados' },
                { id: 'noa', label: 'Noroeste (NOA)' },
                { id: 'nea', label: 'Noreste (NEA)' },
                { id: 'cuyo', label: 'Cuyo' },
                { id: 'pampeana', label: 'Pampeana' },
                { id: 'patagonia', label: 'Patagónica' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  className={`btn btn-outline-success rounded-pill px-4 py-2 fw-semibold ${activeRegion === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveRegion(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
            {filteredProvinces.map((p, idx) => (
              <div className="col" key={idx}>
                <div className="card h-100 shadow-sm border-0 bg-white card-destino rounded-4 overflow-hidden">
                  <div style={{ height: '130px', overflow: 'hidden' }}>
                    <img src={`/images/${p.img}`} alt={p.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="card-body d-flex flex-column p-3">
                    <h5 className="card-title fw-bold text-dark mb-2" style={{fontSize: p.name.length > 20 ? '0.95rem' : '1.25rem'}}>{p.name}</h5>
                    <p className="card-text text-secondary small mb-3 flex-grow-1" style={{lineHeight: 1.5}}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="como-funciona" className="py-5 bg-body">
        <div className="container py-4">
          <div className="text-center mb-5 mx-auto col-lg-8">
            <h2 className="display-5 fw-bold mb-4 text-body-emphasis">¿Cómo funciona?</h2>
            <p className="text-body-emphasis fs-5 fw-normal px-lg-5 lh-base">
              ¡Regístrate con tu test de afinidad, reserva los viajes que mejor van contigo y empieza a ganar JeviaPuntos para canjearlos por tu próxima gran aventura!
            </p>
          </div>

          <div className="row position-relative my-5 justify-content-center">
            {stepsData.map((s, idx) => (
              <div className="col-md-3 col-sm-6 text-center mb-5 mb-md-0 position-relative" key={idx}>
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm step-circle bg-success-subtle text-success" style={{width: '70px', height: '70px'}}>
                  {s.iconHTML}
                </div>
                <p className="mt-4 fw-semibold text-body-emphasis fs-6 px-3 lh-sm">{s.text}</p>
                {idx < stepsData.length - 1 && (
                  <div className="d-none d-md-block position-absolute top-50 start-100 translate-middle text-body-tertiary fs-4" style={{zIndex: -1}}>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button className="btn btn-success rounded-pill px-5 py-3 fw-bold fs-4 shadow-sm" data-bs-toggle="modal" data-bs-target="#travelerTestModal">
              Empezar
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonios" className="py-5 bg-body border-top">
        <div className="container py-4">
          <div className="text-center mb-5 mx-auto col-lg-8">
            <h2 className="display-5 fw-bold mb-3 text-body-emphasis">Casos de éxito</h2>
            <p className="text-body-secondary fs-5 fw-normal mb-4">
              Compañeres reales que organizaron su viaje y forjaron una hermosa amistad en el camino.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {testimonialsData.map((t, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-body-tertiary">
                  <div className="card-body p-0 d-flex flex-column h-100">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="rounded-circle border border-2 border-success overflow-hidden testimonial-avatar" style={{width: '50px', height: '50px'}}>
                        <img src={`/images/${t.img}`} alt={t.name} className="w-100 h-100 object-fit-cover" />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0 text-body-emphasis">{t.name}</h5>
                        <span className={`badge bg-${t.badgeColor} bg-opacity-10 text-${t.badgeColor} rounded-pill fw-semibold small`}>{t.badge}</span>
                      </div>
                    </div>
                    <span className="badge bg-body-tertiary text-body-secondary rounded mb-3 text-start px-2 py-1 small w-fit">
                      <i className="bi bi-geo-alt-fill text-danger me-1"></i> {t.location}
                    </span>
                    <p className="text-body-secondary small flex-grow-1 lh-base">{t.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-5 bg-body-tertiary border-top">
        <div className="container py-4">
          <div className="text-center mb-5 mx-auto col-lg-8">
            <h2 className="display-5 fw-bold mb-3 text-body-emphasis">Preguntas Frecuentes</h2>
            <p className="text-body-secondary fs-5 fw-normal mb-4">
              Todo lo que necesitas saber antes de buscar a tu compañere de viaje ideal.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion accordion-flush shadow-sm rounded-4 overflow-hidden border" id="faqAccordion">
                {faqData.map((f, idx) => (
                  <div className="accordion-item" key={idx}>
                    <h2 className="accordion-header" id={`faq-heading-${idx}`}>
                      <button className="accordion-button collapsed fw-semibold text-body-emphasis py-3 small shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={`#faq-collapse-${idx}`} aria-expanded="false" aria-controls={`faq-collapse-${idx}`}>
                        {f.q}
                      </button>
                    </h2>
                    <div id={`faq-collapse-${idx}`} className="accordion-collapse collapse" aria-labelledby={`faq-heading-${idx}`} data-bs-parent="#faqAccordion">
                      <div className="accordion-body text-body-secondary small bg-body lh-lg">
                        {f.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
