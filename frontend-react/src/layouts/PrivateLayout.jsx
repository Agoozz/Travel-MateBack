import { useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { AuthContext } from '../context/AuthContext';
import './PrivateLayout.css';

export default function PrivateLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle theme mode globally for the private layout if needed,
  // but keeping it simple for now to not mix logic. We can add a simple toggle.
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="d-flex min-vh-100 bg-body-tertiary">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="main-content flex-grow-1 d-flex flex-column">
        {/* Top Header */}
        <header className="bg-body border-bottom p-3 d-flex align-items-center justify-content-between sticky-top z-3">
          <div className="d-flex align-items-center gap-3">
            <button 
              className="btn btn-light d-lg-none" 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Abrir menú lateral"
            >
              <i className="bi bi-list fs-5"></i>
            </button>
            <h5 className="mb-0 fw-bold d-none d-sm-block text-body-emphasis">Dashboard</h5>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            <button 
              className="btn btn-light rounded-circle shadow-sm theme-toggle-btn"
              onClick={toggleTheme}
              title="Cambiar tema"
              aria-label="Cambiar tema"
            >
              <i className={`bi ${theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill'} fs-6`}></i>
            </button>
            
            <div className="dropdown">
              <button 
                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 rounded-pill shadow-sm" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <img 
                  src={user?.avatar || 'https://i.pravatar.cc/150?img=12'} 
                  alt="Avatar" 
                  className="rounded-circle object-fit-cover"
                  width="32" 
                  height="32" 
                />
                <span className="d-none d-md-block fw-semibold">{user?.nombre || 'Viajero'}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                <li><button className="dropdown-item d-flex align-items-center gap-2 text-danger fw-semibold" onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Cerrar Sesión</button></li>
              </ul>
            </div>
          </div>
        </header>

        {/* Page Content area */}
        <main className="flex-grow-1 p-3 p-md-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
