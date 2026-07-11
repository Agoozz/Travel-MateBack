export default function StepIndicator({ currentStep, totalSteps }) {
  const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="position-relative w-75 mx-auto mb-5 mt-4">
      <div className="progress" style={{ height: "4px" }}>
        <div 
          className="progress-bar bg-success transition-all" 
          role="progressbar" 
          style={{ width: `${progressWidth}%`, transition: "width 0.3s ease" }} 
          aria-valuenow={progressWidth} 
          aria-valuemin="0" 
          aria-valuemax="100"
        ></div>
      </div>
      <div className="d-flex justify-content-between position-absolute top-50 start-0 w-100 translate-middle-y" style={{ padding: "0 0%" }}>
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          
          let circleClass = "rounded-circle d-flex align-items-center justify-content-center transition-all border border-2 border-white ";
          if (isActive) {
            circleClass += "bg-success text-white shadow";
          } else if (isCompleted) {
            circleClass += "bg-success text-white";
          } else {
            circleClass += "bg-body-secondary text-body-secondary";
          }

          return (
            <div 
              key={stepNum} 
              className={circleClass} 
              style={{ width: "32px", height: "32px", fontSize: "14px", fontWeight: "600", transition: "all 0.3s ease", zIndex: 2 }}
            >
              {isCompleted ? <i className="bi bi-check-lg"></i> : stepNum}
            </div>
          );
        })}
      </div>
    </div>
  );
}
