
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon?: ReactNode;
  colorClass?: string;
  animationDelay?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  icon, 
  colorClass = "from-blue-500/20 to-blue-600/5",
  animationDelay = "0ms"
}: StatsCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div 
      className="group relative overflow-hidden stat-card rounded-xl p-6 card-hover animate-scale-in border border-white/10"
      style={{ animationDelay }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="h-full w-full sustainability-gradient animate-gradient" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground/80 tracking-wide uppercase">
              {title}
            </h3>
          </div>
          
          {icon && (
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/10 flex items-center justify-center border border-primary/20 animate-glow">
              {icon}
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="text-3xl font-bold font-display text-foreground/95 tracking-tight">
            {value}
          </div>
          
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-semibold",
              isPositive 
                ? "bg-success/10 text-success border border-success/20" 
                : "bg-error/10 text-error border border-error/20"
            )}>
              {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(change)}%</span>
            </div>
            <span className="text-xs text-muted-foreground">vs yesterday</span>
          </div>
        </div>
      </div>
      
      {/* Subtle inner glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
}
