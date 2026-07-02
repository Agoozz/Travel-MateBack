import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (isRegister) {
        const nombre = e.target.registerNombre.value;
        const email = e.target.registerEmail.value;
        const password = e.target.registerPassword.value;
        await register(nombre, email, password);
      } else {
        const email = e.target.loginEmail.value;
        const password = e.target.loginPassword.value;
        await login(email, password);
      }
      navigate('/inicio');
    } catch (error) {
      setErrorMsg(error.response?.data?.error || 'Error de autenticación');
    }
  };

  return (
    <div className="container-fluid min-vh-100 p-0 overflow-hidden position-relative">
      {/* Floating Theme Toggle (Simulated) */}
      <button className="btn btn-light rounded-circle shadow theme-toggle position-fixed top-0 end-0 m-3" title="Cambiar tema">
        <i className="bi bi-moon-fill fs-5"></i>
      </button>

      <div className="row g-0 min-vh-100">
        {/* Left Image Column */}
        <div className="col-lg-4 d-none d-lg-block position-relative">
          <img src="/images/login_left.png" alt="Backpackers" className="position-absolute w-100 h-100 object-fit-cover" />
          <div className="position-absolute w-100 h-100 bg-dark opacity-25"></div>
        </div>
        
        {/* Center Form Column */}
        <div className="col-lg-4 col-md-8 mx-auto d-flex align-items-center bg-body px-4 py-5 shadow-lg z-1">
          <div className="w-100 mx-auto col-xl-10">
            
            {/* Brand Logo */}
            <div className="text-center mb-4">
              <Link className="d-flex align-items-center justify-content-center text-decoration-none fs-3 fw-bold" to="/">
                <span className="text-success">Mate</span>
                <span className="text-info">&nbsp;&amp;&nbsp;</span>
                <span className="text-primary">Travel</span>
              </Link>
            </div>
            
            {/* Title & Subtitle */}
            <h2 className="fw-bold text-body-emphasis text-center mb-1">
              {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </h2>
            <p className="text-body-secondary small text-center mb-4 lh-sm">
              {isRegister ? 'Sumate a la comunidad de viajeros.' : 'Ingresá tus datos para continuar tu aventura.'}
            </p>

            <div id="authFormsContainer">
              {errorMsg && (
                <div className="alert alert-danger py-2 small rounded-3 mb-3 border-0">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>{errorMsg}
                </div>
              )}

              {/* LOGIN FORM */}
              {!isRegister && (
                <form id="loginForm" onSubmit={handleAuthSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Email</label>
                    <input type="email" id="loginEmail" className="form-control rounded-pill px-3 py-2 border-secondary-subtle small" placeholder="nombre@correo.com" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Contraseña</label>
                    <div className="input-group rounded-pill overflow-hidden border border-secondary-subtle">
                      <input type="password" id="loginPassword" className="form-control border-0 px-3 py-2 shadow-none small" placeholder="Tu contraseña" required />
                      <button className="btn btn-link bg-body text-body-secondary border-0 px-3 d-flex align-items-center" type="button">
                        <i className="bi bi-eye-slash-fill"></i>
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success py-2 fw-semibold rounded-pill w-100 mb-3">Ingresar</button>
                  <div className="text-center">
                    <button type="button" className="btn btn-link text-decoration-none small" onClick={() => setIsRegister(true)}>
                      ¿No tienes cuenta? Regístrate
                    </button>
                  </div>
                </form>
              )}
              
              {/* REGISTER FORM */}
              {isRegister && (
                <form id="registerForm" onSubmit={handleAuthSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Nombre Completo</label>
                    <input type="text" id="registerNombre" className="form-control rounded-pill px-3 py-2 border-secondary-subtle small" placeholder="Ej: Sofía Rodríguez" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Email</label>
                    <input type="email" id="registerEmail" className="form-control rounded-pill px-3 py-2 border-secondary-subtle small" placeholder="nombre@correo.com" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Contraseña</label>
                    <div className="input-group rounded-pill overflow-hidden border border-secondary-subtle">
                      <input type="password" id="registerPassword" className="form-control border-0 px-3 py-2 shadow-none small" placeholder="Mínimo 6 caracteres" required minLength="6" />
                      <button className="btn btn-link bg-body text-body-secondary border-0 px-3 d-flex align-items-center" type="button">
                        <i className="bi bi-eye-slash-fill"></i>
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success py-2 fw-semibold rounded-pill w-100 mb-3">Registrarse</button>
                  <div className="text-center">
                    <button type="button" className="btn btn-link text-decoration-none small" onClick={() => setIsRegister(false)}>
                      ¿Ya tienes cuenta? Inicia sesión
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
        
        {/* Right Image Column */}
        <div className="col-lg-4 d-none d-lg-block position-relative">
          <img src="/images/login_right.png" alt="Adventurer" className="position-absolute w-100 h-100 object-fit-cover" />
          <div className="position-absolute w-100 h-100 bg-dark opacity-25"></div>
        </div>

      </div>
    </div>
  );
};

export default Login;
