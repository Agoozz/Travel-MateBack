export default function TravelPreferences({ profileData, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4 p-lg-5">
        <h5 className="fw-bold text-body-emphasis mb-4 border-bottom pb-3">Preferencias de Viaje</h5>
        
        <div className="row g-4">
          <div className="col-md-6">
            <label htmlFor="destino" className="form-label fw-semibold text-body-secondary small">Destino preferido</label>
            <input 
              type="text" 
              className="form-control bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="destino" 
              name="destino"
              value={profileData.destino || ''}
              onChange={handleChange}
              placeholder="Ej: Ushuaia, Cataratas, Mendoza..."
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="estiloViaje" className="form-label fw-semibold text-body-secondary small">Tu Estilo de Viaje</label>
            <select 
              className="form-select bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="estiloViaje" 
              name="estiloViaje"
              value={profileData.estiloViaje || ''}
              onChange={handleChange}
            >
              <option value="" disabled>Seleccioná un estilo</option>
              <option value="mochilero">Aventurero Mochilero</option>
              <option value="confort">Viajero Confort</option>
              <option value="social">Viajero Social</option>
              <option value="cultural">Explorador Cultural</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="presupuesto" className="form-label fw-semibold text-body-secondary small">Presupuesto</label>
            <select 
              className="form-select bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="presupuesto" 
              name="presupuesto"
              value={profileData.presupuesto || ''}
              onChange={handleChange}
            >
              <option value="" disabled>Seleccioná tu presupuesto</option>
              <option value="economico">Económico (USD 500-900)</option>
              <option value="medio">Medio (USD 900-1500)</option>
              <option value="premium">Premium (USD 1500+)</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="estiloCompanero" className="form-label fw-semibold text-body-secondary small">Compañero Ideal</label>
            <select 
              className="form-select bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="estiloCompanero" 
              name="estiloCompanero"
              value={profileData.estiloCompanero || ''}
              onChange={handleChange}
            >
              <option value="" disabled>Seleccioná preferencia</option>
              <option value="aventura">Aventura & Naturaleza</option>
              <option value="fiesta">Social & Fiesta</option>
              <option value="confort">Relajado & Cultural</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
