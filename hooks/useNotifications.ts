import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useUser } from "./useUser";

export const useNotifications = () => {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await api.get("/notifications/");
      return response.data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!user?.id) return;

    const socketUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:5000";
    console.log(`[Socket.io] Connecting to ${socketUrl}...`);
    
    const socket = io(socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'], // Allow fallback but prefer websocket
    });

    socket.on("connect", () => {
      console.log("[Socket.io] Connected successfully. Joining room...");
      socket.emit("join", { teacher_id: user.id });
    });

    socket.on("connect_error", (err) => {
      console.error("[Socket.io] Connection error:", err.message);
    });

    socket.on("new_notification", (notification) => {
      console.log("[Socket.io] New notification received:", notification);
      // Update notifications list
      queryClient.setQueryData(["notifications"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          notifications: [notification, ...old.notifications],
          unread_count: (old.unread_count || 0) + 1
        };
      });
      // Also invalidate to be sure
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id, queryClient]);

  const markRead = useMutation({
    mutationFn: async (id: number) => {
      await api.post(`/notifications/mark-read/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      await api.post("/notifications/mark-all-read");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return { ...query, markRead, markAllRead };
};
