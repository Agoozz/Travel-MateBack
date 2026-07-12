import { memo } from 'react';

const DashboardHeader = memo(({ userName, travelStyle, searchValue, onSearchChange }) => {
  return (
    <div className="card bg-success bg-gradient text-white p-3 p-md-4 mb-4 text-white border-0">
      <div className="row align-items-center">
        <div className="col-lg-6 col-xl-7 mb-3 mb-lg-0">
          <h1 className="fw-bold text-white mb-1 fs-4">
            Encontrá tu compañere para la próxima aventura
          </h1>
          <p className="text-white text-opacity-90 small mb-0" id="welcomeSubtitle">
            Hola, <strong>{userName}</strong>. Explorá perfiles compatibles con tu estilo de viaje.
          </p>
        </div>
        <div className="col-lg-6 col-xl-5 d-flex gap-3 justify-content-end align-items-center">
          <div className="input-group flex-grow-1 rounded-pill overflow-hidden bg-body border border-secondary-subtle shadow-sm">
            <span className="input-group-text bg-body border-0 px-3">
              <i className="bi bi-search text-success"></i>
            </span>
            <input 
              type="text" 
              className="form-control border-0 px-3 shadow-none small" 
              placeholder="¿Adónde querés viajar?"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button className="btn btn-light rounded-pill fw-semibold" type="button">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

DashboardHeader.displayName = 'DashboardHeader';
export default DashboardHeader;
