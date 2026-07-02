import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3 sticky-top bg-body shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center text-decoration-none" to="/">
          <span className="fw-bold fs-3 text-success">Mate</span>
          <span className="fs-4 text-info">&nbsp;&amp;&nbsp;</span>
          <span className="fw-bold fs-3 text-primary">Travel</span>
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-2 my-2 my-lg-0">
            {isLanding ? (
              <>
                <li className="nav-item"><a className="nav-link px-3 active" href="#">Inicio</a></li>
                <li className="nav-item"><a className="nav-link px-3 text-nowrap" href="#como-funciona">Cómo funciona</a></li>
                <li className="nav-item"><a className="nav-link px-3" href="#destinos">Destinos</a></li>
                <li className="nav-item">
                  <a className="nav-link px-3 text-nowrap" href="#" data-bs-toggle="modal" data-bs-target="#travelerTestModal" style={{cursor: 'pointer'}}>
                    Test de viajero
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link px-3 active" to="/">Inicio</Link></li>
                <li className="nav-item"><Link className="nav-link px-3" to="/inicio">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link px-3" to="/mensajes">Mensajes</Link></li>
                <li className="nav-item"><Link className="nav-link px-3" to="/perfil">Perfil</Link></li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-link text-decoration-none theme-toggle p-2" onClick={toggleTheme} title="Cambiar tema">
              <i className={`bi fs-5 ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-fill text-secondary'}`}></i>
            </button>
            <Link to="/login" className="btn btn-success rounded-pill px-4 py-2 fw-semibold text-white text-decoration-none">Ingresar</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
