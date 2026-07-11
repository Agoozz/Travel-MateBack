import { useState, useEffect, useCallback } from 'react';
import { profileService } from '../services/profileService';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const loadProfile = useCallback(() => {
    setLoading(true);
    try {
      const data = profileService.getMyProfile();
      setProfile(data);
    } catch (err) {
      setError(err.message || "Error al cargar el perfil");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const saveProfile = async (profileData) => {
    setSaving(true);
    setError(null);
    setSuccessMessage("");
    
    try {
      const { data, isOffline } = await profileService.updateMyProfile(profileData);
      setProfile(data);
      setSuccessMessage(isOffline ? "Guardado localmente (Modo Demostración)" : "¡Perfil guardado correctamente en el servidor!");
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
      return true;
    } catch (err) {
      setError(err.message || "Error al guardar el perfil");
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Pure function to calculate progress exactly as Vanilla did
  const calculateProgress = (data) => {
    if (!data) return 0;
    let score = 0;

    if (data.nombre) score += 10;
    if (data.edad) score += 10;
    if (data.ubicacion) score += 10;
    if (data.bio) score += 15;
    if (data.avatar && data.avatar !== "https://i.pravatar.cc/150?img=12") score += 15;

    if (data.estiloViaje) score += 10;
    if (data.estiloCompanero) score += 10;
    if (data.presupuesto) score += 5;

    if (data.destino) score += 5;
    if (data.fechaInicio && data.fechaFin) score += 5;
    if (data.intereses) score += 5;
    if (data.idiomas) score += 5;

    return Math.min(score, 100);
  };

  return {
    profile,
    loading,
    saving,
    error,
    successMessage,
    saveProfile,
    reloadProfile: loadProfile,
    progress: calculateProgress(profile)
  };
}
