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

export const useThread = (partnerId: number | string, page = 1) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["thread", partnerId, page],
    queryFn: async () => {
        const res = await MessagesAPI.getThread(partnerId, page);
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
    const socketUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:5000";
    console.log(`[Socket.io-Chat] Connecting to ${socketUrl}...`);
    
    const socket = io(socketUrl, {
        withCredentials: true,
        transports: ['websocket', 'polling']
    });
    socketRef.current = socket;

    socket.on("connect", () => {
        console.log("[Socket.io-Chat] Connected. Joining room...");
        // Join private room
        socket.emit("join", { teacher_id: user.id });
    });

    socket.on("connect_error", (err) => {
        console.error("[Socket.io-Chat] Connection error:", err.message);
    });

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

  const sendMessage = (receiverId: number, content: string, fileData?: { url: string, name: string, type: string }) => {
    if (socketRef.current && user?.id) {
      socketRef.current.emit("send_message", {
        sender_id: user.id,
        receiver_id: receiverId,
        content: content,
        file_url: fileData?.url,
        file_name: fileData?.name,
        file_type: fileData?.type
      });
    }
  };

  return { sendMessage };
};
