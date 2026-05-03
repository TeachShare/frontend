import { api } from "./axios";

export const MessagesAPI = {
  getConversations: async () => {
    const response = await api.get('/messages/conversations');
    return response.data;
  },
  
  getThread: async (partnerId: number | string) => {
    const response = await api.get(`/messages/thread/${partnerId}`);
    return response.data;
  }
};
