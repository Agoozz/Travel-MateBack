import React from 'react';

export default function ProfileTripDetails({ profile, onEdit }) {
  const { destino = '', fechaInicio = '', fechaFin = '', idiomas = [] } = profile || {};

  const formatDates = () => {
    if (!fechaInicio && !fechaFin) return "Fechas no definidas";
    if (fechaInicio && !fechaFin) return `Desde el ${fechaInicio}`;
    if (!fechaInicio && fechaFin) return `Hasta el ${fechaFin}`;
    return `${fechaInicio} - ${fechaFin}`;
  };

  const formattedIdiomas = Array.isArray(idiomas) && idiomas.length > 0
    ? idiomas.filter(i => i.trim()).join(', ')
    : 'No especificados';

  return (
    <div className="card border-0 shadow-sm p-4 rounded-4 bg-body fade-in">
      <h4 className="fw-bold text-body-emphasis mb-4 fs-5 d-flex align-items-center gap-2">
        <i className="bi bi-airplane-fill text-success"></i> Viaje planeado
      </h4>

      <div className="mb-4">
        {/* Destino */}
        <div className="d-flex gap-3 mb-3">
          <div className="fs-4 text-success">
            <i className="bi bi-geo-alt-fill"></i>
          </div>
          <div>
            <span className="text-body-secondary small d-block">¿A dónde?</span>
            <strong className="text-body-emphasis fs-6">
              {destino || "Sin destino definido"}
            </strong>
          </div>
        </div>

        {/* Fechas */}
        <div className="d-flex gap-3 mb-3">
          <div className="fs-4 text-success">
            <i className="bi bi-calendar-event-fill"></i>
          </div>
          <div>
            <span className="text-body-secondary small d-block">¿Cuándo?</span>
            <strong className="text-body-emphasis fs-6">
              {formatDates()}
            </strong>
          </div>
        </div>

        {/* Idiomas */}
        <div className="d-flex gap-3 mb-3">
          <div className="fs-4 text-success">
            <i className="bi bi-translate"></i>
          </div>
          <div>
            <span className="text-body-secondary small d-block">Idiomas hablados</span>
            <strong className="text-body-emphasis fs-6">
              {formattedIdiomas}
            </strong>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-outline-success border-2 rounded-pill fw-semibold px-4 py-2"
        onClick={onEdit}
      >
        Editar detalles del viaje <i className="bi bi-pencil ms-1"></i>
      </button>
    </div>
  );
}
