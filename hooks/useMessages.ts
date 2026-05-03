import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MessagesAPI } from "@/lib/messages";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./useUser";

export const useConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: MessagesAPI.getConversations,
  });
};

export const useThread = (partnerId: number | string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["thread", partnerId],
    queryFn: async () => {
        const res = await MessagesAPI.getThread(partnerId);
        // After fetching thread (which marks as read in backend), update conversations list
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
        return res;
    },
    enabled: !!partnerId,
  });
};

export const useSocket = () => {
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    // Connect to Socket.io server
    const socket = io("http://localhost:5000", {
        withCredentials: true
    });
    socketRef.current = socket;

    // Join private room
    socket.emit("join", { teacher_id: user.id });

    // Listen for new messages
    socket.on("new_message", (message) => {
      // Invalidate current thread and conversations list
      queryClient.invalidateQueries({ queryKey: ["thread", message.sender_id] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    });

    socket.on("message_sent", (message) => {
        queryClient.invalidateQueries({ queryKey: ["thread", message.receiver_id] });
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id, queryClient]);

  const sendMessage = (receiverId: number, content: string) => {
    if (socketRef.current && user?.id) {
      socketRef.current.emit("send_message", {
        sender_id: user.id,
        receiver_id: receiverId,
        content: content
      });
    }
  };

  return { sendMessage };
};
