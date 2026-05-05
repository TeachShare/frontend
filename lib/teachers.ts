import { api } from "./axios";

export const TeacherAPI = {
  getTeachers: async (page = 1, perPage = 20) => {
    const response = await api.get(`/teachers/?page=${page}&per_page=${perPage}`);
    return response.data;
  },

  getProfile: async (teacherId: number | string) => {
    const response = await api.get(`/teachers/${teacherId}`);
    return response.data;
  },
  
  getTeacherResources: async (teacherId: number | string) => {
    const response = await api.get(`/teachers/${teacherId}/resources`);
    return response.data;
  },

  toggleFollow: async (teacherId: number | string) => {
    const response = await api.post(`/teachers/${teacherId}/follow`);
    return response.data;
  },

  updateProfile: async (data: { role?: string; institution?: string; bio?: string }) => {
    const response = await api.put('/teachers/update', data);
    return response.data;
  }
};
