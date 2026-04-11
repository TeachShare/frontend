import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export const useMetadata = () => {
  return useQuery({
    queryKey: ["formMetadata"],
    queryFn: async () => {
      const response = await api.get("/data/form-options");
      return response.data.data; 
    },
    staleTime: Infinity, 
  });
};