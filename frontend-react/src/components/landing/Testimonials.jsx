export default function Testimonials() {
  return (
    <section id="testimonios" className="py-5 bg-body border-top">
      <div className="container py-4">
        <div className="text-center mb-5 mx-auto col-lg-8">
          <h2 className="display-5 fw-bold mb-3 text-body-emphasis">Casos de éxito</h2>
          <p className="text-body-secondary fs-5 fw-normal mb-4">
            Compañeres reales que organizaron su viaje y forjaron una hermosa amistad en el camino.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="row g-4 justify-content-center">

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-body-tertiary">
                <div className="card-body p-0 d-flex flex-column h-100">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="rounded-circle border border-2 border-success overflow-hidden testimonial-avatar">
                      <img src="https://i.pravatar.cc/150?img=68" alt="Sofía y Lucas" className="w-100 h-100 object-fit-cover" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-0 text-body-emphasis">Sofía y Lucas</h5>
                      <span className="badge bg-success bg-opacity-10 text-success rounded-pill fw-semibold small">100% Aventureros</span>
                    </div>
                  </div>
                  <span className="badge bg-body-tertiary text-body-secondary rounded mb-3 text-start px-2 py-1 small">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i> El Chaltén, Santa Cruz
                  </span>
                  <p className="text-body-secondary small flex-grow-1 lh-base">
                    "Conocí a Lucas a través de la app. Descubrimos que ambos queríamos hacer el trekking al Fitz Roy pero no nos animábamos solos. ¡Fue el mejor viaje de mi vida y nos hicimos grandes amigos!"
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-body-tertiary">
                <div className="card-body p-0 d-flex flex-column h-100">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="rounded-circle border border-2 border-success overflow-hidden testimonial-avatar">
                      <img src="https://i.pravatar.cc/150?img=45" alt="Julieta y Mateo" className="w-100 h-100 object-fit-cover" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-0 text-body-emphasis">Julieta y Mateo</h5>
                      <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill fw-semibold small">85% Cultura</span>
                    </div>
                  </div>
                  <span className="badge bg-body-tertiary text-body-secondary rounded mb-3 text-start px-2 py-1 small">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i> Cafayate, Salta
                  </span>
                  <p className="text-body-secondary small flex-grow-1 lh-base">
                    "Queríamos recorrer la ruta del vino y conocer bodegas coloniales en el norte argentino. Compartimos gastos de alquiler de auto y hotel. ¡Gran experiencia de compañerismo!"
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm border-0 rounded-4 p-4 bg-body-tertiary">
                <div className="card-body p-0 d-flex flex-column h-100">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="rounded-circle border border-2 border-success overflow-hidden testimonial-avatar">
                      <img src="https://i.pravatar.cc/150?img=15" alt="Camila y Sol" className="w-100 h-100 object-fit-cover" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-0 text-body-emphasis">Camila y Sol</h5>
                      <span className="badge bg-info bg-opacity-10 text-info rounded-pill fw-semibold small">96% Vida Nocturna</span>
                    </div>
                  </div>
                  <span className="badge bg-body-tertiary text-body-secondary rounded mb-3 text-start px-2 py-1 small">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i> Cataratas, Misiones
                  </span>
                  <p className="text-body-secondary small flex-grow-1 lh-base">
                    "Viajamos en Semana Santa para disfrutar del parque nacional de día y recorrer peñas y bares de noche. Fue la mejor decisión, nos divertimos muchísimo."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
