import { useQuery } from "@tanstack/react-query";
import { ResourceAPI } from "@/lib/resources";

export const useMyResources = () => {
  return useQuery({
    queryKey: ["myResources"],
    queryFn: () => ResourceAPI.getMyResources(),
  });
};