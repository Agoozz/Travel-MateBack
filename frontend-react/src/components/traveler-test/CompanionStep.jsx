export default function CompanionStep({ answers, setAnswers }) {
  const options = [
    { id: "aventura", title: "Aventura & Naturaleza", desc: "Alguien dispuesto a caminar mucho y explorar.", icon: "bi-compass" },
    { id: "fiesta", title: "Social & Fiesta", desc: "Para salir de noche, conocer bares y divertirse.", icon: "bi-music-note-beamed" },
    { id: "confort", title: "Relajado & Cultural", desc: "Para visitar museos, comer rico y descansar.", icon: "bi-cup-hot" }
  ];

  return (
    <div className="text-center fade-in">
      <h4 className="fw-bold mb-3">¿Qué buscás en un compañero de viaje?</h4>
      <p className="text-muted mb-4">Esto nos ayuda a encontrarte viajeros con tus mismas prioridades.</p>
      
      <div className="row g-3 justify-content-center">
        {options.map((opt) => (
          <div className="col-md-4" key={opt.id}>
            <div 
              className={`card h-100 cursor-pointer transition-all ${answers.companero === opt.id ? 'border-success bg-success-subtle border-2' : 'border'}`}
              onClick={() => setAnswers(prev => ({ ...prev, companero: opt.id }))}
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
