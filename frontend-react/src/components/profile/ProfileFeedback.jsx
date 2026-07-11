export default function ProfileFeedback({ error, successMessage }) {
  if (!error && !successMessage) return null;

  return (
    <div className="mb-4">
      {error && (
        <div className="alert alert-danger d-flex align-items-center rounded-3 border-0 shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill fs-5 me-3"></i>
          <div>
            <strong>Ocurrió un error:</strong> {error}
          </div>
        </div>
      )}
      
      {successMessage && (
        <div className="alert alert-success d-flex align-items-center rounded-3 border-0 shadow-sm" role="alert">
          <i className="bi bi-check-circle-fill fs-5 me-3"></i>
          <div>
            {successMessage}
          </div>
        </div>
      )}
    </div>
  );
}
