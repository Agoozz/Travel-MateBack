import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container py-5 text-center mt-5">
      <h1 className="display-5 fw-bold mb-4">Bienvenido al Dashboard</h1>
      <p className="fs-5 text-body-secondary mb-4">
        Hola, <strong>{user?.nombre || 'Viajero'}</strong>. Tu sesión está activa.
      </p>
      <button onClick={handleLogout} className="btn btn-danger px-4 py-2 rounded-pill shadow-sm">
        Cerrar Sesión
      </button>
    </div>
  );
}
