export default function ConversationItem({ contact, isActive, onClick }) {
  return (
    <div 
      className={`list-group-item list-group-item-action p-3 d-flex align-items-center gap-3 border-0 border-bottom ${isActive ? 'bg-success bg-opacity-10 border-start border-4 border-success-subtle' : ''}`}
      onClick={() => onClick(contact)}
      style={{ cursor: "pointer", transition: "background-color 0.2s" }}
      role="button"
    >
      <div className="position-relative flex-shrink-0">
        <img 
          src={contact.avatar || "https://i.pravatar.cc/150"} 
          className="rounded-circle object-fit-cover shadow-sm" 
          alt={contact.name}
          width="50" 
          height="50"
          onError={(e) => { e.target.src = "https://i.pravatar.cc/150"; }}
        />
        {contact.isOffline && (
          <span 
            className="position-absolute bottom-0 end-0 p-1 border border-2 border-white rounded-circle bg-secondary"
            style={{ width: "12px", height: "12px", transform: "translate(2px, 2px)" }}
            title="Modo Offline"
          ></span>
        )}
      </div>

      <div className="flex-grow-1 overflow-hidden">
        <div className="d-flex justify-content-between align-items-baseline mb-1">
          <h6 className="mb-0 fw-bold text-truncate">{contact.name}</h6>
        </div>
        <p className={`mb-0 small text-truncate ${isActive ? 'text-success fw-semibold' : 'text-muted'}`}>
          {contact.lastMsg || "Empieza a chatear"}
        </p>
      </div>
    </div>
  );
}
