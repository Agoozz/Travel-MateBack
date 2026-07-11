import { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordField from './PasswordField';

export default function LoginForm({ onSubmit, loading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <>
      {error && (
        <div className="alert alert-danger py-2 small mt-3 rounded-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label small fw-semibold text-body-secondary mb-1">Email</label>
          <input
            type="email"
            className="form-control rounded-pill px-3 py-2 border-secondary-subtle small"
            placeholder="nombre@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label small fw-semibold text-body-secondary mb-1">Contraseña</label>
          <PasswordField
            id="loginPassword"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-success py-2 fw-semibold rounded-pill w-100"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>

      <p className="text-center mt-4 small text-body-secondary">
        ¿No tenés una cuenta?{' '}
        <Link to="/register" className="text-success text-decoration-none fw-bold">
          Registrate acá
        </Link>
      </p>
    </>
  );
}
