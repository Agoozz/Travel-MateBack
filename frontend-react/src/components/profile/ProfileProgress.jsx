export default function ProfileProgress({ progress }) {
  return (
    <div className="card bg-success bg-opacity-10 border-success border-opacity-25 rounded-4 overflow-hidden mb-4">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex justify-content-between align-items-end mb-3">
          <div>
            <h5 className="fw-bold text-success mb-1">Tu progreso</h5>
            <p className="text-success text-opacity-75 small mb-0">
              Completá tu perfil para obtener mejores afinidades con otros viajeros.
            </p>
          </div>
          <span className="fs-3 fw-bold text-success">{progress}%</span>
        </div>
        <div className="progress bg-success bg-opacity-25" style={{ height: "10px" }}>
          <div 
            className="progress-bar bg-success rounded-pill" 
            role="progressbar" 
            style={{ width: `${progress}%` }} 
            aria-valuenow={progress} 
            aria-valuemin="0" 
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
}
