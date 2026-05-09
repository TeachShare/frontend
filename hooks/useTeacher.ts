import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TeacherAPI } from "@/lib/teachers";
import { useUser } from "./useUser";

export const useTeachers = (page = 1, search = "") => {
    const { data: user } = useUser();
    return useQuery({
      queryKey: ["teachers", user?.id, page, search],
      queryFn: () => TeacherAPI.getTeachers(page, 20, search),
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

export const useTeacherResources = (teacherId: number | string | undefined) => {
  return useQuery({
    queryKey: ["teacherResources", teacherId],
    queryFn: () => TeacherAPI.getTeacherResources(teacherId!),
    enabled: !!teacherId,
  });
};

export const useTeacherActivity = (teacherId: number | string | undefined, page = 1) => {
  return useQuery({
    queryKey: ["teacherActivity", teacherId, page],
    queryFn: () => TeacherAPI.getTeacherActivity(teacherId!, page),
    enabled: !!teacherId,
  });
};

export const useToggleFollow = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useUser();

  return useMutation({
    mutationFn: (teacherId: number | string) => TeacherAPI.toggleFollow(teacherId),
    
    // Optimistic Update
    onMutate: async (teacherId) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["teacherProfile", teacherId.toString()] });
      await queryClient.cancelQueries({ queryKey: ["teacherProfile", Number(teacherId)] });

      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData(["teacherProfile", teacherId.toString(), currentUser?.id]);

      // Optimistically update to the new value
      queryClient.setQueryData(["teacherProfile", teacherId.toString(), currentUser?.id], (old: any) => {
        if (!old || !old.data) return old;
        const isFollowing = old.data.is_following;
        return {
          ...old,
          data: {
            ...old.data,
            is_following: !isFollowing,
            stats: {
              ...old.data.stats,
              followers: isFollowing ? (old.data.stats.followers - 1) : (old.data.stats.followers + 1)
            }
          }
        };
      });

      return { previousProfile };
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, teacherId, context: any) => {
      queryClient.setQueryData(
        ["teacherProfile", teacherId.toString(), currentUser?.id],
        context.previousProfile
      );
    },

    // Always refetch after error or success:
    onSettled: (data, error, teacherId) => {
      queryClient.invalidateQueries({ queryKey: ["teacherProfile", teacherId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { role?: string; institution?: string; bio?: string; profile_image_url?: string }) => TeacherAPI.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.invalidateQueries({ queryKey: ["teacherProfile"] });
    },
  });
};

export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => TeacherAPI.uploadProfilePhoto(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.invalidateQueries({ queryKey: ["teacherProfile"] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (passwords: { current_password: string; new_password: string }) => 
      TeacherAPI.changePassword(passwords),
  });
};
