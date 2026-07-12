import { useState } from 'react';

const ESTILO_LABEL = {
  mochilero: "Mochilero",
  confort: "Confort",
  social: "Social",
  cultural: "Cultural",
};

const PRESUPUESTO_LABEL = {
  economico: "USD 500-900",
  medio: "USD 900-1500",
  premium: "USD 1500+",
};

const TIPO_LABEL = {
  mochilero: "Aventurero Mochilero",
  confort: "Viajero Confort",
  social: "Viajero Social",
  cultural: "Explorador Cultural",
};

export default function ProfileCard({ profile, onViewProfile, onInvite }) {
  const [isInviting, setIsInviting] = useState(false);
  const [inviteStatus, setInviteStatus] = useState("Invitar"); // "Invitar", "Enviando...", "Enviado"

  const handleInvite = async (e) => {
    e.preventDefault();
    if (isInviting || inviteStatus === "Enviado") return;
    
    setIsInviting(true);
    setInviteStatus("Enviando...");
    
    try {
      await onInvite(profile._id, profile);
      setInviteStatus("Enviado");
    } catch {
      setInviteStatus("Enviado"); // En modo local simulamos éxito o si falla falla elegantemente
    } finally {
      setIsInviting(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://i.pravatar.cc/150?img=11";
  };

  return (
    <div className="card rounded-4 shadow-sm border-0 mb-4 companion-item">
      <div className="card-body p-4">
        <div className="row align-items-center">
          <div className="col-md-2 text-center mb-3 mb-md-0">
            <div className="mx-auto">
              <img
                src={profile.avatar || "https://i.pravatar.cc/150?img=11"}
                onError={handleImageError}
                className="rounded-circle object-fit-cover shadow-sm border border-2 border-white avatar-img avatar-lg"
                alt={profile.nombre}
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
              {profile.afinidad !== undefined && (
                <span className="badge rounded-pill bg-success bg-opacity-10 text-success border border-success border-opacity-10 afinidad-badge">
                  {profile.afinidad}% Afinidad
                </span>
              )}
              <h4 className="fw-bold mb-0 text-body-emphasis name-age">
                {profile.nombre} · {profile.edad}
              </h4>
            </div>
            <p className="text-body-secondary small mb-2"><i className="bi bi-flag-fill"></i> <span className="type-text">{TIPO_LABEL[profile.estiloViaje] || "Viajero"}</span></p>
            <p className="text-body-secondary small mb-2">
              <i className="bi bi-geo-alt-fill text-success"></i> <span className="location-text">{profile.ubicacion}</span>
            </p>
            <div className="d-flex gap-2 flex-wrap mb-3">
              <span className="badge rounded-pill bg-body-tertiary text-body-secondary border border-secondary-subtle py-1 px-3 small"><i className="bi bi-map-fill text-success"></i> <span className="destination-text">{profile.destino}</span></span>
              <span className="badge rounded-pill bg-body-tertiary text-body-secondary border border-secondary-subtle py-1 px-3 small"><i className="bi bi-backpack-fill text-success"></i> <span className="style-text">{ESTILO_LABEL[profile.estiloViaje] || ""}</span></span>
              <span className="badge rounded-pill bg-body-tertiary text-body-secondary border border-secondary-subtle py-1 px-3 small"><i className="bi bi-cash-stack text-success"></i> <span className="budget-text">{PRESUPUESTO_LABEL[profile.presupuesto] || ""}</span></span>
            </div>
            <p className="text-body-secondary small mb-0 lh-sm bio-text">{profile.bio}</p>
          </div>
          <div className="col-md-3 text-end mt-3 mt-md-0">
            <button 
              type="button" 
              className="btn btn-outline-success border-2 w-100 mb-2 rounded-pill fw-semibold py-2 btn-sm btn-view-profile"
              onClick={() => onViewProfile(profile)}
            >
              Ver perfil
            </button>
            <button 
              className={`btn ${inviteStatus === 'Enviado' ? 'btn-secondary' : 'btn-success bg-gradient text-white'} rounded-pill w-100 d-flex align-items-center justify-content-center gap-2 py-2 btn-sm btn-invitar`}
              onClick={handleInvite}
              disabled={isInviting || inviteStatus === 'Enviado'}
            >
              {isInviting ? (
                <span className="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
              ) : inviteStatus === 'Enviado' ? (
                <i className="bi bi-check-circle-fill me-1"></i>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="me-1" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><line x1="13" y1="7" x2="18" y2="2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><path d="M6 9c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v3c0 4.4-3.6 7-8 7s-8-2.6-8-7V9zm2 .5H16V12c0 3.3-2.7 5-6 5s-6-1.7-6-5V9.5z" fillRule="evenodd"/></svg>
              )}
              {inviteStatus === 'Invitar' ? 'Invitar un mate' : inviteStatus}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
