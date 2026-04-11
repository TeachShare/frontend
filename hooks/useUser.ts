import { useQuery } from "@tanstack/react-query";

// 1. We MUST define what the data looks like so TypeScript doesn't panic
export interface TeacherInfo {
  first_name: string;
  last_name: string;
}

export interface User {
  id: number;
  email: string;
  teacher_info?: TeacherInfo;
}

// 2. We explicitly tell the function that it will return a Promise containing our User
const fetchCurrentUser = async (): Promise<User> => {
  const response = await fetch("http://localhost:5000/api/v1/auth/me", {
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
