export default function MessageBubble({ message, _isLast }) {
  const isSent = message.sender === 'sent';
  
  const baseClasses = "p-2 px-3 mb-2 rounded-4 shadow-sm position-relative fade-in";
  const typeClasses = isSent 
    ? "bg-success text-white align-self-end ms-auto text-end"
    : "bg-body-secondary text-body-emphasis align-self-start border border-light-subtle";
    
  return (
    <div 
      className={`${baseClasses} ${typeClasses}`} 
      style={{ maxWidth: '75%', wordBreak: 'break-word' }}
    >
      <div>{message.text}</div>
      <div className={`small ${isSent ? 'text-white-50' : 'text-muted'} mt-1`} style={{ fontSize: '0.7rem' }}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}
