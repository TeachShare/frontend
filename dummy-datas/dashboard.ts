import { Activity, FileText, Users, Link as LinkIcon } from 'lucide-react';
import { ResourceItem, ActivityItem } from '@/types/dashboard';

export const recentResourcesData: ResourceItem[] = [
  { title: 'Bubble Sort', subtitle: '2nd Year College · 24 cards · 18 questions', subject: 'Dastruc - 22', type: 'Activity', typeIcon: Activity, last: '2 hours ago' },
  { title: 'Integral Calculus', subtitle: '2nd Year College · 10 questions · PDF', subject: 'Intcal - 22', type: 'Worksheet', typeIcon: FileText, last: 'Yesterday - 19:40' },
  { title: 'Group Task: Comparing Presentations', subtitle: 'Tables, graphs, equations · 45 min', subject: 'Freai - 21', type: 'Group task', typeIcon: Users, last: '2 days ago' },
  { title: 'Database 3NF', subtitle: 'Normalization guide · Teacher notes', subject: 'Dbmsys - 31', type: 'Link', typeIcon: LinkIcon, last: '3 days ago' },
];

export const activitySnapshotData: ActivityItem[] = [
  { dot: 'bg-emerald-500', title: '3 new comments', bold: 'on "Linear Functions Card Sort"', detail: 'From: Rivera (Grade 7), Liu (Grade 8), Parker...', time: '15 min ago' },
  { dot: 'bg-blue-500', title: 'Your exit ticket was added', bold: 'to a school collection', detail: '"Grade 7 Assessment Bank" · East Ridge Middle School', time: '1 hour ago' },
  { dot: 'bg-purple-500', title: '2 educators started following you', bold: '', detail: 'Science Math · Across 2 schools', time: 'Today' }
];