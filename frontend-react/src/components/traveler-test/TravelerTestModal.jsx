import { useState, useEffect } from 'react';
import StepIndicator from './StepIndicator';
import TravelerTestNavigation from './TravelerTestNavigation';
import TravelTypeStep from './TravelTypeStep';
import BudgetStep from './BudgetStep';
import RegionStep from './RegionStep';
import ProvinceStep from './ProvinceStep';
import CompanionStep from './CompanionStep';
import DateStep from './DateStep';
import ResultStep from './ResultStep';
import './TravelerTest.css';

const initialAnswers = {
  tipoViaje: "",
  presupuesto: "",
  region: "",
  destino: "",
  fechas: [],
  companero: "",
};

export default function TravelerTestModal({ show, onClose, onComplete }) {
  const totalSteps = 6;

  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState(initialAnswers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      setCurrentStep(1);
      setAnswers(initialAnswers);
      setLoading(false);
      
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Adjust for scrollbar width
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [show]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && show && !loading && currentStep <= totalSteps) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [show, loading, currentStep, onClose]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Show loading before result
      setLoading(true);
      setCurrentStep(totalSteps + 1); // Move to result step logically
      
      setTimeout(() => {
        setLoading(false);
      }, 2000); // 2 second mock loading
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = (selectedProfileKey, selectedProfileTitle) => {
    // Save minimal test results to localStorage
    localStorage.setItem("user_travel_style", selectedProfileTitle);
    localStorage.setItem("user_travel_style_key", answers.tipoViaje || "mochilero");
    localStorage.setItem("user_budget", answers.presupuesto || "economico");
    localStorage.setItem("user_companion_style", answers.companero || "aventura");
    
    const regionKey = answers.region || "patagonia";
    localStorage.setItem("user_regions", JSON.stringify([regionKey]));
    
    const regionLabel = {
      noa: "Noroeste (NOA)", nea: "Noreste (NEA)", cuyo: "Cuyo", pampeana: "Pampeana", patagonia: "Patagonia",
    }[regionKey] || "Patagonia";
    
    localStorage.setItem("user_region", regionLabel);
    localStorage.setItem("user_destination", answers.destino || "");

    if (answers.fechas && answers.fechas.length === 2) {
      const sorted = [...answers.fechas].sort((a, b) => new Date(a.year, a.month, a.day) - new Date(b.year, b.month, b.day));
      const format = (d) => `${d.year}-${String(d.month + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
      localStorage.setItem("user_start_date", format(sorted[0]));
      localStorage.setItem("user_end_date", format(sorted[1]));
    }

    onComplete();
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !answers.tipoViaje) return true;
    if (currentStep === 2 && !answers.presupuesto) return true;
    if (currentStep === 3 && !answers.region) return true;
    if (currentStep === 4 && !answers.destino) return true;
    if (currentStep === 5 && !answers.companero) return true;
    if (currentStep === 6 && answers.fechas.length !== 2) return true;
    return false;
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
      <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        style={{ zIndex: 1055, overflowY: 'auto' }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !loading && currentStep <= totalSteps) {
            onClose();
          }
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            
            <div className="modal-header bg-success text-white border-0 py-3">
              <h5 className="modal-title fw-bold">
                <i className="bi bi-compass-fill me-2"></i> 
                {currentStep <= totalSteps ? 'Test de Viajero' : 'Tu Perfil Ideal'}
              </h5>
              {currentStep <= totalSteps && !loading && (
                <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
              )}
            </div>

            <div className="modal-body p-4 p-md-5">
              {currentStep <= totalSteps && (
                <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
              )}

              <div className="wizard-content min-h-300">
                {currentStep === 1 && <TravelTypeStep answers={answers} setAnswers={setAnswers} />}
                {currentStep === 2 && <BudgetStep answers={answers} setAnswers={setAnswers} />}
                {currentStep === 3 && <RegionStep answers={answers} setAnswers={setAnswers} />}
                {currentStep === 4 && <ProvinceStep answers={answers} setAnswers={setAnswers} />}
                {currentStep === 5 && <CompanionStep answers={answers} setAnswers={setAnswers} />}
                {currentStep === 6 && <DateStep answers={answers} setAnswers={setAnswers} />}
                
                {loading && (
                  <div className="text-center py-5 fade-in">
                    <div className="spinner-border text-success" role="status" style={{ width: '4rem', height: '4rem' }}>
                      <span className="visually-hidden">Procesando...</span>
                    </div>
                    <h5 className="mt-4 fw-bold">Analizando tu perfil...</h5>
                    <p className="text-muted">Buscando los mejores destinos y compañeros para vos</p>
                  </div>
                )}

                {currentStep > totalSteps && !loading && (
                  <ResultStep answers={answers} onComplete={handleComplete} />
                )}
              </div>
            </div>

            {!loading && currentStep <= totalSteps && (
              <TravelerTestNavigation 
                currentStep={currentStep} 
                totalSteps={totalSteps} 
                onPrev={handlePrev} 
                onNext={handleNext} 
                nextDisabled={isNextDisabled()} 
              />
            )}

          </div>
        </div>
      </div>
    </>
  );
}
