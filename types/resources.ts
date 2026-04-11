export interface ResourceCardProps {
  title: string;
  category: string;
  type: string;
  downloads: number;
  likes: number;
  updated: string;
  curriculum: string;
  coTeachers: number;
  visibility: string;
  status: string;
}
export interface ResourceFile {
  name: string;
  type: string;
  size: string;
  status: string;
  url: string;
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
  subject_id: string;     
  grade_level_id: string;  
  content_type_id: string;
  duration: string;
  description: string;
  tags: string[];
}