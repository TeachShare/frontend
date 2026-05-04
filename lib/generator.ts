import { api } from "./axios";

export const GeneratorAPI = {
  generate: async (data: { type: string, subject: string, grade: string, objectives: string }) => {
    const response = await api.post('/ai/generate', data);
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/ai/history');
    return response.data;
  },

  deleteContent: async (id: number) => {
    const response = await api.delete(`/ai/content/${id}`);
    return response.data;
  }
};
