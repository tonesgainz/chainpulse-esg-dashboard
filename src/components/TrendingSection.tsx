
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { sustainabilityCategories } from "@/lib/mockData";

interface SustainabilityTrend {
  id: number;
  name: string;
  metric: string;
  category: string;
  change: number;
}

interface TrendingSectionProps {
  tokens: SustainabilityTrend[];
}

export default function TrendingSection({ tokens }: TrendingSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const filteredTokens = selectedCategory === "all" 
    ? tokens 
    : tokens.filter(token => 
        token.category.toLowerCase() === selectedCategory.toLowerCase()
      );
  
  return (
    <div className="stat-card rounded-xl p-6 card-hover animate-scale-in border border-white/10" style={{ animationDelay: "200ms" }}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full sustainability-gradient animate-gradient" />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-glow">
              <TrendingUp size={18} className="text-primary" />
            </div>
            <h3 className="font-semibold font-display text-lg">Sustainability Metrics</h3>
          </div>
          
          <div className="flex gap-2">
            {sustainabilityCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "text-xs px-4 py-2 rounded-full transition-all duration-300 font-medium border",
                  selectedCategory === category.id
                    ? "button-gradient text-primary-foreground shadow-lg border-transparent"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary border-border hover:border-primary/30"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 py-3 min-w-max">
            {filteredTokens.map((token, index) => (
              <div 
                key={token.id}
                className="group flex flex-col justify-between p-5 min-w-[180px] md:min-w-[200px] stat-card rounded-xl border border-white/10 card-hover"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-foreground/95">{token.name}</h4>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {token.metric}
                    </div>
                  </div>
                  <div className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                    {token.category}
                  </div>
                </div>
                
                <div className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold",
                  token.change >= 0 
                    ? "bg-success/10 text-success border border-success/20" 
                    : "bg-error/10 text-error border border-error/20"
                )}>
                  {token.change >= 0 
                    ? <ArrowUpRight size={16} className="animate-pulse" /> 
                    : <ArrowDownRight size={16} className="animate-pulse" />
                  }
                  <span>{Math.abs(token.change)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Subtle top border glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
}
