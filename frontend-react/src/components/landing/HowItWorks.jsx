import { Link } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-5 bg-body">
      <div className="container py-4">
        {/* Header Centered */}
        <div className="text-center mb-5 mx-auto col-lg-8">
          <h2 className="display-5 fw-bold mb-4 text-body-emphasis">¿Cómo funciona?</h2>
          <p className="text-body-emphasis fs-5 fw-normal px-lg-5 lh-base">
            ¡Regístrate con tu test de afinidad, encuentra compañeros compatibles y empieza a prepararte para tu próxima gran aventura!
          </p>
        </div>

        {/* Steps Workflow Grid */}
        <div className="row position-relative my-5 justify-content-center">
          <div className="row position-relative my-5 justify-content-center">
            
            <div className="col-md-3 col-sm-6 text-center mb-5 mb-md-0 position-relative">
              <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm bg-success-subtle text-success step-icon-wrapper">
                <i className="bi bi-pencil-square fs-3"></i>
              </div>
              <p className="mt-4 fw-semibold text-body-emphasis fs-6 px-3 lh-sm">Completa tus datos y crea tu cuenta</p>
              <div className="d-none d-md-block position-absolute top-50 start-100 translate-middle text-body-tertiary fs-4 z-n1">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6 text-center mb-5 mb-md-0 position-relative">
              <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm bg-success-subtle text-success step-icon-wrapper">
                <i className="bi bi-person-fill-add fs-3"></i>
              </div>
              <p className="mt-4 fw-semibold text-body-emphasis fs-6 px-3 lh-sm">Descubre qué viajeros hay disponibles</p>
              <div className="d-none d-md-block position-absolute top-50 start-100 translate-middle text-body-tertiary fs-4 z-n1">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6 text-center mb-5 mb-md-0 position-relative">
              <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm bg-success-subtle text-success step-icon-wrapper">
                <i className="bi bi-chat-dots fs-3"></i>
              </div>
              <p className="mt-4 fw-semibold text-body-emphasis fs-6 px-3 lh-sm">Chatea y armen un plan de viaje juntos</p>
              <div className="d-none d-md-block position-absolute top-50 start-100 translate-middle text-body-tertiary fs-4 z-n1">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6 text-center mb-5 mb-md-0 position-relative">
              <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm bg-success-subtle text-success step-icon-wrapper">
                <i className="bi bi-airplane-engines fs-3"></i>
              </div>
              <p className="mt-4 fw-semibold text-body-emphasis fs-6 px-3 lh-sm">¡Prepara las valijas y a disfrutar!</p>
            </div>
            
          </div>
        </div>

        {/* CTA Empezar Button Centered */}
        <div className="text-center mt-5">
          <Link to="/register" className="btn btn-success rounded-pill px-5 py-3 fw-bold fs-4 shadow-sm">
            Empezar
          </Link>
        </div>
      </div>
    </section>
  );
}
