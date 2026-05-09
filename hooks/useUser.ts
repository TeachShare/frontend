import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

// 1. We MUST define what the data looks like so TypeScript doesn't panic
export interface TeacherInfo {
  first_name: string;
  last_name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile?: string;
  role?: string;
  institution?: string;
  bio?: string;
  is_verified: boolean;
  is_admin: boolean;
}

// 2. The fetcher function
const fetchCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Not authenticated");
    }
    throw error;
  }
};

// 3. The custom hook
export const useUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
