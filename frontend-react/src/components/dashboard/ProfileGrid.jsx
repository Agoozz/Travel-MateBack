import ProfileCard from './ProfileCard';

export default function ProfileGrid({ profiles, loading, error, onViewProfile, onInvite }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando perfiles...</span>
        </div>
        <p className="mt-3 text-body-secondary">Buscando compañeros de ruta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger py-3 px-4 rounded-4 shadow-sm" role="alert">
        <h5 className="alert-heading fw-bold">Ups! Algo salió mal.</h5>
        <p className="mb-0 small">{error}</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-5 bg-body rounded-4 shadow-sm border-0 my-4">
        <i className="bi bi-search text-body-tertiary" style={{ fontSize: "3rem" }}></i>
        <h4 className="mt-3 fw-bold text-body-emphasis">Sin resultados</h4>
        <p className="text-body-secondary">No encontramos viajeros con esos filtros.</p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
      {profiles.map(profile => (
        <div className="col" key={profile._id}>
          <ProfileCard 
            profile={profile} 
            onViewProfile={onViewProfile} 
            onInvite={onInvite} 
          />
        </div>
      ))}
    </div>
  );
}
