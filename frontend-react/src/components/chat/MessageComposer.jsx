import { useState } from 'react';

export default function MessageComposer({ onSendMessage, disabled }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSendMessage(text.trim());
      setText("");
    }
  };

  return (
    <div className="p-3 bg-white border-top">
      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <input 
          type="text" 
          className="form-control rounded-pill bg-body-tertiary border-0 px-4 shadow-none" 
          placeholder="Escribí un mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          autoComplete="off"
        />
        <button 
          type="submit" 
          className="btn btn-success rounded-circle shadow-sm d-flex align-items-center justify-content-center" 
          style={{ width: "42px", height: "42px", flexShrink: 0 }}
          disabled={disabled || !text.trim()}
          aria-label="Enviar mensaje"
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  );
}
