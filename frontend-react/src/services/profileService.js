import { fetchAPI } from './api';
import { mockProfiles } from '../data/mockProfiles';

export const profileService = {
  async getProfiles() {
    try {
      const data = await fetchAPI('/perfiles', {
        method: 'GET',
      });
      return data.perfiles || [];
    } catch (err) {
      console.warn("Backend offline o error. Usando perfiles mock.");
      if (err.message === "Failed to fetch" || err.message.includes("fetch")) {
        return mockProfiles;
      }
      throw err;
    }
  },
  
  getMyProfile() {
    // Read from localStorage exactly as Vanilla does for parity
    return {
      nombre: localStorage.getItem('user_name') || '',
      edad: localStorage.getItem('user_age') || '',
      ubicacion: localStorage.getItem('user_hometown') || '',
      bio: localStorage.getItem('user_bio') || '',
      avatar: localStorage.getItem('user_avatar') || 'https://i.pravatar.cc/150?img=12',
      estiloViaje: localStorage.getItem('user_travel_style_key') || 'mochilero',
      presupuesto: localStorage.getItem('user_budget') || 'economico',
      estiloCompanero: localStorage.getItem('user_companion_style') || 'aventura',
      regiones: JSON.parse(localStorage.getItem('user_regions') || '["patagonia"]'),
      destino: localStorage.getItem('user_destination') || '',
      fechaInicio: localStorage.getItem('user_start_date') || '',
      fechaFin: localStorage.getItem('user_end_date') || '',
      intereses: localStorage.getItem('user_interests') || '',
      idiomas: localStorage.getItem('user_languages') || '',
      progresoPerfil: localStorage.getItem('user_profile_progress') || 0
    };
  },

  async updateMyProfile(profileData) {
    let isOffline = false;
    let backendUser = null;
    try {
      // 1. Call the backend API for the supported fields
      const payload = {
        nombre: profileData.nombre,
        ubicacion: profileData.ubicacion,
        bio: profileData.bio,
        estiloViaje: profileData.estiloViaje,
        presupuesto: profileData.presupuesto,
        fechaInicio: profileData.fechaInicio,
        fechaFin: profileData.fechaFin,
        destino: profileData.destino,
        estiloCompanero: profileData.estiloCompanero,
        regiones: profileData.regiones,
        edad: profileData.edad,
        avatar: profileData.avatar,
        idiomas: profileData.idiomas,
        intereses: profileData.intereses
      };
      
      const token = localStorage.getItem("token");
      if (token && !token.startsWith("offline-")) {
        const response = await fetchAPI('/perfiles/me', {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
        backendUser = response.usuario;
      } else {
        isOffline = true;
      }
    } catch (err) {
      console.warn("Backend offline o error al actualizar perfil. Guardando localmente.", err);
      isOffline = true;
      if (err.message !== "Failed to fetch" && !err.message.includes("fetch")) {
        throw err;
      }
    }

    // 2. Save everything to localStorage for parity with Vanilla
    localStorage.setItem("user_name", profileData.nombre || "");
    if (profileData.edad) localStorage.setItem("user_age", profileData.edad);
    localStorage.setItem("user_hometown", profileData.ubicacion || "");
    localStorage.setItem("user_bio", profileData.bio || "");
    localStorage.setItem("user_avatar", profileData.avatar || "https://i.pravatar.cc/150?img=12");
    localStorage.setItem("user_travel_style_key", profileData.estiloViaje || "");
    localStorage.setItem("user_budget", profileData.presupuesto || "");
    if (profileData.estiloCompanero) localStorage.setItem("user_companion_style", profileData.estiloCompanero);
    if (profileData.regiones) localStorage.setItem("user_regions", JSON.stringify(profileData.regiones));
    if (profileData.destino) localStorage.setItem("user_destination", profileData.destino);
    localStorage.setItem("user_start_date", profileData.fechaInicio || "");
    localStorage.setItem("user_end_date", profileData.fechaFin || "");
    localStorage.setItem("user_languages", profileData.idiomas || "");
    localStorage.setItem("user_interests", profileData.intereses || "");
    
    if (backendUser && backendUser.progresoPerfil) {
      localStorage.setItem("user_profile_progress", backendUser.progresoPerfil);
    }

    return { data: backendUser || this.getMyProfile(), isOffline };
  }
};
