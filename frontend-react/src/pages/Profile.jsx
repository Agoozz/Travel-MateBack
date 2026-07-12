import React, { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../context/AuthContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileAbout from '../components/profile/ProfileAbout';
import ProfileTripDetails from '../components/profile/ProfileTripDetails';
import ProfileTravelerType from '../components/profile/ProfileTravelerType';
import ProfilePhotos from '../components/profile/ProfilePhotos';
import EditProfileModal from '../components/profile/EditProfileModal';
import EditTripModal from '../components/profile/EditTripModal';
import TravelerTestModal from '../components/traveler-test/TravelerTestModal';
import ProfileFeedback from '../components/profile/ProfileFeedback';

export default function Profile() {
  const { profile, loading, saving, error, successMessage, saveProfile, reloadProfile } = useProfile();
  const { logout } = useAuth();
  
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditTrip, setShowEditTrip] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  const handleSaveProfileInfo = async (formData) => {
    const success = await saveProfile(formData);
    if (success) setShowEditProfile(false);
  };

  const handleSaveTripDetails = async (formData) => {
    const success = await saveProfile(formData);
    if (success) setShowEditTrip(false);
  };

  const handleTestComplete = (updatedProfile) => {
    reloadProfile();
    setShowTestModal(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column py-5 mt-5">
        <div className="spinner-border text-success mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando perfil...</span>
        </div>
        <p className="text-muted fw-semibold">Cargando tu perfil...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid max-w-1200 mx-auto">
      <div className="row">
        <main className="col-12 p-4 p-md-5 bg-body-tertiary min-vh-100">
          
          <ProfileFeedback error={error} successMessage={successMessage} />

          <div id="profilePreviewMode" className="row g-4 fade-in">
            <div className="col-12">
              <ProfileHeader profile={profile} onEdit={() => setShowEditProfile(true)} />

              <div className="row g-4">
                <div className="col-lg-6">
                  <ProfileAbout bio={profile?.bio} />
                  <ProfileTripDetails profile={profile} onEdit={() => setShowEditTrip(true)} />
                </div>

                <div className="col-lg-6">
                  <ProfileTravelerType profile={profile} onRetakeTest={() => setShowTestModal(true)} />
                  <ProfilePhotos />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center fade-in">
            <button
              type="button"
              className="btn btn-outline-danger border-2 rounded-pill fw-semibold px-4 py-2"
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        </main>
      </div>

      <EditProfileModal
        show={showEditProfile}
        profile={profile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleSaveProfileInfo}
        saving={saving}
      />

      <EditTripModal
        show={showEditTrip}
        profile={profile}
        onClose={() => setShowEditTrip(false)}
        onSave={handleSaveTripDetails}
        saving={saving}
      />

      <TravelerTestModal
        show={showTestModal}
        onClose={() => setShowTestModal(false)}
        onComplete={handleTestComplete}
        isOnboarding={false}
      />
    </div>
  );
}
