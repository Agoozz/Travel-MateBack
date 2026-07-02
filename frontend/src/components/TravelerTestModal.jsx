import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const profiles = {
  aventurero: {
    title: "Aventurero Indómito",
    desc: "Sos un explorador nato. Te motivan los desafíos físicos, la conexión profunda con la naturaleza salvaje y el trekking.",
    image: "/images/resultado_aventurero.jpg"
  },
  confort: {
    title: "Buscador de Confort y Relax",
    desc: "Para vos, viajar es sinónimo de descansar, mimarte y recargar energías en entornos cómodos y placenteros.",
    image: "/images/resultado_confort.jpg"
  },
  social: {
    title: "Explorador Social",
    desc: "Buscás conectar con la gente, la música y la noche de cada lugar.",
    image: "/images/resultado_social.jpg"
  },
  cultural: {
    title: "Explorador Cultural e Histórico",
    desc: "Te apasiona la historia local, las leyendas de cada pueblo, la arquitectura colonial y los museos.",
    image: "/images/resultado_cultural.jpg"
  }
};

const recommendations = {
  noa: {
    aventurero: "Jujuy (Salinas Grandes y senderos de altura en Purmamarca y Tilcara).",
    confort: "Salta (Cafayate, bodegas de altura y hoteles coloniales premium con spa).",
    social: "Salta Capital (Peñas folclóricas de la calle Balcarce y peatonales activas).",
    cultural: "Tucumán (Ruinas de Quilmes) y La Rioja (Parque Nacional Talampaya)."
  },
  nea: {
    aventurero: "Chaco (El Impenetrable) y Formosa (Bañado La Estrella en lancha de aventura).",
    confort: "Misiones (Cataratas del Iguazú y resorts ecológicos premium de selva).",
    social: "Corrientes (Esteros del Iberá, playas fluviales y costanera con fiesta).",
    cultural: "Misiones (Ruinas Jesuíticas de San Ignacio Miní, patrimonio mundial)."
  },
  cuyo: {
    aventurero: "Mendoza (Alta Montaña, senderismo al pie del Aconcagua y rafting en Potrerillos).",
    confort: "Mendoza (Bodegas exclusivas en Valle de Uco y hoteles boutique de viñedos).",
    social: "San Luis (Potrero de los Funes y deportes grupales en el lago).",
    cultural: "San Juan (Parque Provincial Ischigualasto / Valle de la Luna)."
  },
  pampeana: {
    aventurero: "Córdoba (Trekking en el Cerro Champaquí y acampada en Los Gigantes).",
    confort: "Buenos Aires (Hoteles premium frente al mar en Mar del Plata o estancias exclusivas).",
    social: "CABA (San Telmo y Palermo, recorridos urbanos y cervecerías artesanales).",
    cultural: "Santa Fe (Casco histórico) y Entre Ríos (Palacio San José)."
  },
  patagonia: {
    aventurero: "Río Negro (El Bolsón, caminatas al Cajón del Azul y refugios de montaña).",
    confort: "Neuquén (Villa La Angostura, cabañas premium de troncos y lagos pacíficos).",
    social: "Río Negro (Bariloche, cervecerías del Circuito Chico y hostels activos).",
    cultural: "Chubut (Avistaje de ballenas en Puerto Madryn y museos galeses en Gaiman)."
  }
};

const TravelerTestModal = ({ isProfileMode = false, onComplete, modalId = 'travelerTestModal' }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({
    tipoViaje: '',
    presupuesto: '',
    region: '',
    fechaInicio: '',
    fechaFin: '',
    companero: ''
  });

  const handleSelect = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
    else calculateResult();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    if (step === 1 && answers.tipoViaje) return true;
    if (step === 2 && answers.presupuesto) return true;
    if (step === 3 && answers.region) return true;
    if (step === 4) {
      if (answers.fechaInicio && answers.fechaFin) {
        return new Date(answers.fechaFin) >= new Date(answers.fechaInicio);
      }
      return false;
    }
    if (step === 5 && answers.companero) return true;
    return false;
  };

  const calculateResult = () => {
    setLoading(true);
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setLoadingProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        
        // Simple logic mapping
        let profileKey = 'aventurero';
        if (answers.tipoViaje === 'hotel' || answers.presupuesto === 'premium') profileKey = 'confort';
        else if (answers.companero === 'fiesta') profileKey = 'social';
        else if (answers.tipoViaje === 'organizado') profileKey = 'cultural';
        
        const profile = profiles[profileKey];
        const destText = recommendations[answers.region || 'patagonia'][profileKey];
        
        setResult({
          ...profile,
          destinationText: destText
        });
        setLoading(false);
      }
    }, 150);
  };

  const restart = () => {
    setStep(1);
    setResult(null);
    setAnswers({ tipoViaje: '', presupuesto: '', region: '', fechaInicio: '', fechaFin: '', companero: '' });
  };

  const finishTest = () => {
    const modalElement = document.getElementById(modalId);
    const modalInstance = window.bootstrap?.Modal?.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
    
    if (isProfileMode && onComplete) {
      onComplete(result, answers);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true" data-bs-backdrop="static">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          
          <div className="modal-header border-0 bg-body-tertiary px-4 py-3 justify-content-between">
            <h5 className="modal-title fw-bold text-body-emphasis">Test de Viajero</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={restart}></button>
          </div>
          
          <div className="modal-body px-4 py-3">
            {!loading && !result && (
              <>
                <div className="progress mb-4 progress-sm">
                  <div className="progress-bar bg-success" style={{width: `${((step - 1) / 4) * 100}%`}}></div>
                </div>
                
                <div className="d-flex justify-content-between mb-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`step-circle-indicator ${step === i ? 'active' : ''} ${step > i ? 'completed bg-success text-white' : ''}`}>
                      {step > i ? <i className="bi bi-check-lg"></i> : i}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* STEP 1 */}
            {step === 1 && !loading && !result && (
              <div className="wizard-step">
                <h6 className="text-center fw-bold mb-3">¿Qué tipo de viaje estás buscando?</h6>
                <div className="d-flex flex-column gap-2">
                  {[
                    { id: 'mochilero', icon: 'bi-backpack', label: 'Mochilero', desc: 'Aventura, libertad y bajo presupuesto.' },
                    { id: 'hotel', icon: 'bi-building', label: 'Hotel', desc: 'Comodidad y servicios garantizados.' },
                    { id: 'organizado', icon: 'bi-calendar-check', label: 'Organizado', desc: 'Todo planificado, sin preocupaciones.' }
                  ].map(opt => (
                    <div key={opt.id} className={`card border p-3 d-flex flex-row align-items-center gap-3 rounded-3 cursor-pointer ${answers.tipoViaje === opt.id ? 'border-success border-2 bg-success-subtle' : ''}`} onClick={() => handleSelect('tipoViaje', opt.id)} style={{cursor: 'pointer'}}>
                      <div className="rounded-3 d-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success shadow-sm" style={{width:'55px',height:'55px'}}>
                        <i className={`bi ${opt.icon} fs-3`}></i>
                      </div>
                      <div className="text-start">
                        <h6 className="fw-bold mb-1 small">{opt.label}</h6>
                        <p className="text-body-secondary small mb-0">{opt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && !loading && !result && (
              <div className="wizard-step">
                <h6 className="text-center fw-bold mb-3">¿Cuál es tu presupuesto?</h6>
                <div className="d-flex flex-column gap-2">
                  {[
                    { id: 'economico', icon: 'bi-wallet2', label: 'Económico', desc: 'Hostales, comida local y viajes gasoleros.' },
                    { id: 'medio', icon: 'bi-cash-coin', label: 'Medio', desc: 'Equilibrio de confort en hoteles de gama media.' },
                    { id: 'premium', icon: 'bi-gem', label: 'Premium', desc: 'Hoteles de lujo y experiencias de primer nivel.' }
                  ].map(opt => (
                    <div key={opt.id} className={`card border p-3 d-flex flex-row align-items-center gap-3 rounded-3 cursor-pointer ${answers.presupuesto === opt.id ? 'border-success border-2 bg-success-subtle' : ''}`} onClick={() => handleSelect('presupuesto', opt.id)} style={{cursor: 'pointer'}}>
                      <div className="rounded-3 d-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success shadow-sm" style={{width:'55px',height:'55px'}}>
                        <i className={`bi ${opt.icon} fs-3`}></i>
                      </div>
                      <div className="text-start">
                        <h6 className="fw-bold mb-1 small">{opt.label}</h6>
                        <p className="text-body-secondary small mb-0">{opt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && !loading && !result && (
              <div className="wizard-step">
                <h6 className="text-center fw-bold mb-3">¿Qué región te interesa explorar?</h6>
                <div className="d-flex flex-column gap-2">
                  {[
                    { id: 'noa', label: 'Noroeste (NOA)' },
                    { id: 'nea', label: 'Noreste (NEA)' },
                    { id: 'cuyo', label: 'Cuyo' },
                    { id: 'pampeana', label: 'Pampeana' },
                    { id: 'patagonia', label: 'Patagónica' }
                  ].map(opt => (
                    <div key={opt.id} className={`card border p-2 d-flex flex-row align-items-center gap-3 rounded-3 cursor-pointer ${answers.region === opt.id ? 'border-success border-2 bg-success-subtle' : ''}`} onClick={() => handleSelect('region', opt.id)} style={{cursor: 'pointer'}}>
                      <div className="rounded-3 d-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success shadow-sm" style={{width:'40px',height:'40px'}}>
                        <i className="bi bi-geo-alt-fill fs-5"></i>
                      </div>
                      <div className="text-start">
                        <h6 className="fw-bold mb-0 small">{opt.label}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && !loading && !result && (
              <div className="wizard-step">
                <h6 className="text-center fw-bold mb-3">¿Cuándo planeas viajar?</h6>
                <div className="border rounded-4 p-4 bg-body-tertiary shadow-sm">
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Fecha de Ida</label>
                    <input type="date" className="form-control rounded-pill px-3" value={answers.fechaInicio} onChange={(e) => handleSelect('fechaInicio', e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label fw-semibold small">Fecha de Vuelta</label>
                    <input type="date" className="form-control rounded-pill px-3" value={answers.fechaFin} onChange={(e) => handleSelect('fechaFin', e.target.value)} min={answers.fechaInicio} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && !loading && !result && (
              <div className="wizard-step">
                <h6 className="text-center fw-bold mb-3">¿Qué buscas en tu compañere de viaje?</h6>
                <div className="d-flex flex-column gap-2">
                  {[
                    { id: 'aventura', icon: 'bi-compass-fill', label: 'Aventura y Naturaleza', desc: 'Exploración, trekking y actividades.' },
                    { id: 'fiesta', icon: 'bi-music-note-beamed', label: 'Vida Nocturna y Fiesta', desc: 'Salidas grupales, bares y socialización.' },
                    { id: 'confort', icon: 'bi-bank', label: 'Comodidad y Cultura', desc: 'Paseos culturales, gastronomía y museos.' }
                  ].map(opt => (
                    <div key={opt.id} className={`card border p-3 d-flex flex-row align-items-center gap-3 rounded-3 cursor-pointer ${answers.companero === opt.id ? 'border-success border-2 bg-success-subtle' : ''}`} onClick={() => handleSelect('companero', opt.id)} style={{cursor: 'pointer'}}>
                      <div className="rounded-3 d-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success shadow-sm" style={{width:'55px',height:'55px'}}>
                        <i className={`bi ${opt.icon} fs-3`}></i>
                      </div>
                      <div className="text-start">
                        <h6 className="fw-bold mb-1 small">{opt.label}</h6>
                        <p className="text-body-secondary small mb-0">{opt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LOADING */}
            {loading && (
              <div className="text-center py-4">
                <div className="spinner-border text-success mb-3" role="status"></div>
                <h6 className="fw-bold">Analizando tus respuestas...</h6>
                <div className="progress mt-3 mx-auto w-75">
                  <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width: `${loadingProgress}%`}}></div>
                </div>
              </div>
            )}

            {/* RESULT */}
            {result && !loading && (
              <div className="d-flex flex-column align-items-center text-center">
                <img src={result.image} alt="Perfil" className="img-fluid rounded-3 shadow-sm border mb-3 object-fit-cover w-50" />
                <span className="badge bg-success bg-opacity-10 text-success mb-2 px-3 py-2 rounded-pill fw-semibold text-uppercase small">Resultado</span>
                <h4 className="fw-bold mb-2">{result.title}</h4>
                <p className="text-body-secondary small mb-3">{result.desc}</p>
                <div className="bg-body-tertiary p-3 rounded-3 border-start border-success border-4 shadow-sm mb-4 w-100 text-start">
                  <h6 className="fw-bold mb-1 small"><i className="bi bi-geo-alt-fill text-success"></i> Destinos recomendados:</h6>
                  <p className="text-body-secondary small mb-0">{result.destinationText}</p>
                </div>
                <button className="btn btn-success w-100 rounded-pill mb-2 fw-semibold" onClick={finishTest}>
                  {isProfileMode ? "Aplicar este perfil a mi cuenta" : "Crear cuenta con este perfil"}
                </button>
                <button className="btn btn-outline-secondary w-100 rounded-pill btn-sm" onClick={restart}>Repetir el test</button>
              </div>
            )}
          </div>
          
          {/* Footer */}
          {!loading && !result && (
            <div className="modal-footer border-0 bg-body-tertiary justify-content-between">
              <button type="button" className="btn btn-outline-secondary rounded-pill btn-sm px-4" onClick={prevStep} disabled={step === 1}>Volver</button>
              <button type="button" className="btn btn-success rounded-pill btn-sm px-4" onClick={nextStep} disabled={!isStepValid()}>Siguiente</button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default TravelerTestModal;
