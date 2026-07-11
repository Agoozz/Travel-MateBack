export default function TypingIndicator() {
  return (
    <div className="p-2 px-3 mb-2 rounded-4 bg-body-secondary align-self-start border border-light-subtle fade-in" style={{ width: 'fit-content' }}>
      <div className="typing-indicator d-flex gap-1 align-items-center h-100 py-1">
        <span className="dot bg-secondary rounded-circle" style={{ width: '6px', height: '6px' }}></span>
        <span className="dot bg-secondary rounded-circle" style={{ width: '6px', height: '6px', animationDelay: '0.2s' }}></span>
        <span className="dot bg-secondary rounded-circle" style={{ width: '6px', height: '6px', animationDelay: '0.4s' }}></span>
      </div>
    </div>
  );
}
