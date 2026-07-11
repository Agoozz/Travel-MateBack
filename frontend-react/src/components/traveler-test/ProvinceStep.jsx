import { provincesByRegion, regions } from '../../data/provincesByRegion';

export default function ProvinceStep({ answers, setAnswers }) {
  const currentRegion = answers.region;
  const availableProvinces = provincesByRegion[currentRegion] || [];
  const regionLabel = regions.find(r => r.id === currentRegion)?.label || "";

  if (!currentRegion) {
    return (
      <div className="text-center fade-in py-5">
        <p className="text-muted">Por favor, regresá y seleccioná una región primero.</p>
      </div>
    );
  }

  return (
    <div className="text-center fade-in">
      <h4 className="fw-bold mb-3">¿Qué destino de {regionLabel} te interesa?</h4>
      <p className="text-muted mb-4">Seleccioná una provincia de la región elegida.</p>
      
      <div className="row g-2 justify-content-center">
        {availableProvinces.map((prov) => (
          <div className="col-md-6 col-lg-4" key={prov}>
            <div 
              className={`card h-100 cursor-pointer transition-all ${answers.destino === prov ? 'border-success bg-success-subtle border-2' : 'border'}`}
              onClick={() => setAnswers(prev => ({ ...prev, destino: prov }))}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body p-3">
                <h6 className="fw-bold mb-0 text-truncate">{prov}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
