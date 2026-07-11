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
  }
};
