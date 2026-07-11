import { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import ProfileSummary from '../components/profile/ProfileSummary';
import ProfileForm from '../components/profile/ProfileForm';
import TravelPreferences from '../components/profile/TravelPreferences';
import AvailabilitySection from '../components/profile/AvailabilitySection';
import ProfileProgress from '../components/profile/ProfileProgress';
import SaveProfileButton from '../components/profile/SaveProfileButton';
import ProfileFeedback from '../components/profile/ProfileFeedback';
import TravelerTestModal from '../components/traveler-test/TravelerTestModal';

export default function Profile() {
  const { profile, loading, saving, error, successMessage, saveProfile, progress, reloadProfile } = useProfile();
  const [formData, setFormData] = useState(null);
  const [showTestModal, setShowTestModal] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({ ...profile });
    }
  }, [profile]);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!formData) return;
    
    // Basic validation
    if (!formData.nombre || formData.nombre.trim() === "") {
      alert("El nombre es obligatorio"); // A more integrated validation would be better, but we keep it simple as requested
      return;
    }
    
    if (formData.fechaInicio && formData.fechaFin) {
      const start = new Date(formData.fechaInicio);
      const end = new Date(formData.fechaFin);
      if (end < start) {
        alert("La fecha de vuelta no puede ser anterior a la de ida");
        return;
      }
    }

    await saveProfile(formData);
  };

  const handleTestComplete = () => {
    // When the test finishes, reload the profile from localStorage to reflect the changes in the UI
    reloadProfile();
    setShowTestModal(false);
  };

  if (loading || !formData) {
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
    <div className="container-fluid py-4 max-w-1200 mx-auto fade-in">
      <div className="row g-4 mb-4 align-items-center">
        <div className="col-md-8">
          <h2 className="fw-bold text-body-emphasis mb-1">Tu Espacio Personal</h2>
          <p className="text-body-secondary mb-0">Gestioná tu información, afinidades y próximos destinos</p>
        </div>
      </div>

      <ProfileFeedback error={error} successMessage={successMessage} />

      <div className="row g-4">
        {/* Left Column - Preview and Progress */}
        <div className="col-xl-4 col-lg-5">
          <div className="sticky-top" style={{ top: "2rem", zIndex: 1 }}>
            <ProfileProgress progress={progress} />
            <ProfileSummary 
              profile={formData} 
              progress={progress} 
              onTakeTest={() => setShowTestModal(true)} 
            />
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="col-xl-8 col-lg-7">
          <ProfileForm profileData={formData} onChange={handleChange} />
          <TravelPreferences profileData={formData} onChange={handleChange} />
          <AvailabilitySection profileData={formData} onChange={handleChange} />
          <SaveProfileButton saving={saving} onClick={handleSave} disabled={false} />
        </div>
      </div>

      <TravelerTestModal 
        show={showTestModal} 
        onClose={() => setShowTestModal(false)}
        onComplete={handleTestComplete}
      />
    </div>
  );
}
