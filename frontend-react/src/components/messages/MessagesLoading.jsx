export default function MessagesLoading({ text = "Cargando..." }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 p-5 fade-in">
      <div className="spinner-border text-success mb-3" role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      <p className="text-muted small fw-medium">{text}</p>
    </div>
  );
}
