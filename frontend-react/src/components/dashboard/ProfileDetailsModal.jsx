import { useEffect } from 'react';
import './Modals.css';

const TIPO_LABEL = {
  mochilero: "Aventurero Mochilero",
  confort: "Viajero Confort",
  social: "Viajero Social",
  cultural: "Explorador Cultural",
};

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

function formatearFecha(fechaStr) {
  if (!fechaStr) return "";
  const [, m, d] = fechaStr.split("-");
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${d} ${meses[parseInt(m, 10) - 1]}`;
}

export default function ProfileDetailsModal({ profile, onClose, onInvite }) {
  // Manejo de la tecla Escape para cerrar
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!profile) return null;

  return (
    <>
      <div className="react-modal-backdrop" onClick={onClose}></div>
      <div className="react-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modalCompanionName">
        <div className="react-modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          <div className="position-relative" style={{ height: "120px", backgroundColor: "var(--bs-success)", opacity: 0.8 }}></div>
          <button 
            type="button" 
            className="btn-close position-absolute top-0 end-0 m-3 bg-white p-2 rounded-circle shadow-sm" 
            onClick={onClose} 
            aria-label="Cerrar"
          ></button>
          
          <div className="px-4 pb-4">
            <div className="text-center" style={{ marginTop: "-60px" }}>
              <img 
                src={profile.avatar || "https://i.pravatar.cc/150?img=11"} 
                alt={profile.nombre}
                className="rounded-circle border border-4 border-white shadow-sm object-fit-cover bg-white"
                style={{ width: "120px", height: "120px" }}
                onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=11"; }}
              />
              <h4 className="fw-bold text-body-emphasis mt-3 mb-1" id="modalCompanionName">
                {profile.nombre} · {profile.edad}
              </h4>
              <p className="text-success fw-semibold small mb-2">{TIPO_LABEL[profile.estiloViaje] || "Viajero"}</p>
              <p className="text-body-secondary small mb-0"><i className="bi bi-geo-alt-fill me-1"></i>{profile.ubicacion}</p>
            </div>

            <div className="mt-4">
              <h6 className="fw-bold text-body-emphasis mb-2">Sobre mí</h6>
              <p className="text-body-secondary small mb-4">{profile.bio}</p>

              <h6 className="fw-bold text-body-emphasis mb-3">Detalles del Viaje</h6>
              <div className="d-flex flex-wrap gap-2 mb-4" id="modalCompanionTags">
                <span className="badge bg-light text-secondary border border-secondary-subtle py-2 px-3 small">
                  <i className="bi bi-map-fill text-success me-1"></i>{profile.destino}
                </span>
                <span className="badge bg-light text-secondary border border-secondary-subtle py-2 px-3 small">
                  <i className="bi bi-backpack-fill text-success me-1"></i>{ESTILO_LABEL[profile.estiloViaje] || ""}
                </span>
                <span className="badge bg-light text-secondary border border-secondary-subtle py-2 px-3 small">
                  <i className="bi bi-cash-stack text-success me-1"></i>{PRESUPUESTO_LABEL[profile.presupuesto] || ""}
                </span>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <p className="text-body-tertiary small mb-1">Fechas</p>
                  <p className="text-body-secondary fw-semibold small mb-0">
                    <i className="bi bi-calendar-check me-1"></i>
                    {formatearFecha(profile.fechaInicio)} - {formatearFecha(profile.fechaFin)}
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-body-tertiary small mb-1">Idiomas</p>
                  <p className="text-body-secondary fw-semibold small mb-0">
                    <i className="bi bi-translate me-1"></i>
                    {(profile.idiomas || []).join(', ') || "No especificado"}
                  </p>
                </div>
              </div>

              <h6 className="fw-bold text-body-emphasis mb-3">Intereses</h6>
              <div className="d-flex flex-wrap gap-2 mb-4" id="modalCompanionInterests">
                {(profile.intereses || []).map((interes, idx) => (
                  <span key={idx} className="badge bg-success bg-opacity-10 text-success rounded-pill py-2 px-3 small">
                    {interes}
                  </span>
                ))}
              </div>
            </div>

            <div className="d-grid pt-2">
              <button 
                className="btn btn-success rounded-pill py-2 fw-semibold"
                onClick={() => {
                  onClose();
                  onInvite(profile._id, profile);
                }}
              >
                <i className="bi bi-cup-hot-fill me-2"></i>Invitar a tomar un mate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
