export default function FAQ() {
  return (
    <section id="faq" className="py-5 bg-body-tertiary border-top">
      <div className="container py-4">
        <div className="text-center mb-5 mx-auto col-lg-8">
          <h2 className="display-5 fw-bold mb-3 text-body-emphasis">Preguntas Frecuentes</h2>
          <p className="text-body-secondary fs-5 fw-normal mb-4">
            Todo lo que necesitas saber antes de buscar a tu compa de ruta ideal.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion accordion-flush bg-transparent" id="faqAccordion">
              
              <div className="accordion-item bg-transparent border-bottom">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed bg-transparent text-body-emphasis fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="false" aria-controls="faq1">
                    ¿Es gratis usar la plataforma?
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-body-secondary">
                    Sí, registrarte, hacer el test de viajero y chatear con otros usuarios es 100% gratuito. Nuestro objetivo es que la comunidad de viajeros siga creciendo.
                  </div>
                </div>
              </div>

              <div className="accordion-item bg-transparent border-bottom">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed bg-transparent text-body-emphasis fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">
                    ¿Cómo funciona el Test de Compatibilidad?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-body-secondary">
                    Te hacemos unas pocas preguntas clave sobre tus gustos (si preferís hotel o carpa, boliche o peña, etc). Con eso calculamos un porcentaje de afinidad con el resto de la comunidad.
                  </div>
                </div>
              </div>

              <div className="accordion-item bg-transparent border-bottom">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed bg-transparent text-body-emphasis fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">
                    ¿Es seguro viajar con desconocidos?
                  </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-body-secondary">
                    Fomentamos que primero se conozcan bien por el chat de la app, que intercambien redes sociales y, de ser posible, se junten a tomar un café en un lugar público antes de planear el viaje definitivo.
                  </div>
                </div>
              </div>

              <div className="accordion-item bg-transparent border-bottom">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed bg-transparent text-body-emphasis fw-bold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false" aria-controls="faq4">
                    ¿Qué pasa si finalmente el viaje no se da?
                  </button>
                </h2>
                <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body text-body-secondary">
                    ¡No pasa nada! La planificación corre por cuenta de ustedes. Nosotros somos simplemente el nexo inicial para que se conozcan.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
