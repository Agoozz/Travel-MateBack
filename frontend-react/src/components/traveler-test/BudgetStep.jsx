export default function BudgetStep({ answers, setAnswers }) {
  const options = [
    { id: "economico", title: "Económico", desc: "Alojamiento barato, comida rápida o cocinar.", icon: "bi-wallet2" },
    { id: "medio", title: "Medio", desc: "Buen alojamiento, algunos restaurantes y tours.", icon: "bi-cash-coin" },
    { id: "premium", title: "Premium", desc: "Lo mejor de lo mejor, sin preocuparse por el costo.", icon: "bi-gem" }
  ];

  return (
    <div className="text-center fade-in">
      <h4 className="fw-bold mb-3">¿Cuál es tu presupuesto estimado?</h4>
      <p className="text-muted mb-4">Seleccioná el rango que más se acerque a tu viaje.</p>
      
      <div className="row g-3 justify-content-center">
        {options.map((opt) => (
          <div className="col-md-4" key={opt.id}>
            <div 
              className={`card h-100 cursor-pointer transition-all ${answers.presupuesto === opt.id ? 'border-success bg-success-subtle border-2' : 'border'}`}
              onClick={() => setAnswers(prev => ({ ...prev, presupuesto: opt.id }))}
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
