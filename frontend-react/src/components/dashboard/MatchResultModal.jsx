import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modals.css';

export default function MatchResultModal({ matchUser, currentUser, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!matchUser) return null;

  return (
    <>
      <div className="react-modal-backdrop" onClick={onClose} style={{ zIndex: 1060 }}></div>
      <div className="react-modal-dialog" role="dialog" aria-modal="true" style={{ zIndex: 1070 }}>
        <div className="react-modal-content border-0 rounded-4 shadow-lg text-center p-4 p-md-5 bg-body" style={{ background: "linear-gradient(135deg, var(--bs-body-bg) 0%, var(--bs-success-bg-subtle) 100%)" }}>
          
          <div className="mb-4 d-flex justify-content-center align-items-center gap-3">
            <div className="position-relative">
              <img 
                src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"} 
                alt="Tú"
                className="rounded-circle border border-4 border-success shadow-sm object-fit-cover"
                style={{ width: "90px", height: "90px" }}
              />
              <span className="position-absolute bottom-0 end-0 bg-success text-white rounded-circle p-1 border border-2 border-white d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px" }}>
                <i className="bi bi-heart-fill small"></i>
              </span>
            </div>
            
            <div className="text-success fs-1 animate-pulse">
              <i className="bi bi-arrow-left-right"></i>
            </div>
            
            <div className="position-relative">
              <img 
                src={matchUser.avatar || "https://i.pravatar.cc/150?img=11"} 
                alt={matchUser.nombre}
                className="rounded-circle border border-4 border-success shadow-sm object-fit-cover"
                style={{ width: "90px", height: "90px" }}
              />
              <span className="position-absolute bottom-0 start-0 bg-success text-white rounded-circle p-1 border border-2 border-white d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px" }}>
                <i className="bi bi-heart-fill small"></i>
              </span>
            </div>
          </div>

          <h2 className="fw-bold text-success mb-3">¡Hay Match! 🧉</h2>
          
          <p className="text-body-secondary mb-4 fs-5">
            A <strong>{matchUser.nombre}</strong> también le gustaría compartir un mate y organizar un viaje con vos.
          </p>
          
          <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
            <button 
              className="btn btn-outline-success rounded-pill py-2 px-4 fw-semibold"
              onClick={onClose}
            >
              Seguir buscando
            </button>
            <button 
              className="btn btn-success rounded-pill py-2 px-4 fw-semibold shadow-sm"
              onClick={() => {
                onClose();
                navigate('/messages');
              }}
            >
              <i className="bi bi-chat-dots-fill me-2"></i>Enviar mensaje
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
