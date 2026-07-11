import { useState } from 'react';

export default function DateStep({ answers, setAnswers }) {
  const today = new Date();
  const [displayYear, setDisplayYear] = useState(today.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(today.getMonth());

  // Helper functions
  const isDaySelected = (day) => {
    return answers.fechas.some(
      (f) => f.day === day && f.month === displayMonth && f.year === displayYear
    );
  };

  const isDayInRange = (day) => {
    if (answers.fechas.length !== 2) return false;
    
    const sorted = [...answers.fechas].sort((a, b) => new Date(a.year, a.month, a.day) - new Date(b.year, b.month, b.day));
    const start = new Date(sorted[0].year, sorted[0].month, sorted[0].day);
    const end = new Date(sorted[1].year, sorted[1].month, sorted[1].day);
    const current = new Date(displayYear, displayMonth, day);
    
    return current > start && current < end;
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(displayYear, displayMonth, day);

    if (answers.fechas.length === 0 || answers.fechas.length === 2) {
      setAnswers(prev => ({ ...prev, fechas: [{ day, month: displayMonth, year: displayYear }] }));
    } else if (answers.fechas.length === 1) {
      const start = new Date(answers.fechas[0].year, answers.fechas[0].month, answers.fechas[0].day);
      if (clickedDate.getTime() === start.getTime()) {
        setAnswers(prev => ({ ...prev, fechas: [] }));
      } else if (clickedDate < start) {
        setAnswers(prev => ({ ...prev, fechas: [{ day, month: displayMonth, year: displayYear }, prev.fechas[0]] }));
      } else {
        setAnswers(prev => ({ ...prev, fechas: [prev.fechas[0], { day, month: displayMonth, year: displayYear }] }));
      }
    }
  };

  // Calendar generation logic
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  
  const totalDays = getDaysInMonth(displayYear, displayMonth);
  const firstDayIndex = getFirstDayOfMonth(displayYear, displayMonth);
  const prevTotalDays = getDaysInMonth(displayYear, displayMonth - 1);

  const prevMonthCells = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    prevMonthCells.push(
      <button key={`prev-${i}`} type="button" className="btn btn-sm border-0 rounded-2 p-2 small text-muted opacity-50" disabled>
        {prevTotalDays - i}
      </button>
    );
  }

  const currentMonthCells = [];
  for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
    const cellMidnight = new Date(displayYear, displayMonth, dayNum);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isPast = cellMidnight < todayMidnight;

    let className = "btn btn-sm border-0 rounded-2 p-2 small fw-semibold ";
    if (isPast) {
      className += "text-muted opacity-25";
    } else if (isDaySelected(dayNum)) {
      className += "selected bg-success text-white border-success border-2";
    } else if (isDayInRange(dayNum)) {
      className += "bg-success bg-opacity-25 text-success";
    } else {
      className += "hover-bg-light";
    }

    currentMonthCells.push(
      <button 
        key={`curr-${dayNum}`} 
        type="button" 
        className={className} 
        disabled={isPast}
        onClick={() => handleDayClick(dayNum)}
      >
        {dayNum}
      </button>
    );
  }

  const totalCells = firstDayIndex + totalDays;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  const nextMonthCells = [];
  for (let i = 1; i <= remainingCells; i++) {
    nextMonthCells.push(
      <button key={`next-${i}`} type="button" className="btn btn-sm border-0 rounded-2 p-2 small text-muted opacity-50" disabled>
        {i}
      </button>
    );
  }

  const titleText = new Date(displayYear, displayMonth).toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  const capitalizedTitle = titleText.charAt(0).toUpperCase() + titleText.slice(1);
  const isPrevDisabled = displayYear === today.getFullYear() && displayMonth === today.getMonth();

  const handlePrevMonth = () => {
    if (!isPrevDisabled) {
      if (displayMonth === 0) {
        setDisplayMonth(11);
        setDisplayYear(y => y - 1);
      } else {
        setDisplayMonth(m => m - 1);
      }
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(y => y + 1);
    } else {
      setDisplayMonth(m => m + 1);
    }
  };

  return (
    <div className="text-center fade-in">
      <h4 className="fw-bold mb-3">¿Cuándo te gustaría viajar?</h4>
      <p className="text-muted mb-4">Seleccioná un rango de fechas estimadas.</p>
      
      <div className="card border mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-header bg-white border-bottom-0 pt-3 pb-2 d-flex justify-content-between align-items-center">
          <button 
            type="button" 
            className="btn btn-sm btn-outline-secondary border-0" 
            onClick={handlePrevMonth}
            disabled={isPrevDisabled}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <span className="fw-bold">{capitalizedTitle}</span>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-secondary border-0" 
            onClick={handleNextMonth}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <div className="card-body p-3">
          <div className="d-grid text-center mb-2" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
            <span className="small text-muted fw-bold">Do</span>
            <span className="small text-muted fw-bold">Lu</span>
            <span className="small text-muted fw-bold">Ma</span>
            <span className="small text-muted fw-bold">Mi</span>
            <span className="small text-muted fw-bold">Ju</span>
            <span className="small text-muted fw-bold">Vi</span>
            <span className="small text-muted fw-bold">Sa</span>
          </div>
          <div className="d-grid text-center gap-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
            {prevMonthCells}
            {currentMonthCells}
            {nextMonthCells}
          </div>
        </div>
      </div>
    </div>
  );
}
