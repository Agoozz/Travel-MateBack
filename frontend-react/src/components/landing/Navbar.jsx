import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3 sticky-top bg-body shadow-sm">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center text-decoration-none" to="/">
          <span className="fw-bold fs-3 text-success">Mate</span>
          <span className="fs-4 text-info">&nbsp;&amp;&nbsp;</span>
          <span className="fw-bold fs-3 text-primary">Travel</span>
        </Link>
        
        {/* Mobile Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar links */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-2 my-2 my-lg-0">
            <li className="nav-item">
              <a className="nav-link px-3 active" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3 text-nowrap" href="#como-funciona">Cómo funciona</a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#destinos">Destinos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3 text-nowrap" href="#faq">Preguntas Frecuentes</a>
            </li>
          </ul>
          
          <div className="d-flex align-items-center gap-3">
            <Link to="/login" className="btn btn-success rounded-pill px-4 py-2 fw-semibold text-decoration-none text-white">Ingresar</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
