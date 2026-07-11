import { fetchAPI } from './api';

export const matchService = {
  async sendInvitation(userId) {
    try {
      const data = await fetchAPI(`/matches/invitar/${userId}`, {
        method: 'POST',
      });
      return data;
    } catch (err) {
      console.warn("Backend offline o error al invitar. Simulando match localmente.");
      if (err.message === "Failed to fetch" || err.message.includes("fetch") || err.message.includes("offline")) {
        // Mock a successful match response when backend is offline
        return { hayMatch: true, message: "Match simulado en modo offline." };
      }
      throw err;
    }
  },

  async getMatches() {
    try {
      const response = await fetchAPI('/matches', {
        method: 'GET'
      });
      return response.matches || [];
    } catch (error) {
      console.warn("Backend offline o error al obtener matches. Retornando array vacío.");
      return [];
    }
  },

  async getMatchStatus(targetUserId) {
    try {
      const matches = await this.getMatches();
      const match = matches.find(m => 
        (m.usuario1 && m.usuario1._id === targetUserId) || 
        (m.usuario2 && m.usuario2._id === targetUserId)
      );
      
      return {
        isMatch: !!match,
        status: match ? match.estado : 'none',
        matchData: match || null
      };
    } catch (error) {
      console.error("Error al verificar estado de match:", error);
      return { isMatch: false, status: 'error', matchData: null };
    }
  }
};
