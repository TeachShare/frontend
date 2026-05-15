import { api } from "./axios";

export const TeacherAPI = {
  getTeachers: async (page = 1, perPage = 20, search = "") => {
    const response = await api.get(`/teachers/?page=${page}&per_page=${perPage}${search ? `&search=${search}` : ""}`);
    return response.data;
  },

  getProfile: async (teacherIdOrUsername: number | string) => {
    if (typeof teacherIdOrUsername === 'string' && isNaN(Number(teacherIdOrUsername))) {
      const response = await api.get(`/teachers/u/${teacherIdOrUsername}`);
      return response.data;
    }
    const response = await api.get(`/teachers/${teacherIdOrUsername}`);
    return response.data;
  },
  
  getTeacherResources: async (teacherId: number | string) => {
    const response = await api.get(`/teachers/${teacherId}/resources`);
    return response.data;
  },

  getTeacherActivity: async (teacherId: number | string, page = 1) => {
    const response = await api.get(`/teachers/${teacherId}/activity?page=${page}`);
    return response.data;
  },

  toggleFollow: async (teacherId: number | string) => {
    const response = await api.post(`/teachers/${teacherId}/follow`);
    return response.data;
  },

  updateProfile: async (data: { 
    role?: string; 
    institution?: string; 
    bio?: string; 
    profile_image_url?: string;
    theme_preference?: string;
    email_notifications?: boolean;
    push_notifications?: boolean;
    is_profile_public?: boolean;
    show_email_on_profile?: boolean;
  }) => {
    const response = await api.put('/teachers/update', data);
    return response.data;
  },

  changePassword: async (passwords: { current_password: string; new_password: string }) => {
    const response = await api.post('/auth/change-password', passwords);
    return response.data;
  },

  uploadProfilePhoto: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/teachers/update/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  archiveAccount: async () => {
    const response = await api.post('/teachers/archive');
    return response.data;
  },

  restoreAccount: async () => {
    const response = await api.post('/teachers/restore');
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete('/teachers/delete');
    return response.data;
  }
};
