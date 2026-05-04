import { LucideIcon } from "lucide-react";

export interface Conversation {
  id: number;
  name: string;
  avatar?: string;
  last_message: string;
  timestamp?: string;
  unread_count: number;
}

export interface ConversationItemProps {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}

export interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    file_url?: string;
    file_name?: string;
    file_type?: string;
    is_read: boolean;
    created_at: string;
}

export interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
}