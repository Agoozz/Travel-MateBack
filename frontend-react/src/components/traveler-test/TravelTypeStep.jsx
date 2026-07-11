export default function TravelTypeStep({ answers, setAnswers }) {
  const options = [
    { id: "mochilero", title: "Mochilero/Aventurero", desc: "Amo la naturaleza, acampar, trekking y la libertad.", icon: "bi-backpack" },
    { id: "hotel", title: "Confort/Lujo", desc: "Busco los mejores hoteles, restaurantes y relax.", icon: "bi-building" },
    { id: "organizado", title: "Planificado/Tour", desc: "Prefiero viajes con guías, tours y todo organizado.", icon: "bi-calendar2-check" }
  ];

  return (
    <div className="text-center fade-in">
      <h4 className="fw-bold mb-3">¿Qué tipo de viaje preferís?</h4>
      <p className="text-muted mb-4">Elegí el estilo que mejor te represente.</p>
      
      <div className="row g-3 justify-content-center">
        {options.map((opt) => (
          <div className="col-md-4" key={opt.id}>
            <div 
              className={`card h-100 cursor-pointer transition-all ${answers.tipoViaje === opt.id ? 'border-success bg-success-subtle border-2' : 'border'}`}
              onClick={() => setAnswers(prev => ({ ...prev, tipoViaje: opt.id }))}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body p-4">
                <i className={`bi ${opt.icon} fs-1 text-success mb-3`}></i>
                <h5 className="fw-bold">{opt.title}</h5>
                <p className="small text-muted mb-0">{opt.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
