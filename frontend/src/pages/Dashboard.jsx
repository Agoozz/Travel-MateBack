import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [sentMates, setSentMates] = useState([]);
  const [companionProfiles, setCompanionProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState([]);
  const navigate = useNavigate();
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [perfilesRes, matchesRes] = await Promise.all([
          api.get('/perfiles'),
          api.get('/matches')
        ]);
        
        // Get IDs of users we already matched with
        const matchedIds = matchesRes.data.matches
          .filter(m => m.estado === 'matched')
          .flatMap(m => [m.usuario1?._id, m.usuario2?._id].filter(Boolean));

        // Get IDs of users we sent a mate to, but haven't matched yet
        const pendingSentIds = matchesRes.data.matches
          .filter(m => m.estado === 'pendiente')
          .filter(m => {
             const isUser1 = m.usuario1?._id === user?._id;
             return (isUser1 && m.usuario1Invito) || (!isUser1 && m.usuario2Invito);
          })
          .map(m => m.usuario1?._id === user?._id ? m.usuario2?._id : m.usuario1?._id)
          .filter(Boolean);

        setSentMates(pendingSentIds);

        // Filter out matched users from companionProfiles
        const availableProfiles = perfilesRes.data.perfiles.filter(p => !matchedIds.includes(p._id));
        
        setCompanionProfiles(availableProfiles);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    if (user?._id) {
      fetchData();
    }
  }, [user]);

  // Handle Match
  const inviteMate = async (profile) => {
    if (sentMates.includes(profile._id)) return;
    setSentMates(prev => [...prev, profile._id]);
    
    try {
      const res = await api.post(`/matches/invitar/${profile._id}`);
      
      // Close profile modal if open, so it doesn't block the screen
      const modalElement = document.getElementById('companionProfileModal');
      if (modalElement) {
        const modalInstance = window.bootstrap?.Modal?.getInstance(modalElement);
        if (modalInstance) modalInstance.hide();
      }

      if (res.data.hayMatch) {
        // Remove the matched user from the dashboard list immediately
        setCompanionProfiles(prev => prev.filter(p => p._id !== profile._id));
        // Trigger match overlay (modal)
        setMatchData(profile);
      }
    } catch (error) {
      console.error('Error inviting mate:', error);
      alert("Error al enviar el mate: " + (error.response?.data?.error || error.message));
      // Revert the sent status so they can try again
      setSentMates(prev => prev.filter(id => id !== profile._id));
    }
  };

  const openProfileModal = (profile) => {
    setSelectedProfile(profile);
    const modalElement = document.getElementById('companionProfileModal');
    if (modalElement) {
      const modalInstance = new window.bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  };

  const toggleFilter = (filterName) => {
    setActiveFilters(prev => 
      prev.includes(filterName) ? prev.filter(f => f !== filterName) : [...prev, filterName]
    );
    setCurrentPage(1);
  };

  const filteredProfiles = companionProfiles.filter(p => {
    // 1. Text Search
    const matchesSearch = searchTerm === '' || 
      p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.destino?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.estiloViaje?.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Quick Filters matching logged-in user's profile
    const matchesEstilo = activeFilters.includes('Mi Estilo') ? p.estiloViaje === user?.estiloViaje : true;
    const matchesPresupuesto = activeFilters.includes('Mi Presupuesto') ? p.presupuesto === user?.presupuesto : true;
    
    let matchesFechas = true;
    if (activeFilters.includes('Mis Fechas') && user?.fechaInicio && user?.fechaFin) {
      const uStart = new Date(user.fechaInicio);
      const uEnd = new Date(user.fechaFin);
      const pStart = p.fechaInicio ? new Date(p.fechaInicio) : null;
      const pEnd = p.fechaFin ? new Date(p.fechaFin) : null;
      if (pStart && pEnd) {
        matchesFechas = (uStart <= pEnd && pStart <= uEnd);
      } else {
        matchesFechas = false;
      }
    } else if (activeFilters.includes('Mis Fechas')) {
      // User hasn't set their dates, so we can't filter by dates
      matchesFechas = false;
    }

    return matchesSearch && matchesEstilo && matchesPresupuesto && matchesFechas;
  });

  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage) || 1;
  const currentProfiles = filteredProfiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset page on search or filter change
  }, [searchTerm, activeFilters]);

  return (
    <div className="container-fluid min-vh-100 bg-body position-relative">
      
      {/* Match Modal (Interactive with Animations) */}
      {matchData && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center react-match-overlay" style={{zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.9)'}}>
          <div className="modal-content bg-dark border-success shadow-lg text-center p-5 rounded-5 react-match-content" style={{maxWidth: '550px', border: '2px solid'}}>
            <h2 className="text-success fw-bold display-3 mb-4 react-match-title" style={{textShadow: '0 0 20px #198754'}}>¡Hay Mate! 🧉</h2>
            <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
              <img src={user?.avatar || '/images/avatar1.jpg'} alt="Yo" className="rounded-circle border border-4 border-white shadow-lg object-fit-cover react-match-avatar-left" width="120" height="120" />
              <i className="bi bi-airplane-fill text-success display-3 react-match-plane" style={{filter: 'drop-shadow(0 0 10px #198754)'}}></i>
              <img src={matchData.avatar} alt="Target" className="rounded-circle border border-4 border-white shadow-lg object-fit-cover react-match-avatar-right" width="120" height="120" />
            </div>
            <p className="text-white fs-4 fw-semibold mb-4 react-match-subtitle">¡Ambos quieren viajar juntos!</p>
            <div className="d-flex gap-3 justify-content-center mt-2 react-match-subtitle">
              <button 
                className="btn btn-outline-light px-4 rounded-pill fw-semibold"
                onClick={() => setMatchData(null)}
              >
                Cerrar
              </button>
              <button 
                className="btn btn-success px-4 rounded-pill fw-bold shadow-sm"
                onClick={() => {
                  setMatchData(null);
                  navigate('/mensajes', { state: { openChatUserId: matchData._id } });
                }}
              >
                <i className="bi bi-chat-dots-fill me-2"></i> Abrir Chat
              </button>
            </div>
          </div>
        </div>
      )}

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
              <Link to="/inicio" className="nav-link active bg-success text-white py-2 px-3 rounded-3">
                <i className="bi bi-compass me-2"></i> Explorar
              </Link>
              <Link to="/perfil" className="nav-link text-body-secondary link-success py-2 px-3 rounded-3">
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
        <main className="col-12 col-lg-7 col-xl-7 p-4 p-md-5 border-end">
          {/* Header Banner */}
          <div className="card bg-success text-white p-3 p-md-4 mb-4 border-0" style={{ backgroundImage: 'linear-gradient(135deg, #059669, #10b981)' }}>
            <div className="row align-items-center">
              <div className="col-lg-7 mb-3 mb-lg-0">
                <h1 className="fw-bold text-white mb-1 fs-4">Encontrá tu compañere para la próxima aventura</h1>
                <p className="text-white text-opacity-90 small mb-0">Hola, <strong>{user?.nombre || 'Viajero'}</strong>. Explorá perfiles compatibles con tu estilo.</p>
              </div>
              <div className="col-lg-5 d-flex justify-content-end align-items-center">
                {/* Search */}
                <div className="input-group rounded-pill overflow-hidden bg-body border-0 shadow-sm me-3">
                  <span className="input-group-text bg-body border-0 px-3"><i className="bi bi-search text-success"></i></span>
                  <input type="text" className="form-control border-0 px-3 shadow-none small" placeholder="¿Adónde viajamos?" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                {/* Notifications removed as requested */}
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="d-flex flex-wrap gap-2 mb-5">
            {['Mis Fechas', 'Mi Estilo', 'Mi Presupuesto'].map((filter, i) => (
              <button 
                key={i} 
                className={`btn rounded-pill px-4 py-2 fw-semibold ${activeFilters.includes(filter) ? 'btn-success text-white shadow-sm' : 'btn-outline-success'}`}
                onClick={() => toggleFilter(filter)}
              >
                {filter} {activeFilters.includes(filter) && <i className="bi bi-check-lg ms-1"></i>}
              </button>
            ))}
            {(searchTerm || activeFilters.length > 0) && (
              <button className="btn btn-outline-danger rounded-pill px-4 py-2 fw-semibold" onClick={() => { setSearchTerm(''); setActiveFilters([]); }}>Limpiar Filtros</button>
            )}
          </div>

          <h3 className="mt-4 mb-4 fw-bold text-body-emphasis fs-5">Compañeres recomendades para vos</h3>

          {/* Users List */}
          <div className="row">
            <div className="col-12">
              {currentProfiles.map(profile => (
                <div key={profile._id} className="card rounded-4 shadow-sm border-0 mb-4 companion-item">
                  <div className="card-body p-0">
                    <div className="row align-items-center p-3 p-md-0">
                      <div className="col-md-3 text-center py-md-4">
                        <img src={profile.avatar} alt={profile.nombre} className="rounded-circle border border-3 border-success-subtle shadow-sm object-fit-cover" width="110" height="110" />
                      </div>
                      <div className="col-md-6 py-2">
                        <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
                          <span className="badge rounded-pill bg-success bg-opacity-10 text-success border border-success border-opacity-10">{profile.afinidad}% Afinidad</span>
                          <h4 className="fw-bold mb-0 text-body-emphasis">{profile.nombre} · {profile.edad}</h4>
                        </div>
                        <p className="text-body-secondary small mb-2"><i className="bi bi-flag-fill"></i> {profile.estiloViaje}</p>
                        <p className="text-body-secondary small mb-2"><i className="bi bi-geo-alt-fill text-success"></i> {profile.ubicacion}</p>
                        <div className="d-flex gap-2 flex-wrap mb-3">
                          <span className="badge rounded-pill bg-body-tertiary text-body-secondary border border-secondary-subtle py-1 px-3 small"><i className="bi bi-map-fill text-success"></i> {profile.destino}</span>
                          <span className="badge rounded-pill bg-body-tertiary text-body-secondary border border-secondary-subtle py-1 px-3 small"><i className="bi bi-backpack-fill text-success"></i> {profile.estiloViaje}</span>
                          <span className="badge rounded-pill bg-body-tertiary text-body-secondary border border-secondary-subtle py-1 px-3 small"><i className="bi bi-cash-stack text-success"></i> {profile.presupuesto}</span>
                        </div>
                        <p className="text-body-secondary small mb-0 lh-sm line-clamp-2">{profile.bio}</p>
                      </div>
                      <div className="col-md-3 text-md-end p-md-4 d-flex flex-column justify-content-center">
                        <button type="button" className="btn btn-outline-success border-2 w-100 mb-2 rounded-pill fw-semibold py-2 btn-sm" onClick={() => openProfileModal(profile)}>
                          Ver perfil
                        </button>
                        <button 
                          className={`btn ${sentMates.includes(profile._id) ? 'btn-secondary' : 'btn-success bg-gradient'} text-white rounded-pill w-100 py-2 btn-sm d-flex align-items-center justify-content-center gap-2`}
                          onClick={() => inviteMate(profile)}
                          disabled={sentMates.includes(profile._id)}
                        >
                          {sentMates.includes(profile._id) ? <><i className="bi bi-check-circle-fill"></i> Enviado</> : <><i className="bi bi-cup-straw"></i> Invitar un mate</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <nav className="mt-5 mb-0">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link border-success text-success fw-semibold shadow-none" onClick={() => goToPage(currentPage - 1)}>Anterior</button>
              </li>
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                    <button className={`page-link border-success ${currentPage === pageNum ? 'bg-success text-white' : 'text-success'} shadow-none`} onClick={() => goToPage(pageNum)}>
                      {pageNum}
                    </button>
                  </li>
                );
              })}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link border-success text-success fw-semibold shadow-none" onClick={() => goToPage(currentPage + 1)}>Siguiente</button>
              </li>
            </ul>
          </nav>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="col-lg-2 col-xl-3 d-none d-xl-flex flex-column gap-4 p-4 p-xl-5 min-vh-100 bg-success-subtle border-start border-success-subtle">
          <div className="card border-0 shadow-sm rounded-4 bg-transparent border-success-subtle">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-4">Destinos Populares 🔥</h6>
              <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom border-success-subtle">
                <img src="/images/mendoza.png" alt="Mendoza" className="rounded-3 shadow-sm object-fit-cover" width="50" height="50" />
                <div>
                  <h6 className="mb-0 fw-bold fs-6">Mendoza</h6>
                  <span className="text-body-secondary small"><i className="bi bi-people-fill text-success"></i> 120 viajeros</span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom border-success-subtle">
                <img src="/images/salta.png" alt="Salta" className="rounded-3 shadow-sm object-fit-cover" width="50" height="50" />
                <div>
                  <h6 className="mb-0 fw-bold fs-6">Salta</h6>
                  <span className="text-body-secondary small"><i className="bi bi-people-fill text-success"></i> 85 viajeros</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Profile Modal */}
      <div className="modal fade" id="companionProfileModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content rounded-4 border-0 shadow-lg">
            <div className="modal-header border-0 px-4 py-3 bg-body-tertiary">
              <div>
                <h5 className="modal-title fw-bold">Perfil del compañere</h5>
                <p className="text-body-secondary small mb-0">Revisa el resumen completo sin salir de la pantalla de matches.</p>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            {selectedProfile && (
              <div className="modal-body px-4 py-4">
                <div className="row g-4">
                  <div className="col-lg-4 text-center">
                    <img src={selectedProfile.avatar} alt="Avatar" className="rounded-circle border border-4 border-success-subtle shadow-sm mb-3" width="150" height="150" />
                    <h4 className="fw-bold mt-3 mb-1">{selectedProfile.nombre} · {selectedProfile.edad}</h4>
                    <p className="text-body-secondary small mb-1"><i className="bi bi-geo-alt-fill text-success"></i> {selectedProfile.ubicacion}</p>
                    <p className="text-body-secondary small mb-2"><i className="bi bi-flag-fill"></i> {selectedProfile.estiloViaje}</p>
                    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                      <span className="badge bg-body-tertiary text-body-secondary border border-secondary-subtle py-2 px-3 small"><i className="bi bi-map-fill text-success"></i> {selectedProfile.destino}</span>
                      <span className="badge bg-body-tertiary text-body-secondary border border-secondary-subtle py-2 px-3 small"><i className="bi bi-backpack-fill text-success"></i> {selectedProfile.estiloViaje}</span>
                    </div>
                    <button className={`btn ${sentMates.includes(selectedProfile._id) ? 'btn-secondary' : 'btn-success'} rounded-pill w-100 py-2 fw-semibold`} onClick={() => inviteMate(selectedProfile)} disabled={sentMates.includes(selectedProfile._id)}>
                      {sentMates.includes(selectedProfile._id) ? 'Mate Enviado' : 'Invitar un mate'}
                    </button>
                  </div>
                  <div className="col-lg-8">
                    <div className="card border-0 rounded-4 bg-body-tertiary p-4">
                      <h5 className="fw-bold mb-3">Sobre mí</h5>
                      <p className="text-body-secondary small mb-4">{selectedProfile.bio}</p>
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <span className="text-body-secondary small">Estilo de viaje</span>
                            <strong className="text-body-emphasis small">{selectedProfile.estiloViaje}</strong>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <span className="text-body-secondary small">Presupuesto</span>
                            <strong className="text-body-emphasis small">{selectedProfile.presupuesto}</strong>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <span className="text-body-secondary small">Fechas</span>
                            <strong className="text-body-emphasis small">{selectedProfile.fechaInicio?.substring(0,10)} al {selectedProfile.fechaFin?.substring(0,10)}</strong>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="d-flex justify-content-between align-items-start gap-2">
                            <span className="text-body-secondary small">Idiomas</span>
                            <strong className="text-body-emphasis small">{(selectedProfile.idiomas || []).join(', ')}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-body-secondary small mb-2">Intereses</p>
                        <div className="d-flex flex-wrap gap-2">
                          {(selectedProfile.intereses || []).map((interest, i) => (
                            <span key={i} className="badge bg-success bg-opacity-10 text-success rounded-pill py-2 px-3 small">{interest}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
