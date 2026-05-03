// Add this to your API service file (e.g., lib/api/community.ts or lib/api/resources.ts)
import { api } from "./axios"; // Your custom axios instance

export const ResourceAPI = {
  getMyResources: async () => {
    // Make sure the URL prefix matches your Flask blueprint setup
    const response = await api.get('/resource_collection/my-resources'); 
    return response.data;
  }
};