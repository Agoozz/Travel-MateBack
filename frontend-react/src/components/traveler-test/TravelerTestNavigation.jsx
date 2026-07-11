export default function TravelerTestNavigation({ currentStep, totalSteps, onPrev, onNext, nextDisabled }) {
  if (currentStep > totalSteps) return null; // Don't show in ResultStep

  return (
    <div className="modal-footer bg-light border-top-0 rounded-bottom-4 d-flex justify-content-between p-4">
      <button 
        type="button" 
        className="btn btn-outline-secondary px-4 rounded-pill fw-semibold" 
        onClick={onPrev}
        disabled={currentStep === 1}
      >
        <i className="bi bi-arrow-left me-2"></i> Anterior
      </button>

      <button 
        type="button" 
        className="btn btn-success px-4 rounded-pill fw-bold" 
        onClick={onNext}
        disabled={nextDisabled}
      >
        {currentStep === totalSteps ? 'Finalizar Test' : 'Siguiente'} <i className="bi bi-arrow-right ms-2"></i>
      </button>
    </div>
  );
}
