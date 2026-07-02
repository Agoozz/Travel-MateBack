const Footer = () => {
  return (
    <footer className="bg-body border-top py-5 text-body-secondary mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3 text-success">Mate &amp; Travel</h5>
            <p className="small text-body-secondary lh-base">
              Conectamos compañeres de viaje afines en base a su estilo de aventura, presupuesto y afinidad, promoviendo viajes grupales y de amistad seguros de forma inclusiva y transparente.
            </p>
            <p className="small text-body-secondary mb-0">© 2026 Mate &amp; Travel. Todos los derechos reservados.</p>
          </div>
          <div className="col-lg-4">
            <h6 className="fw-bold text-uppercase mb-3 small text-body-emphasis letter-spacing-1">Enlaces rápidos</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#" className="text-body-secondary text-decoration-none hover-link">Inicio</a></li>
              <li><a href="#" className="text-body-secondary text-decoration-none hover-link">Cómo funciona</a></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h6 className="fw-bold text-uppercase mb-3 small text-body-emphasis letter-spacing-1">Legales y Soporte</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><a href="#" className="text-body-secondary text-decoration-none hover-link">Términos y Condiciones</a></li>
              <li><a href="#" className="text-body-secondary text-decoration-none hover-link">Política de Privacidad</a></li>
              <li><span className="text-body-secondary"><i className="bi bi-envelope-fill text-success me-2"></i>soporte@mateandtravel.com</span></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
