import { useQuery } from "@tanstack/react-query";

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

// 2. We explicitly tell the function that it will return a Promise containing our User
const fetchCurrentUser = async (): Promise<User> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  const response = await fetch(`${apiUrl}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Not authenticated");
  }

  // TypeScript now knows this isn't just random data
  return response.json();
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
