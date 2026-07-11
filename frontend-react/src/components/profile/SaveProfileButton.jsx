export default function SaveProfileButton({ saving, onClick, disabled }) {
  return (
    <div className="d-flex justify-content-end mb-5">
      <button 
        type="button" 
        className="btn btn-success fw-bold px-4 py-2 rounded-pill shadow-sm"
        onClick={onClick}
        disabled={saving || disabled}
      >
        {saving ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            <span role="status">Guardando...</span>
          </>
        ) : (
          <>
            <i className="bi bi-save me-2"></i>
            Guardar Cambios
          </>
        )}
      </button>
    </div>
  );
}
