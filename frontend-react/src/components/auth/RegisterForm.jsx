import { useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordField from './PasswordField';

export default function RegisterForm({ onSubmit, loading, error }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      // Small manual validation handled by parent or here.
      // But we have required on the input anyway.
    }
    onSubmit(nombre, email, password);
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
          <label className="form-label small fw-semibold text-body-secondary mb-1">Nombre Completo</label>
          <input
            type="text"
            className="form-control rounded-pill px-3 py-2 border-secondary-subtle small"
            placeholder="Ej: Sofía Rodríguez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        
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
            id="registerPassword"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        
        <div className="mb-4">
          <div className="form-check d-flex align-items-start gap-2">
            <input
              className="form-check-input mt-1"
              type="checkbox"
              id="authTermsCheck"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <label className="form-check-label text-body-secondary small lh-sm" htmlFor="authTermsCheck">
              Acepto los{' '}
              <a href="#" className="text-success text-decoration-none fw-semibold" data-bs-toggle="modal" data-bs-target="#termsModal">
                Términos y Condiciones
              </a>{' '}
              y la{' '}
              <a href="#" className="text-success text-decoration-none fw-semibold" data-bs-toggle="modal" data-bs-target="#privacyModal">
                Política de Privacidad
              </a>.
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          className="btn btn-success py-2 fw-semibold rounded-pill w-100"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Registrarse y guardar perfil'}
        </button>
      </form>

      <p className="text-center mt-4 small text-body-secondary">
        ¿Ya tenés una cuenta?{' '}
        <Link to="/login" className="text-success text-decoration-none fw-bold">
          Ingresá acá
        </Link>
      </p>

      {/* Modals for Terms and Privacy */}
      <div className="modal fade" id="termsModal" tabIndex="-1" aria-labelledby="termsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 rounded-4 shadow-lg">
            <div className="modal-header border-0 px-4 py-3 bg-body-tertiary justify-content-between">
              <h5 className="modal-title fw-bold text-body-emphasis" id="termsModalLabel">Términos y Condiciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body px-4 py-3 text-body-secondary small lh-base">
              <p>¡Hola! Te damos la bienvenida a Mate & Travel. Al usar nuestra plataforma para buscar compañeres de ruta, estás aceptando tratar a todes con respeto, buena onda y honestidad. Queda estrictamente prohibido cualquier contenido ofensivo, comercial o de citas románticas. ¡Hagamos de los viajes un espacio de amistad seguro y divertido!</p>
            </div>
            <div className="modal-footer border-0 px-4 py-3 bg-body-tertiary">
              <button type="button" className="btn btn-success px-4 py-1 fw-semibold rounded-pill btn-sm" data-bs-dismiss="modal">Entendido</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="privacyModal" tabIndex="-1" aria-labelledby="privacyModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 rounded-4 shadow-lg">
            <div className="modal-header border-0 px-4 py-3 bg-body-tertiary justify-content-between">
              <h5 className="modal-title fw-bold text-body-emphasis" id="privacyModalLabel">Política de Privacidad</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body px-4 py-3 text-body-secondary small lh-base">
              <p>En Mate & Travel cuidamos tus datos. Solo recopilamos tu correo, nombre y respuestas de estilo de viaje para ayudarte a encontrar el compañere ideal. No compartimos tu información con terceros con fines publicitarios. Podés editar o eliminar tu perfil cuando quieras.</p>
            </div>
            <div className="modal-footer border-0 px-4 py-3 bg-body-tertiary">
              <button type="button" className="btn btn-success px-4 py-1 fw-semibold rounded-pill btn-sm" data-bs-dismiss="modal">Entendido</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
