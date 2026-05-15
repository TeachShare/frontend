import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export interface DashboardStats {
  total_resources: number;
  published_count: number;
  draft_count: number;
  total_likes: number;
  followers_count: number;
  following_count: number;
  period_resources: number;
  period_likes: number;
  roadmap?: {
    profile_complete: boolean;
    profile_completion_percentage: number;
    resources_published: number;
    resources_goal: number;
    likes_received: number;
    likes_goal: number;
    is_verified: boolean;
  }
}

const fetchDashboardStats = async (days: number): Promise<DashboardStats> => {
  const response = await api.get(`/teachers/stats?days=${days}`);
  return response.data.data;
};

export const useDashboardStats = (days: number = 30) => {
  return useQuery({
    queryKey: ["dashboardStats", days],
    queryFn: () => fetchDashboardStats(days),
  });
};
