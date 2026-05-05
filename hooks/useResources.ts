import { useQuery } from "@tanstack/react-query";
import { ResourceAPI } from "@/lib/resources";

export const useMyResources = (page = 1) => {
  return useQuery({
    queryKey: ["myResources", page],
    queryFn: () => ResourceAPI.getMyResources(page),
  });
};