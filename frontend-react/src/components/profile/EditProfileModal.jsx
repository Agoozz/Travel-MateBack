import React, { useState, useEffect } from 'react';
import AvatarSelector from './AvatarSelector';

export default function EditProfileModal({ show, profile, onClose, onSave, saving }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (show && profile) {
      setFormData({
        nombre: profile.nombre || '',
        edad: profile.edad || '',
        ubicacion: profile.ubicacion || '',
        bio: profile.bio || '',
        idiomas: Array.isArray(profile.idiomas) ? profile.idiomas.join(', ') : '',
        intereses: Array.isArray(profile.intereses) ? profile.intereses.join(', ') : '',
        avatar: profile.avatar || 'https://i.pravatar.cc/150?img=12'
      });
    }
  }, [show, profile]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (url) => {
    setFormData(prev => ({ ...prev, avatar: url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Parse comma separated lists back into arrays before saving
    const parsedData = {
      ...formData,
      edad: formData.edad ? parseInt(formData.edad, 10) : null,
      idiomas: formData.idiomas ? formData.idiomas.split(',').map(s => s.trim()).filter(Boolean) : [],
      intereses: formData.intereses ? formData.intereses.split(',').map(s => s.trim()).filter(Boolean) : []
    };
    
    onSave(parsedData);
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
      <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1055, overflowY: 'auto' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4 border-0 shadow-lg">
            <div className="modal-header bg-body-tertiary border-bottom-0 pb-3 rounded-top-4 px-4 py-3">
              <h5 className="modal-title fw-bold text-body-emphasis">
                <i className="bi bi-person-lines-fill text-success me-2"></i>
                Editar información del perfil
              </h5>
              <button type="button" className="btn-close" onClick={onClose} disabled={saving}></button>
            </div>
            
            <div className="modal-body px-4 py-4">
              <form id="profileInfoForm" onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre || ''}
                      onChange={handleChange}
                      className="form-control rounded-pill px-3 py-2 border-secondary-subtle small"
                      required
                      disabled={saving}
                    />
                  </div>
                  
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Edad</label>
                    <input
                      type="number"
                      name="edad"
                      value={formData.edad || ''}
                      onChange={handleChange}
                      className="form-control rounded-pill px-3 py-2 border-secondary-subtle small"
                      min="18"
                      max="99"
                      disabled={saving}
                    />
                  </div>
                  
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Ciudad de Origen</label>
                    <input
                      type="text"
                      name="ubicacion"
                      value={formData.ubicacion || ''}
                      onChange={handleChange}
                      className="form-control rounded-pill px-3 py-2 border-secondary-subtle small"
                      disabled={saving}
                    />
                  </div>
                  
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Biografía</label>
                    <textarea
                      name="bio"
                      value={formData.bio || ''}
                      onChange={handleChange}
                      className="form-control rounded-3 border-secondary-subtle p-3 small"
                      rows="3"
                      disabled={saving}
                    ></textarea>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Idiomas (Separados por comas)</label>
                    <input
                      type="text"
                      name="idiomas"
                      value={formData.idiomas || ''}
                      onChange={handleChange}
                      className="form-control rounded-pill px-3 py-2 border-secondary-subtle small"
                      placeholder="Ej: Español, Inglés"
                      disabled={saving}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Intereses (Separados por comas)</label>
                    <input
                      type="text"
                      name="intereses"
                      value={formData.intereses || ''}
                      onChange={handleChange}
                      className="form-control rounded-pill px-3 py-2 border-secondary-subtle small"
                      placeholder="Ej: Fotografía, Trekking"
                      disabled={saving}
                    />
                  </div>
                  
                  <div className="col-12 mt-4">
                    <label className="form-label small fw-semibold text-body-secondary mb-2 d-block">Seleccioná tu Avatar</label>
                    <AvatarSelector currentAvatar={formData.avatar} onSelect={handleAvatarSelect} disabled={saving} />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="modal-footer border-top-0 pt-0 px-4 pb-4">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill fw-semibold px-4"
                onClick={onClose}
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-success rounded-pill fw-semibold px-4 d-flex align-items-center gap-2"
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Guardando...
                  </>
                ) : (
                  'Guardar cambios'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
