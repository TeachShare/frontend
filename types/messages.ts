import { LucideIcon } from "lucide-react";

export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  type: string;
  unread: boolean;
}

export interface ConversationItemProps extends Omit<Conversation, "id"> {
  active: boolean;
  onClick: () => void;
}

export interface MessageBubbleProps {
  text: string;
  time: string;
  isMe: boolean;
  status?: "Sent" | "Delivered" | "Seen";
}