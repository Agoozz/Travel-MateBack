import React from 'react';

export default function ProfileTravelerType({ profile, onRetakeTest }) {
  const { estiloViaje = '', presupuesto = '', estiloCompanero = '' } = profile || {};

  const getStyleData = (val) => {
    switch (val) {
      case 'mochilero': return { width: 100, text: 'Aventurero' };
      case 'confort': return { width: 40, text: 'Confortable' };
      case 'social': return { width: 75, text: 'Sociable' };
      case 'cultural': return { width: 60, text: 'Cultural' };
      default: return { width: 0, text: 'No definido' };
    }
  };

  const getBudgetData = (val) => {
    switch (val) {
      case 'premium': return { width: 100, text: 'Alto' };
      case 'medio': return { width: 50, text: 'Moderado' };
      case 'economico': return { width: 25, text: 'Bajo' };
      default: return { width: 0, text: 'No definido' };
    }
  };

  const getCompanionData = (val) => {
    switch (val) {
      case 'aventura': return { width: 100, text: 'Aventurero' };
      case 'fiesta': return { width: 80, text: 'Fiestero' };
      case 'cultura': return { width: 60, text: 'Cultural' };
      case 'relax': return { width: 40, text: 'Relajado' };
      default: return { width: 0, text: 'No definido' };
    }
  };

  const styleData = getStyleData(estiloViaje);
  const budgetData = getBudgetData(presupuesto);
  const companionData = getCompanionData(estiloCompanero);

  return (
    <div className="card border-0 shadow-sm p-4 rounded-4 mb-4 bg-body fade-in">
      <h4 className="fw-bold text-body-emphasis mb-4 fs-5 d-flex align-items-center gap-2">
        <i className="bi bi-backpack-fill text-success"></i> Tipo de viajero
      </h4>

      <div className="mb-4">
        {/* Estilo de viaje */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-body-secondary small">Estilo de viaje</span>
            <span className="text-body-emphasis fw-bold small">{styleData.text}</span>
          </div>
          <div className="progress" style={{ height: "10px" }}>
            <div className="progress-bar bg-success" style={{ width: `${styleData.width}%` }}></div>
          </div>
        </div>

        {/* Presupuesto */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-body-secondary small">Nivel de Presupuesto</span>
            <span className="text-body-emphasis fw-bold small">{budgetData.text}</span>
          </div>
          <div className="progress" style={{ height: "10px" }}>
            <div className="progress-bar bg-success" style={{ width: `${budgetData.width}%` }}></div>
          </div>
        </div>

        {/* Compañía */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-body-secondary small">Afinidad de Compañía</span>
            <span className="text-body-emphasis fw-bold small">{companionData.text}</span>
          </div>
          <div className="progress" style={{ height: "10px" }}>
            <div className="progress-bar bg-success" style={{ width: `${companionData.width}%` }}></div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-outline-success border-2 rounded-pill fw-semibold px-4 py-2"
        onClick={onRetakeTest}
      >
        Volver a hacer el test <i className="bi bi-arrow-repeat ms-1"></i>
      </button>
    </div>
  );
}
