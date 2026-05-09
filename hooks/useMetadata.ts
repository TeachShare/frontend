import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export const useMetadata = () => {
  return useQuery({
    queryKey: ["formMetadata"],
    queryFn: async () => {
      try {
        const response = await api.get("/data/form-options");
        if (response.data?.success) {
          return response.data.data;
        }
        console.error("Metadata API returned failure:", response.data);
        return { subjects: [], grade_levels: [], content_types: [] };
      } catch (error: any) {
        console.error("Failed to fetch form metadata:", error.response?.data || error.message);
        return { subjects: [], grade_levels: [], content_types: [] };
      }
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache
    retry: 2
  });
};