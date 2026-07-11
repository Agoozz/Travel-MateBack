import AvatarSelector from './AvatarSelector';

export default function ProfileForm({ profileData, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4 p-lg-5">
        <h5 className="fw-bold text-body-emphasis mb-4 border-bottom pb-3">Información Básica</h5>
        
        <div className="row g-4">
          <div className="col-12 text-center mb-2">
            <label className="form-label fw-semibold text-body-secondary mb-3 d-block text-start">Seleccioná tu Avatar</label>
            <AvatarSelector 
              selectedAvatar={profileData.avatar} 
              onSelect={(url) => onChange('avatar', url)} 
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="nombre" className="form-label fw-semibold text-body-secondary small">Nombre completo o apodo</label>
            <input 
              type="text" 
              className="form-control bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="nombre" 
              name="nombre"
              value={profileData.nombre || ''}
              onChange={handleChange}
              placeholder="Ej: Nico"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="edad" className="form-label fw-semibold text-body-secondary small">Edad</label>
            <input 
              type="number" 
              className="form-control bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="edad" 
              name="edad"
              value={profileData.edad || ''}
              onChange={handleChange}
              placeholder="Ej: 29"
              min="18"
              max="99"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="ubicacion" className="form-label fw-semibold text-body-secondary small">De dónde sos (Ciudad/País)</label>
            <input 
              type="text" 
              className="form-control bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="ubicacion" 
              name="ubicacion"
              value={profileData.ubicacion || ''}
              onChange={handleChange}
              placeholder="Ej: Buenos Aires, Argentina"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="idiomas" className="form-label fw-semibold text-body-secondary small">Idiomas (separados por coma)</label>
            <input 
              type="text" 
              className="form-control bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="idiomas" 
              name="idiomas"
              value={profileData.idiomas || ''}
              onChange={handleChange}
              placeholder="Ej: Español, Inglés"
            />
          </div>
          <div className="col-12">
            <label htmlFor="intereses" className="form-label fw-semibold text-body-secondary small">Intereses (separados por coma)</label>
            <input 
              type="text" 
              className="form-control bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="intereses" 
              name="intereses"
              value={profileData.intereses || ''}
              onChange={handleChange}
              placeholder="Ej: Trekking, Fotografía, Playa"
            />
          </div>
          <div className="col-12">
            <label htmlFor="bio" className="form-label fw-semibold text-body-secondary small">Biografía corta</label>
            <textarea 
              className="form-control bg-body-tertiary border-0 px-3 py-2 rounded-3 shadow-none" 
              id="bio" 
              name="bio"
              rows="3"
              value={profileData.bio || ''}
              onChange={handleChange}
              placeholder="Contá algo breve sobre vos, qué te gusta hacer cuando viajás..."
            ></textarea>
            <div className="form-text mt-2 opacity-75">Máximo 300 caracteres. Un buen perfil aumenta tus chances de match.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
