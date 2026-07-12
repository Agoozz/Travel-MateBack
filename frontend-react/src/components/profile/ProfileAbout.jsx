import React from 'react';

export default function ProfileAbout({ bio }) {
  if (!bio) {
    return (
      <div className="card border-0 shadow-sm p-4 rounded-4 mb-4 bg-body fade-in">
        <h4 className="fw-bold text-body-emphasis mb-3 fs-5 d-flex align-items-center gap-2">
          <i className="bi bi-person-fill text-success"></i> Sobre mí
        </h4>
        <p className="text-body-secondary small mb-0 lh-base fs-6 fst-italic">
          Aún no escribiste tu biografía. ¡Animate a contarle a los demás sobre vos!
        </p>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm p-4 rounded-4 mb-4 bg-body fade-in">
      <h4 className="fw-bold text-body-emphasis mb-3 fs-5 d-flex align-items-center gap-2">
        <i className="bi bi-person-fill text-success"></i> Sobre mí
      </h4>
      <p className="text-body-secondary small mb-0 lh-base fs-6">
        {bio}
      </p>
    </div>
  );
}
