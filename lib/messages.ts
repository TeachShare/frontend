import { api } from "./axios";

export const MessagesAPI = {
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },
  
  getThread: async (partnerId: number | string) => {
    const response = await api.get(`/messages/thread/${partnerId}`);
    return response.data;
  },

  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/messages/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
