export interface Version {
  id: string;
  title: string;
  status: "Active" | "Archived";
  description: string;
  author: string;
  date: string;
  files: number;
  size: string;
  summary: string;
}



export interface FileMeta {
  name: string;
  size: string;
}

export interface RepositoryData {
  title: string;
  subject: string;
  tags: string[];
  files: FileMeta[];
  rating: number;
  reviews: number;
  lastReviewed: string;
  likes: number;
  shares: number;
  downloads: number;
  typeTag: string;
}

export interface RemixItemType {
  title: string;
  subject: string;
}