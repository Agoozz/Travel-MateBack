import React from 'react';

export default function ProfileHeader({ profile, onEdit }) {
  const {
    nombre = '',
    edad = '',
    ubicacion = '',
    bio = '',
    avatar = 'https://i.pravatar.cc/150?img=12',
    estiloViaje = 'mochilero',
    intereses = []
  } = profile || {};

  const travelStyleLabels = {
    mochilero: "Mochilero/Aventurero",
    confort: "Buscador de Confort y Relax",
    social: "Explorador Social",
    cultural: "Inmersión Cultural"
  };

  const styleLabel = travelStyleLabels[estiloViaje] || "Aventurero";

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden fade-in">
      {/* Portada verde (simulando cover) */}
      <div className="bg-success opacity-25" style={{ height: "120px" }}></div>
      <div className="card-body px-4 pb-4 position-relative" style={{ marginTop: "-60px" }}>
        <div className="row align-items-center g-4">
          <div className="col-md-auto text-center text-md-start">
            <div 
              className="rounded-circle overflow-hidden border border-4 border-white shadow bg-body d-inline-block"
              style={{ width: "120px", height: "120px" }}
            >
              <img
                src={avatar}
                alt="Avatar"
                className="w-100 h-100 object-fit-cover"
                onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?img=12' }}
              />
            </div>
          </div>
          
          <div className="col-md mt-4 mt-md-0 pt-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
              
              <div className="text-center text-md-start mt-2">
                <div className="d-flex flex-column flex-sm-row align-items-center gap-2 justify-content-center justify-content-md-start mb-2">
                  <h1 className="fw-bold text-body-emphasis mb-0 fs-2">{nombre}</h1>
                  {estiloViaje && (
                    <span className="badge bg-success text-white py-2 px-3 rounded-pill fw-semibold text-uppercase small">
                      {styleLabel}
                    </span>
                  )}
                </div>
                
                <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3 text-body-secondary small mb-3">
                  {edad && (
                    <span className="d-flex align-items-center gap-1">
                      <i className="bi bi-calendar-check-fill text-success"></i>
                      <span>{edad} años</span>
                    </span>
                  )}
                  {ubicacion && (
                    <span className="d-flex align-items-center gap-1">
                      <i className="bi bi-geo-alt-fill text-success"></i>
                      <span>{ubicacion}</span>
                    </span>
                  )}
                </div>
                
                {bio && (
                  <p className="text-body-secondary mb-0 fs-6">
                    {bio}
                  </p>
                )}
              </div>
              
              <div className="text-center text-md-end mt-2 flex-shrink-0">
                <button
                  type="button"
                  className="btn btn-outline-success border-2 rounded-pill fw-semibold px-4 py-2"
                  onClick={onEdit}
                >
                  <i className="bi bi-pencil-square me-1"></i> Editar información
                </button>
              </div>
              
            </div>
            
            {Array.isArray(intereses) && intereses.length > 0 && (
              <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 mt-4">
                {intereses.map((interes, idx) => {
                  if (!interes.trim()) return null;
                  return (
                    <span key={idx} className="badge bg-body-secondary text-body-secondary fw-medium rounded-pill px-3 py-2 border">
                      {interes.trim()}
                    </span>
                  );
                })}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
