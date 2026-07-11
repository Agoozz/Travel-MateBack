import { memo } from 'react';

const DashboardHeader = memo(({ userName, travelStyle }) => {
  const styleLabel = {
    mochilero: "Mochilero",
    confort: "Confort",
    social: "Social",
    cultural: "Cultural",
  }[travelStyle] || "";

  return (
    <div className="mb-4">
      <h2 className="fw-bold text-body-emphasis mb-2">Compañeros de Ruta</h2>
      <p className="text-body-secondary fs-6 mb-0">
        Hola, <strong>{userName}</strong>
        {styleLabel ? ` (${styleLabel}). ` : '. '}
        Explorá perfiles compatibles con tu estilo de viaje.
      </p>
    </div>
  );
});

DashboardHeader.displayName = 'DashboardHeader';
export default DashboardHeader;
