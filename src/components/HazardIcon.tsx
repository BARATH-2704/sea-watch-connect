import { 
  CloudRain, 
  Droplets, 
  Trash2, 
  Waves, 
  Fish, 
  AlertTriangle,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HazardIconProps {
  type: string;
  className?: string;
  size?: number;
}

const hazardIcons: Record<string, { icon: LucideIcon; color: string }> = {
  "storm": { icon: CloudRain, color: "hazard-storm" },
  "oil-spill": { icon: Droplets, color: "hazard-oil" },
  "marine-debris": { icon: Trash2, color: "hazard-debris" },
  "harmful-algae": { icon: Waves, color: "hazard-algae" },
  "injured-animal": { icon: Fish, color: "hazard-animal" },
  "water-quality": { icon: AlertTriangle, color: "hazard-water" },
  "other": { icon: AlertTriangle, color: "hazard-water" }
};

export function HazardIcon({ type, className, size = 24 }: HazardIconProps) {
  const hazard = hazardIcons[type] || hazardIcons.other;
  const Icon = hazard.icon;

  return (
    <div className={cn(
      `w-8 h-8 rounded-full flex items-center justify-center bg-${hazard.color} text-white`,
      className
    )}>
      <Icon size={size} />
    </div>
  );
}