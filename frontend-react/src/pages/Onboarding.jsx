import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TravelerTestModal from '../components/traveler-test/TravelerTestModal';
import { fetchAPI } from '../services/api';

export default function Onboarding() {
  const { user, updateUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  // Check if profile is already complete, if so redirect to dashboard
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userData = await fetchAPI('/usuarios/me');
        updateUser(userData);
        if (userData.progresoPerfil === 100) {
          navigate('/dashboard', { replace: true });
        } else {
          setVerifying(false);
        }
      } catch (error) {
        console.warn("Error verifying user session:", error);
        logout();
        navigate('/login', { replace: true });
      }
    };
    verifyUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTestComplete = (updatedUser) => {
    console.log("Onboarding completion payload received:", updatedUser);
    if (updatedUser && updatedUser.progresoPerfil === 100) {
      updateUser(updatedUser);
      navigate('/dashboard', { replace: true });
    } else {
      alert(`No se pudo completar el perfil (Progreso reportado: ${updatedUser?.progresoPerfil || 0}%). Por favor, intenta de nuevo o verifica tu conexión.`);
    }
  };

  if (verifying) {
    return (
      <div className="min-vh-100 bg-success-subtle d-flex justify-content-center align-items-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Verificando sesión...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-success-subtle d-flex flex-column justify-content-center align-items-center py-5">
      <div className="container text-center mb-4">
        <h2 className="fw-bold text-success mb-2">¡Bienvenido a Mate & Travel!</h2>
        <p className="text-body-secondary fs-5">
          Para continuar y encontrar a tu compañere ideal, necesitamos conocerte un poco mejor.
        </p>
      </div>

      <div className="w-100 position-relative" style={{ minHeight: '600px' }}>
        <TravelerTestModal 
          show={true} 
          onClose={() => {}} 
          onComplete={handleTestComplete}
          isOnboarding={true}
        />
      </div>
    </div>
  );
}
