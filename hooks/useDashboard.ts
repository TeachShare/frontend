import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export interface DashboardStats {
  total_resources: number;
  published_count: number;
  draft_count: number;
  total_likes: number;
  followers_count: number;
  following_count: number;
}

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/teachers/stats");
  return response.data.data;
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });
};
