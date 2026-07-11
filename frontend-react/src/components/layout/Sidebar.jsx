import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="sidebar-backdrop d-lg-none" 
          onClick={onClose}
          aria-label="Cerrar menú lateral"
        ></div>
      )}
      
      <aside className={`sidebar bg-body border-end d-flex flex-column transition-transform ${isOpen ? 'show' : ''}`}>
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
          <NavLink to="/dashboard" className="text-decoration-none fs-4 fw-bold">
            <span className="text-success">Mate</span>
            <span className="text-info">&nbsp;&amp;&nbsp;</span>
            <span className="text-primary">Travel</span>
          </NavLink>
          {/* Close button for mobile */}
          <button 
            className="btn btn-link text-body-secondary d-lg-none p-0" 
            onClick={onClose}
            aria-label="Cerrar menú lateral"
          >
            <i className="bi bi-x-lg fs-5"></i>
          </button>
        </div>

        <nav className="flex-grow-1 p-3">
          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${isActive ? 'active bg-success text-white' : 'text-body-secondary hover-bg-light'}`}
                onClick={onClose}
              >
                <i className="bi bi-house-door-fill fs-5" aria-hidden="true"></i>
                <span className="fw-semibold">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/profile" 
                className={({ isActive }) => `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${isActive ? 'active bg-success text-white' : 'text-body-secondary hover-bg-light'}`}
                onClick={onClose}
              >
                <i className="bi bi-person-circle fs-5" aria-hidden="true"></i>
                <span className="fw-semibold">Mi Perfil</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/messages" 
                className={({ isActive }) => `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 ${isActive ? 'active bg-success text-white' : 'text-body-secondary hover-bg-light'}`}
                onClick={onClose}
              >
                <i className="bi bi-chat-dots-fill fs-5" aria-hidden="true"></i>
                <span className="fw-semibold">Mensajes</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
