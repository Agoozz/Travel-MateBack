export default function ProfileSummary({ profile, onTakeTest }) {
  const getTravelStyleLabel = (key) => {
    return {
      mochilero: "Mochilero",
      hotel: "Lujo / Confort",
      organizado: "Planificado",
      confort: "Confort",
      social: "Social",
      cultural: "Cultural"
    }[key] || key || "A definir";
  };

  const getBudgetLabel = (key) => {
    return {
      economico: "Económico (USD 500 - 1000)",
      medio: "Moderado (USD 1000 - 1800)",
      premium: "Premium (USD 2000+)"
    }[key] || "A definir";
  };

  const formatDates = (start, end) => {
    if (!start || !end) return "Fechas a definir";
    const parse = (d) => {
      const [, m, day] = d.split('-');
      const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      return { day: parseInt(day, 10), monthStr: meses[parseInt(m, 10) - 1] };
    };
    try {
      const pStart = parse(start);
      const pEnd = parse(end);
      if (pStart.monthStr === pEnd.monthStr) {
        return `${String(pStart.day).padStart(2, '0')} - ${String(pEnd.day).padStart(2, '0')} ${pStart.monthStr}`;
      }
      return `${String(pStart.day).padStart(2, '0')} ${pStart.monthStr} - ${String(pEnd.day).padStart(2, '0')} ${pEnd.monthStr}`;
    } catch {
      return "Fechas a definir";
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold text-body-emphasis mb-0">Mi Perfil</h5>
          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill">
            <i className="bi bi-person-check-fill me-1"></i> Viajero Activo
          </span>
        </div>

        <div className="text-center mb-4 pb-3 border-bottom">
          <div className="position-relative d-inline-block mb-3">
            <img 
              src={profile.avatar || "https://i.pravatar.cc/150?img=12"} 
              className="rounded-circle border border-4 border-success shadow-sm object-fit-cover" 
              alt="Avatar del usuario" 
              style={{ width: "130px", height: "130px" }}
              onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=12"; }}
            />
            <button 
              type="button" 
              className="btn btn-success btn-sm position-absolute bottom-0 end-0 rounded-circle shadow" 
              style={{ width: "36px", height: "36px" }}
              data-bs-toggle="modal" 
              data-bs-target="#editProfileInfoModal"
              aria-label="Editar información básica"
            >
              <i className="bi bi-pencil-fill"></i>
            </button>
          </div>
          <h4 className="fw-bold text-body-emphasis mb-1">
            {profile.nombre || "Compañere"} 
          </h4>
          <p className="text-body-secondary mb-2">
            <i className="bi bi-geo-alt-fill me-1 text-success"></i> 
            {profile.ubicacion || "Ubicación a definir"}
          </p>
          <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-2 rounded-pill">
            {getTravelStyleLabel(profile.estiloViaje)}
          </span>
        </div>

        <div className="mb-4">
          <h6 className="fw-bold text-body-emphasis mb-3">Tu biografía</h6>
          <p className="text-body-secondary small p-3 bg-body-tertiary rounded-3 border">
            {profile.bio || "Todavía no escribiste tu biografía."}
          </p>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold text-body-emphasis mb-0">Detalles del Próximo Viaje</h6>
            <button 
              type="button" 
              className="btn btn-outline-success btn-sm rounded-pill px-3"
              data-bs-toggle="modal" 
              data-bs-target="#editTripDetailsModal"
            >
              <i className="bi bi-pencil me-1"></i> Editar
            </button>
          </div>
          
          <ul className="list-group list-group-flush border-top">
            <li className="list-group-item px-0 py-3 d-flex align-items-center bg-transparent">
              <div className="bg-success bg-opacity-10 p-2 rounded-3 me-3 text-success">
                <i className="bi bi-map-fill"></i>
              </div>
              <div>
                <small className="text-body-tertiary d-block">Destino principal</small>
                <span className="fw-semibold text-body-secondary">{profile.destino || "A definir"}</span>
              </div>
            </li>
            <li className="list-group-item px-0 py-3 d-flex align-items-center bg-transparent">
              <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3 text-primary">
                <i className="bi bi-calendar-check-fill"></i>
              </div>
              <div>
                <small className="text-body-tertiary d-block">Fechas estimadas</small>
                <span className="fw-semibold text-body-secondary">{formatDates(profile.fechaInicio, profile.fechaFin)}</span>
              </div>
            </li>
            <li className="list-group-item px-0 py-3 d-flex align-items-center bg-transparent">
              <div className="bg-warning bg-opacity-10 p-2 rounded-3 me-3 text-warning">
                <i className="bi bi-cash-stack"></i>
              </div>
              <div>
                <small className="text-body-tertiary d-block">Presupuesto</small>
                <span className="fw-semibold text-body-secondary">{getBudgetLabel(profile.presupuesto)}</span>
              </div>
            </li>
            <li className="list-group-item px-0 py-3 d-flex align-items-center bg-transparent border-bottom">
              <div className="bg-info bg-opacity-10 p-2 rounded-3 me-3 text-info">
                <i className="bi bi-translate"></i>
              </div>
              <div>
                <small className="text-body-tertiary d-block">Idiomas</small>
                <span className="fw-semibold text-body-secondary">{profile.idiomas || "A definir"}</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="card bg-success bg-opacity-10 border-success border-opacity-25 rounded-4 overflow-hidden mb-0">
          <div className="card-body p-4 text-center">
            <h6 className="fw-bold text-success mb-2">¿No sabés a dónde ir?</h6>
            <p className="text-success text-opacity-75 small mb-3">
              Descubrí tu estilo ideal y obtené recomendaciones personalizadas de destinos y compañeros.
            </p>
            <button 
              className="btn btn-success rounded-pill fw-semibold shadow-sm w-100 py-2"
              onClick={onTakeTest}
            >
              <i className="bi bi-magic me-2"></i>Hacer Test de Viajero
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
