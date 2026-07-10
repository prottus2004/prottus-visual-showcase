import {
  Code2,
  Layers,
  Brain,
  Network,
  Database,
  Cloud,
  Binary,
  Wrench,
  Eye,
  Shield,
  FileText,
  LifeBuoy,
  GraduationCap,
  Award,
  Heart,
  Briefcase,
  Sparkles,
  Cpu,
  Image,
  type LucideIcon,
} from "lucide-react";

/** Resolve a lucide icon by the string name stored in chronicle data. */
const ICONS: Record<string, LucideIcon> = {
  Code2,
  Layers,
  Brain,
  Network,
  Database,
  Cloud,
  Binary,
  Wrench,
  Eye,
  Shield,
  FileText,
  LifeBuoy,
  GraduationCap,
  Award,
  Heart,
  Briefcase,
  Sparkles,
  Cpu,
  Image,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Code2;
}