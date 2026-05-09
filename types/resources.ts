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
  collection_id: number;
  owner_id: number;
  owner_name: string;
  owner_username?: string;
  title: string;
  description: string;
  tags: string[];
  subject: string;
  grade: string;
  type: string;
  avg_rating: number;
  likes: number;
  remixes: number;
  downloads: number;
  estimate_duration: string | null;
  files: ResourceFile[];
  is_published: boolean;
  version_no: number;
  is_latest: boolean;
  updated_at: string;
  student_summary: string | null;
  allow_remixing: boolean;
  visibility: string;
  collaboration_mode: string;
  collaborators: Collaborator[];
}

export interface Collaborator {
  teacher_id: number;
  username: string;
  name: string;
  role: string;
}

export interface ResourceFormData {
  title: string;
  subject_id: string;     
  grade_level_id: string;  
  content_type_id: string;
  duration_value: string;
  duration_unit: string;
  description: string;
  tags: string[];
  version_notes: string;
  allow_remixing: boolean;
  visibility: string;
  collaboration_mode: string;
}