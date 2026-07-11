export default function EmptyConversation() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center text-muted fade-in p-4">
      <div className="bg-success bg-opacity-10 p-4 rounded-circle mb-3">
        <i className="bi bi-chat-dots-fill fs-1 text-success"></i>
      </div>
      <h5 className="fw-bold text-body-emphasis">Tus Mensajes</h5>
      <p>Seleccioná una conversación a la izquierda para empezar a chatear con tus compañeros de viaje.</p>
    </div>
  );
}
