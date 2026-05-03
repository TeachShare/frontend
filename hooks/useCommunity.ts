import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CommunityAPI } from "@/lib/community";
import { Post } from "@/types/community";

// --- QUERIES (Fetching Data) ---

export const useFeed = (page = 1) => {
  const query = useQuery({
    queryKey: ["communityFeed", page],
    queryFn: () => CommunityAPI.getFeed(page),
    // Keeps previous data on screen while fetching the next page
    keepPreviousData: true,
  });

  return {
    ...query,
    isLoading: query.isLoading || query.isPending || false,
  };
};

export const useComments = (postId: number, isExpanded: boolean) => {
  const query = useQuery({
    queryKey: ["postComments", postId],
    queryFn: () => CommunityAPI.getComments(postId),
    // Only fetch when the user actually opens the comment section
    enabled: isExpanded,
  });

  return {
    ...query,
    isLoading: query.isLoading || query.isPending || false,
  };
};

// --- MUTATIONS (Modifying Data) ---

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      content,
      linkedResourceId,
    }: {
      content: string;
      linkedResourceId?: string;
    }) => CommunityAPI.createPost(content, linkedResourceId),
    onSuccess: () => {
      // Instantly tell React Query to refetch the feed to show the new post
      queryClient.invalidateQueries({ queryKey: ["communityFeed"] });
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending || mutation.isLoading || false,
  };
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (postId: number) => CommunityAPI.toggleLike(postId),

    // Optimistic Update: Make the UI feel instant!
    onMutate: async (postId) => {
      // 1. Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["communityFeed"] });

      // 2. Snapshot the previous value
      const previousFeed = queryClient.getQueryData(["communityFeed", 1]); // Assuming page 1 for now

      // 3. Optimistically update the cache
      queryClient.setQueryData(["communityFeed", 1], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          posts: oldData.posts.map((post: Post) => {
            if (post.id === postId) {
              const isLiked = post.engagement.user_has_liked;
              return {
                ...post,
                engagement: {
                  ...post.engagement,
                  user_has_liked: !isLiked,
                  likes_count: post.engagement.likes_count + (isLiked ? -1 : 1),
                },
              };
            }
            return post;
          }),
        };
      });

      // 4. Return the context with the snapshotted value
      return { previousFeed };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["communityFeed", 1], context?.previousFeed);
    },
    // Always refetch after error or success to ensure we are in sync with the server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["communityFeed"] });
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending || mutation.isLoading || false,
  };
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      postId,
      content,
      parentId,
    }: {
      postId: number;
      content: string;
      parentId?: string | null;
    }) => CommunityAPI.addComment(postId, content, parentId),
    onSuccess: (_, variables) => {
      // Invalidate both the specific comments tree AND the main feed (to update comment count)
      queryClient.invalidateQueries({
        queryKey: ["postComments", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["communityFeed"] });
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending || mutation.isLoading || false,
  };
};