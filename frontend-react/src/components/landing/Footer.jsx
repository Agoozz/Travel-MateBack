export default function Footer() {
  return (
    <footer className="py-5 bg-body text-body-secondary border-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4 mb-3">
            <h5 className="fw-bold text-body-emphasis mb-3">
              <span className="text-success">Mate</span>
              <span className="text-info">&nbsp;&amp;&nbsp;</span>
              <span className="text-primary">Travel</span>
            </h5>
            <p className="small mb-0">Conectando viajeros por toda Argentina desde 2024.</p>
          </div>
          
          <div className="col-6 col-md-4 mb-3">
            <h5 className="fw-bold text-body-emphasis mb-3">Legal</h5>
            <ul className="nav flex-column small">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary" data-bs-toggle="modal" data-bs-target="#termsModal">Términos y Condiciones</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary" data-bs-toggle="modal" data-bs-target="#privacyModal">Políticas de Privacidad</a></li>
            </ul>
          </div>
          
          <div className="col-6 col-md-4 mb-3">
            <h5 className="fw-bold text-body-emphasis mb-3">Seguinos</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-body-secondary text-decoration-none fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-body-secondary text-decoration-none fs-5"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-body-secondary text-decoration-none fs-5"><i className="bi bi-facebook"></i></a>
            </div>
          </div>
        </div>
        
        <div className="d-flex justify-content-center py-3 my-4 border-top">
          <p className="small mb-0">&copy; 2024 Mate & Travel. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
