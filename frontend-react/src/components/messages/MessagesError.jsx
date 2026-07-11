export default function MessagesError({ error }) {
  if (!error) return null;

  return (
    <div className="alert alert-danger m-3 d-flex align-items-center rounded-3 border-0 shadow-sm" role="alert">
      <i className="bi bi-exclamation-triangle-fill fs-5 me-3"></i>
      <div>
        <strong>Error:</strong> {error}
      </div>
    </div>
  );
}
