import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-body p-4 rounded-4 shadow-sm border-0">
      <h2 className="fw-bold mb-4 text-body-emphasis">Bienvenido al Dashboard</h2>
      <p className="text-body-secondary fs-5">
        Hola, <strong>{user?.nombre || 'Viajero'}</strong>. Tu sesión está activa.
      </p>
      <div className="alert alert-success d-inline-block mt-3">
        <i className="bi bi-check-circle-fill me-2"></i>
        ¡Las rutas protegidas y la persistencia de sesión funcionan correctamente!
      </div>
    </div>
  );
}
