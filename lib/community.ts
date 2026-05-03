import { api } from "./axios"; 

export const CommunityAPI = {
  getFeed: async (page = 1) => {
    // Axios automatically handles the JSON parsing and throws on 4xx/5xx errors
    const response = await api.get('/community/', { 
      params: { page } 
    });
    return response.data;
  },

  createPost: async (content: string, linkedResourceId?: string) => {
    // Your interceptor will automatically attach the X-CSRF-TOKEN here
    const response = await api.post('/community/', { 
      content, 
      linked_resource_id: linkedResourceId 
    });
    return response.data;
  },

  toggleLike: async (postId: number) => {
    const response = await api.post(`/community/${postId}/like`);
    return response.data;
  },

  getComments: async (postId: number) => {
    const response = await api.get(`/community/${postId}/comments`);
    return response.data;
  },

  addComment: async (postId: number, content: string, parentId?: string | null) => {
    const response = await api.post(`/community/${postId}/comments`, { 
      content, 
      parent_id: parentId 
    });
    return response.data;
  }
};