// types/community.ts
export interface Educator {
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