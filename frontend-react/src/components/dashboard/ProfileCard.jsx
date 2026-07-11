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
    <div className="card h-100 border-0 shadow-sm rounded-4 hover-shadow transition-all overflow-hidden companion-item">
      <div className="position-relative">
        <img
          src={profile.avatar || "https://i.pravatar.cc/150?img=11"}
          className="card-img-top object-fit-cover avatar-img"
          alt={profile.nombre}
          style={{ height: "200px" }}
          onError={handleImageError}
        />
        {profile.afinidad !== undefined && (
          <span className="position-absolute top-0 end-0 m-3 badge bg-success bg-opacity-75 rounded-pill px-3 py-2 border border-light border-opacity-25 shadow-sm text-white afinidad-badge">
            {profile.afinidad}% Afinidad
          </span>
        )}
      </div>
      <div className="card-body p-4 d-flex flex-column">
        <h4 className="fw-bold text-body-emphasis mb-1 name-age">
          {profile.nombre} · {profile.edad}
        </h4>
        <p className="text-success fw-semibold small mb-3 type-text">
          {TIPO_LABEL[profile.estiloViaje] || "Viajero"}
        </p>
        
        <div className="d-flex flex-column gap-2 mb-4 text-body-secondary small">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-geo-alt-fill text-primary"></i>
            <span className="location-text">{profile.ubicacion}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-map-fill text-info"></i>
            <span className="destination-text">{profile.destino}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-backpack-fill text-warning"></i>
            <span className="style-text">{ESTILO_LABEL[profile.estiloViaje] || ""}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-cash-stack text-success"></i>
            <span className="budget-text">{PRESUPUESTO_LABEL[profile.presupuesto] || ""}</span>
          </div>
        </div>

        <p className="text-body-secondary small mb-4 flex-grow-1 bio-text line-clamp-3">
          {profile.bio}
        </p>
        
        <div className="d-flex gap-2 mt-auto">
          <button 
            className="btn btn-light rounded-pill flex-grow-1 fw-semibold btn-sm shadow-sm"
            onClick={() => onViewProfile(profile)}
          >
            Ver más
          </button>
          <button 
            className={`btn rounded-pill flex-grow-1 fw-semibold btn-sm shadow-sm ${inviteStatus === 'Enviado' ? 'btn-secondary' : 'btn-success'}`}
            onClick={handleInvite}
            disabled={isInviting || inviteStatus === 'Enviado'}
          >
            {isInviting && <span className="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>}
            {inviteStatus === 'Enviado' && <i className="bi bi-check-circle-fill me-1"></i>}
            {inviteStatus === 'Invitar' && <i className="bi bi-cup-hot-fill me-1"></i>}
            {inviteStatus}
          </button>
        </div>
      </div>
    </div>
  );
}
