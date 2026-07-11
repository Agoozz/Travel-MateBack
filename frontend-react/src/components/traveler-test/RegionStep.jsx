import { regions } from '../../data/provincesByRegion';

export default function RegionStep({ answers, setAnswers }) {
  const handleSelect = (regionId) => {
    // If region changes, clear the destination/province
    if (answers.region !== regionId) {
      setAnswers(prev => ({ ...prev, region: regionId, destino: "" }));
    }
  };

  return (
    <div className="text-center fade-in">
      <h4 className="fw-bold mb-3">¿Qué región de Argentina te gustaría visitar?</h4>
      <p className="text-muted mb-4">Seleccioná una región para ver sus destinos.</p>
      
      <div className="row g-3 justify-content-center">
        {regions.map((reg) => (
          <div className="col-md-6" key={reg.id}>
            <div 
              className={`card h-100 cursor-pointer transition-all ${answers.region === reg.id ? 'border-success bg-success-subtle border-2' : 'border'}`}
              onClick={() => handleSelect(reg.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body p-3">
                <h6 className="fw-bold mb-0">{reg.label}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
