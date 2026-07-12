import React from 'react';
import rioNegroImg from '../../assets/rio_negro.jpg';
import mendozaImg from '../../assets/mendoza.png';
import saltaImg from '../../assets/salta.jpg';
import neuquenImg from '../../assets/neuquen.jpg';

export default function ProfilePhotos() {
  return (
    <div className="card border-0 shadow-sm p-4 rounded-4 bg-body fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-body-emphasis mb-0 fs-5 d-flex align-items-center gap-2">
          <i className="bi bi-images text-success"></i> Inspiración de Viajes
        </h4>
      </div>
      
      <p className="text-body-secondary small mb-3">
        Destinos populares elegidos por viajeros con afinidades similares a las tuyas (Contenido de demostración).
      </p>

      <div className="row g-2 mb-2">
        <div className="col-6">
          <img
            src={rioNegroImg}
            alt="Río Negro"
            className="img-fluid rounded-4 w-100 object-fit-cover"
            style={{ height: "120px" }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544257125-9cddfb6cb908?auto=format&fit=crop&q=80&w=300&h=200'; }}
          />
        </div>
        <div className="col-6">
          <img
            src={mendozaImg}
            alt="Mendoza"
            className="img-fluid rounded-4 w-100 object-fit-cover"
            style={{ height: "120px" }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&q=80&w=300&h=200'; }}
          />
        </div>
        <div className="col-6">
          <img
            src={saltaImg}
            alt="Salta"
            className="img-fluid rounded-4 w-100 object-fit-cover"
            style={{ height: "120px" }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1621245037130-1c6ba5db73b1?auto=format&fit=crop&q=80&w=300&h=200'; }}
          />
        </div>
        <div className="col-6">
          <img
            src={neuquenImg}
            alt="Neuquén"
            className="img-fluid rounded-4 w-100 object-fit-cover"
            style={{ height: "120px" }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1590356536336-d8778736bd9a?auto=format&fit=crop&q=80&w=300&h=200'; }}
          />
        </div>
      </div>
    </div>
  );
}
