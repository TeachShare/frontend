import { LucideIcon } from "lucide-react";

export interface SidebarItemProps {
  icon: LucideIcon; 
  label: string;                                            
  active?: boolean;                                         
  onClick?: () => void;    
  href: string                                 
}