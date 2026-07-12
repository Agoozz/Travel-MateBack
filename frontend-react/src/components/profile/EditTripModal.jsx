import React, { useState, useEffect } from 'react';

export default function EditTripModal({ show, profile, onClose, onSave, saving }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (show && profile) {
      setFormData({
        destino: profile.destino || '',
        fechaInicio: profile.fechaInicio || '',
        fechaFin: profile.fechaFin || ''
      });
    }
  }, [show, profile]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fechaInicio && formData.fechaFin) {
      const start = new Date(formData.fechaInicio);
      const end = new Date(formData.fechaFin);
      if (end < start) {
        alert("La fecha de vuelta no puede ser anterior a la de ida");
        return;
      }
    }
    onSave(formData);
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
      <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1055, overflowY: 'auto' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 border-0 shadow-lg">
            <div className="modal-header bg-body-tertiary border-bottom-0 pb-3 rounded-top-4 px-4 py-3">
              <h5 className="modal-title fw-bold text-body-emphasis">
                <i className="bi bi-airplane-fill text-success me-2"></i>
                Editar detalles del viaje
              </h5>
              <button type="button" className="btn-close" onClick={onClose} disabled={saving}></button>
            </div>
            
            <div className="modal-body px-4 py-4">
              <form id="tripDetailsForm" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label small fw-semibold text-body-secondary mb-1">Destino Próximo</label>
                  <input
                    type="text"
                    name="destino"
                    value={formData.destino || ''}
                    onChange={handleChange}
                    className="form-control rounded-pill px-3 py-2 border-secondary-subtle small"
                    placeholder="Ej: Tailandia"
                    disabled={saving}
                  />
                </div>
                
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Fecha de salida</label>
                    <input
                      type="date"
                      name="fechaInicio"
                      value={formData.fechaInicio || ''}
                      onChange={handleChange}
                      className="form-control rounded-pill px-3 py-2 border-secondary-subtle small"
                      disabled={saving}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-body-secondary mb-1">Hasta cuándo</label>
                    <input
                      type="date"
                      name="fechaFin"
                      value={formData.fechaFin || ''}
                      onChange={handleChange}
                      className="form-control rounded-pill px-3 py-2 border-secondary-subtle small"
                      disabled={saving}
                    />
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
