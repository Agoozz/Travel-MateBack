import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated but hasn't completed the profile,
  // force them to /onboarding unless they are already there.
  // Exception: we also let them go to /profile if we want, but user said:
  // "Las rutas /dashboard y /messages deben redirigir al onboarding cuando el perfil esté incompleto.
  // /profile puede quedar accesible solamente si eso no permite saltear el flujo obligatorio."
  // It's safer to just force /onboarding everywhere in PrivateLayout if incomplete.
  if (user && user.progresoPerfil < 100 && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
