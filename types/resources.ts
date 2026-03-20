export interface ResourceCardProps {
  title: string;
  category: string;
  type: string;
  downloads: string;
  likes: string;
  updated: string;
  curriculum: string;
  coTeachers: string;
  visibility: string;
  status: string;
}
export interface ResourceFile {
  name: string;
  type: string;
  size: string;
  status: string;
}

export interface ResourceDetail {
  title: string;
  description: string;
  subject: string;
  grade: string;
  unit: string;
  type: string;
  author: string;
  lastUpdated: string;
  rating: number;
  reviews: number;
  likes: number;
  remixes: number;
  downloads: number;
  files: ResourceFile[];
}

export interface ResourceFormData {
  title: string;
  subject: string;
  gradeLevel: string;
  resourceType: string;
  duration: string;
  description: string;
  tags: string[];
}