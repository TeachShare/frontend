// types/community.ts
export interface Educator {
  id: number;
  name: string;
  role: string;
  avatar: string;
  resources: string;
  followers: string;
  coTeaching: string;
  alignment: number;
  tags: string[];
  specialTags: string[];
  following: boolean;
}

export interface StatCardProps {
    title: string;
    value: string;
    subtext: string;
    trend?: string;
    badge?: string;
}

export interface Attachment {
  id: string;
  resourceId?: string;
  name: string;
  type: 'local' | 'library';
  size: number;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}
export interface Author {
  id: number;
  name: string;
  avatar: string | null;
  role?: string; // Optional if your backend sends it
}

export interface Post {
  id: number;
  content: string;
  created_at: string;
  linked_resource: { id: number; title: string } | null;
  author: Author;
  
  // ✅ This is what TypeScript was complaining about!
  engagement: {
    likes_count: number;
    comments_count: number;
    user_has_liked: boolean;
  };
  
  fetched_comments?: Comment[]; 
}