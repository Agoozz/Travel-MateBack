export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-center mt-4 mb-5">
      <nav aria-label="Navegación de páginas">
        <ul className="pagination pagination-sm">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link border-success text-success fw-semibold shadow-none" 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
          </li>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button 
                className={`page-link border-success shadow-none ${currentPage === page ? 'bg-success text-white' : 'text-success'}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link border-success text-success fw-semibold shadow-none" 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
