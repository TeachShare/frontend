import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TeacherAPI } from "@/lib/teachers";
import { useUser } from "./useUser";

export const useTeachers = (page = 1) => {
    const { data: user } = useUser();
    return useQuery({
      queryKey: ["teachers", user?.id, page],
      queryFn: () => TeacherAPI.getTeachers(page),
    });
};

export const useTeacherProfile = (teacherId: number | string) => {
  const { data: user } = useUser();
  return useQuery({
    queryKey: ["teacherProfile", teacherId, user?.id],
    queryFn: () => TeacherAPI.getProfile(teacherId),
    enabled: !!teacherId,
  });
};

export const useTeacherResources = (teacherId: number | string) => {
  return useQuery({
    queryKey: ["teacherResources", teacherId],
    queryFn: () => TeacherAPI.getTeacherResources(teacherId),
    enabled: !!teacherId,
  });
};

export const useToggleFollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teacherId: number | string) => TeacherAPI.toggleFollow(teacherId),
    onSuccess: (_, teacherId) => {
      queryClient.invalidateQueries({ queryKey: ["teacherProfile", teacherId] });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { role?: string; institution?: string; bio?: string }) => TeacherAPI.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // We might not know the teacherId here, but authUser will update the current user info
    },
  });
};
