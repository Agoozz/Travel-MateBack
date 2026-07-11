import { useState, useEffect, useMemo } from 'react';
import { profileService } from '../services/profileService';
import { matchService } from '../services/matchService';

export function useProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    search: "",
    region: "",
    travelStyle: "",
    budget: "",
  });

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const data = await profileService.getProfiles();
      setProfiles(data);
    } catch (err) {
      setError(err.message || "Error al cargar perfiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const clearFilters = () => {
    setFilters({ search: "", region: "", travelStyle: "", budget: "" });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredProfiles = useMemo(() => {
    return profiles.filter(p => {
      // 1. Search (nombre o bio)
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const text = `${p.nombre} ${p.bio} ${p.ubicacion} ${p.destino}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      // 2. Region / Destination (Vanilla sometimes maps quick filters to search input, but we'll do exact matches if possible or substring)
      if (filters.region) {
        const text = `${p.ubicacion} ${p.destino}`.toLowerCase();
        if (!text.includes(filters.region.toLowerCase())) return false;
      }
      // 3. Travel Style
      if (filters.travelStyle && p.estiloViaje !== filters.travelStyle) return false;
      // 4. Budget
      if (filters.budget && p.presupuesto !== filters.budget) return false;

      return true;
    });
  }, [profiles, filters]);

  const sendInvitation = async (userId) => {
    // This function will be called by the components. The components will handle their own 
    // local loading state for the specific button, but this function does the network call.
    const data = await matchService.sendInvitation(userId);
    // Remove profile from the list if it's a match, just like vanilla does
    if (data.hayMatch) {
      setProfiles(prev => prev.filter(p => p._id !== userId));
    }
    return data;
  };

  return {
    profiles: filteredProfiles,
    loading,
    error,
    filters,
    handleFilterChange,
    clearFilters,
    sendInvitation
  };
}
