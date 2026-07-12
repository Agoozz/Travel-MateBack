export default function ProfileFilters({ filters, onFilterChange, onClear }) {
  const hasFilters = filters.region || filters.travelStyle || filters.budget || filters.search;

  return (
    <div className="d-flex flex-wrap gap-2 mb-5">
      <select
        className="form-select btn btn-outline-success rounded-pill px-4 py-2 fw-semibold text-start w-auto"
        value={filters.region}
        onChange={(e) => onFilterChange("region", e.target.value)}
        aria-label="Filtrar por región"
      >
        <option value="">Destino</option>
        <option value="Norte">Norte Argentino</option>
        <option value="Centro">Centro</option>
        <option value="Cuyo">Cuyo</option>
        <option value="Patagonia">Patagonia</option>
        <option value="Buenos Aires">Buenos Aires</option>
      </select>

      <select
        className="form-select btn btn-outline-success rounded-pill px-4 py-2 fw-semibold text-start w-auto"
        value={filters.travelStyle}
        onChange={(e) => onFilterChange("travelStyle", e.target.value)}
        aria-label="Filtrar por estilo de viaje"
      >
        <option value="">Estilo de viaje</option>
        <option value="mochilero">Mochilero</option>
        <option value="confort">Confort</option>
        <option value="social">Social</option>
        <option value="cultural">Cultural</option>
      </select>

      <select
        className="form-select btn btn-outline-success rounded-pill px-4 py-2 fw-semibold text-start w-auto"
        value={filters.budget}
        onChange={(e) => onFilterChange("budget", e.target.value)}
        aria-label="Filtrar por presupuesto"
      >
        <option value="">Presupuesto</option>
        <option value="economico">Gasolero</option>
        <option value="medio">Medio</option>
        <option value="premium">Premium</option>
      </select>

      <button
        className="btn btn-outline-success rounded-pill px-4 py-2 fw-semibold"
        onClick={onClear}
        disabled={!hasFilters}
      >
        <i className="bi bi-x-circle"></i> Limpiar filtros
      </button>
    </div>
  );
}
