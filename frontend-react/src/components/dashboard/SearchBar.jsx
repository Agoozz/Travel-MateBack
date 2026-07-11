export default function SearchBar({ value, onChange }) {
  return (
    <div className="input-group">
      <span className="input-group-text bg-transparent border-end-0 text-body-tertiary">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control border-start-0 ps-0 shadow-none bg-transparent"
        placeholder="Buscar compañero por nombre o destino..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
