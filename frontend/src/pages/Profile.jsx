import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import TravelerTestModal from '../components/TravelerTestModal';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    bio: '',
    estiloViaje: '',
    presupuesto: '',
    disponibilidad: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        ubicacion: user.ubicacion || '',
        bio: user.bio || '',
        estiloViaje: user.estiloViaje || 'Mochilero',
        presupuesto: user.presupuesto || 'Gasolero',
        disponibilidad: user.disponibilidad || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.put('/perfiles/me', formData);
      updateUser(res.data.usuario);
      alert('¡Perfil actualizado con éxito!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Hubo un error al actualizar el perfil.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestComplete = async (result, answers) => {
    // Map test answers to form state
    let profileKey = 'mochilero';
    if (answers.tipoViaje === 'hotel' || answers.presupuesto === 'premium') profileKey = 'confort';
    else if (answers.companero === 'fiesta') profileKey = 'social';
    else if (answers.tipoViaje === 'organizado') profileKey = 'cultural';
    else if (answers.tipoViaje === 'mochilero') profileKey = 'aventura';

    const newData = {
      ...formData,
      estiloViaje: profileKey,
      presupuesto: answers.presupuesto || 'economico',
      fechaInicio: answers.fechaInicio || '',
      fechaFin: answers.fechaFin || ''
    };
    
    setFormData(newData);
    
    // Auto-save the new test preferences
    try {
      setIsSaving(true);
      const res = await api.put('/perfiles/me', newData);
      updateUser(res.data.usuario);
      alert('¡Resultados del test guardados con éxito!');
    } catch (error) {
      console.error('Error auto-saving profile after test:', error);
      alert('Hubo un error al guardar los resultados del test.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-body">
      <div className="row">
        {/* SIDEBAR */}
        <aside className="col-lg-3 col-xl-2 bg-success-subtle border-end border-success-subtle min-vh-100 p-4 d-flex flex-column justify-content-between d-none d-lg-flex">
          <div>
            <div className="d-flex align-items-center gap-1 mb-2">
              <h3 className="fw-bold mb-0 fs-5"><span className="text-success">Mate</span> &amp; Travel</h3>
            </div>
            <p className="text-body-secondary small mb-4 lh-sm">
              Compañeres de viaje,<br />mejores recuerdos
            </p>

            <nav className="nav flex-column nav-pills gap-1">
              <Link to="/inicio" className="nav-link text-body-secondary link-success py-2 px-3 rounded-3">
                <i className="bi bi-compass me-2"></i> Explorar
              </Link>
              <Link to="/perfil" className="nav-link active bg-success text-white py-2 px-3 rounded-3">
                <i className="bi bi-person-circle me-2"></i> Mi Perfil
              </Link>
              <Link to="/mensajes" className="nav-link text-body-secondary link-success py-2 px-3 rounded-3">
                <i className="bi bi-chat-left-text me-2"></i> Mensajes
              </Link>
              <hr className="my-2 border-secondary opacity-25" />
              <Link to="/" className="nav-link text-danger link-danger py-2 px-3 rounded-3 mt-1 fw-semibold">
                <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
              </Link>
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-12 col-lg-9 col-xl-10 p-4 p-md-5">
          <div className="row justify-content-center">
            <div className="col-md-10 col-xl-8">
              <h2 className="fw-bold mb-4">Mi Perfil</h2>
              
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4 p-md-5">
                  <div className="d-flex flex-column flex-md-row align-items-center gap-4 mb-4">
                    <img src={user?.avatar || "/images/avatar1.jpg"} alt="Mi Avatar" className="rounded-circle border border-4 border-success-subtle shadow-sm object-fit-cover" width="120" height="120" />
                    <div className="text-center text-md-start">
                      <h3 className="fw-bold mb-1">{user?.nombre || "Nombre del Viajero"}</h3>
                      <p className="text-body-secondary mb-2"><i className="bi bi-geo-alt-fill text-success"></i> {user?.ubicacion || "Buenos Aires, Argentina"}</p>
                      <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fw-semibold">
                        <i className="bi bi-award-fill"></i> Perfil: {user?.estiloViaje ? user.estiloViaje.charAt(0).toUpperCase() + user.estiloViaje.slice(1) : "Aventurero"}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSave}>
                    <h5 className="fw-bold mb-3 border-bottom pb-2">Datos Personales</h5>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Nombre Completo</label>
                        <input type="text" name="nombre" className="form-control rounded-pill px-3" value={formData.nombre} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold">Ubicación</label>
                        <input type="text" name="ubicacion" className="form-control rounded-pill px-3" value={formData.ubicacion} onChange={handleChange} />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-semibold">Biografía (Sobre mí)</label>
                        <textarea name="bio" className="form-control rounded-4 p-3" rows="3" value={formData.bio} onChange={handleChange}></textarea>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                      <h5 className="fw-bold mb-0">Preferencias de Viaje</h5>
                      <button type="button" className="btn btn-sm btn-outline-success rounded-pill fw-semibold" data-bs-toggle="modal" data-bs-target="#travelerTestModalProfile">
                        <i className="bi bi-magic me-1"></i> Rehacer Test
                      </button>
                    </div>
                    <div className="row g-3 mb-4">
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">Estilo principal</label>
                        <select name="estiloViaje" className="form-select rounded-pill px-3" value={formData.estiloViaje} onChange={handleChange}>
                          <option value="mochilero">Mochilero</option>
                          <option value="confort">Confort</option>
                          <option value="aventura">Aventura</option>
                          <option value="cultural">Cultural</option>
                          <option value="social">Social</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">Presupuesto</label>
                        <select name="presupuesto" className="form-select rounded-pill px-3" value={formData.presupuesto} onChange={handleChange}>
                          <option value="economico">Gasolero</option>
                          <option value="medio">Medio</option>
                          <option value="premium">Premium</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold">Disponibilidad</label>
                        <input type="text" name="disponibilidad" className="form-control rounded-pill px-3" value={formData.disponibilidad} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                      <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setFormData(user || {})}>Deshacer</button>
                      <button type="submit" id="btnGuardarPerfil" className="btn btn-success rounded-pill px-4 fw-semibold" disabled={isSaving}>
                        {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Test Modal for Profile Mode */}
      <TravelerTestModal modalId="travelerTestModalProfile" isProfileMode={true} onComplete={handleTestComplete} />

      {/* Mobile Nav */}
      <nav className="navbar fixed-bottom bg-body border-top d-lg-none p-2 shadow-lg">
        <div className="container-fluid justify-content-around">
          <Link to="/inicio" className="text-body-secondary text-center text-decoration-none">
            <i className="bi bi-compass fs-4 d-block"></i>
          </Link>
          <Link to="/mensajes" className="text-body-secondary text-center text-decoration-none">
            <i className="bi bi-chat-left-text fs-4 d-block"></i>
          </Link>
          <Link to="/perfil" className="text-success text-center text-decoration-none">
            <i className="bi bi-person-circle fs-4 d-block"></i>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Profile;
