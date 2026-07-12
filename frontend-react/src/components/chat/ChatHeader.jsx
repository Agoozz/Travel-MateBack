export default function ChatHeader({ user, isOfflineMode, onClose }) {
  if (!user) return null;

  return (
    <div className="p-3 border-bottom bg-white d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-3">
        {onClose && (
          <button 
            type="button" 
            className="btn btn-sm btn-light d-md-none rounded-circle me-1"
            onClick={onClose}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
        )}
        <div className="position-relative">
          <img 
            src={user.avatar || "https://i.pravatar.cc/150"} 
            alt={user.name} 
            className="rounded-circle object-fit-cover shadow-sm" 
            width="45" 
            height="45" 
            onError={(e) => { e.target.src = "https://i.pravatar.cc/150"; }}
          />
          <span 
            className={`position-absolute bottom-0 end-0 p-1 border border-2 border-white rounded-circle ${isOfflineMode ? 'bg-secondary' : 'bg-success'}`}
            style={{ width: "12px", height: "12px", transform: "translate(2px, 2px)" }}
            title={isOfflineMode ? "Modo Offline" : "En línea"}
          ></span>
        </div>
        <div>
          <h6 className="mb-0 fw-bold">{user.name}</h6>
          {isOfflineMode && (
            <small className="text-warning fw-semibold">Modo Demostración</small>
          )}
        </div>
      </div>
      {onClose && (
        <button 
          type="button" 
          className="btn-close ms-auto" 
          onClick={onClose}
          aria-label="Cerrar chat"
        ></button>
      )}
    </div>
  );
}
