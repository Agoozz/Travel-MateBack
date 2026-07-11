export default function AvailabilitySection({ profileData, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4 p-lg-5">
        <h5 className="fw-bold text-body-emphasis mb-4 border-bottom pb-3">Disponibilidad</h5>
        
        <div className="row g-4">
          <div className="col-md-6">
            <label htmlFor="fechaInicio" className="form-label fw-semibold text-body-secondary small">Fecha de Ida</label>
            <input 
              type="date" 
              className="form-control bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="fechaInicio" 
              name="fechaInicio"
              value={profileData.fechaInicio || ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="fechaFin" className="form-label fw-semibold text-body-secondary small">Fecha de Vuelta</label>
            <input 
              type="date" 
              className="form-control bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="fechaFin" 
              name="fechaFin"
              value={profileData.fechaFin || ''}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
