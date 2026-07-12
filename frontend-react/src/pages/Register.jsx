import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import { authService } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (nombre, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register({ nombre, email, password });
      
      // En modo local (y también con backend real si responde de inmediato)
      // simulamos el mismo flujo que Vanilla: Guardar sesión y redirigir
      login(data.token, data.usuario);
      navigate('/onboarding');
    } catch (err) {
      setError(err.message || "Ocurrió un error. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Registrarse"
      subtitle="Creá tu cuenta gratis para guardar tu perfil."
    >
      <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
    </AuthLayout>
  );
}
