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
  }
};
