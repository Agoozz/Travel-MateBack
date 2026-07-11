export default function ProfileFilters({ filters, onFilterChange, onClear }) {
  const hasFilters = filters.region || filters.travelStyle || filters.budget || filters.search;

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-3 p-md-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <select
              className="form-select border-secondary-subtle rounded-pill small"
              value={filters.region}
              onChange={(e) => onFilterChange("region", e.target.value)}
              aria-label="Filtrar por región"
            >
              <option value="">Todas las regiones</option>
              <option value="Norte">Norte Argentino</option>
              <option value="Centro">Centro</option>
              <option value="Cuyo">Cuyo</option>
              <option value="Patagonia">Patagonia</option>
              <option value="Buenos Aires">Buenos Aires</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <select
              className="form-select border-secondary-subtle rounded-pill small"
              value={filters.travelStyle}
              onChange={(e) => onFilterChange("travelStyle", e.target.value)}
              aria-label="Filtrar por estilo de viaje"
            >
              <option value="">Cualquier estilo</option>
              <option value="mochilero">Mochilero</option>
              <option value="confort">Confort</option>
              <option value="social">Social</option>
              <option value="cultural">Cultural</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <select
              className="form-select border-secondary-subtle rounded-pill small"
              value={filters.budget}
              onChange={(e) => onFilterChange("budget", e.target.value)}
              aria-label="Filtrar por presupuesto"
            >
              <option value="">Cualquier presupuesto</option>
              <option value="economico">Económico (USD 500-900)</option>
              <option value="medio">Medio (USD 900-1500)</option>
              <option value="premium">Premium (USD 1500+)</option>
            </select>
          </div>
          <div className="col-12 col-md-2 text-md-end">
            <button
              className="btn btn-outline-secondary rounded-pill btn-sm w-100"
              onClick={onClear}
              disabled={!hasFilters}
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
