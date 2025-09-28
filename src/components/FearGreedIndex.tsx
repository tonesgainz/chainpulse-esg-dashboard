
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, AlertCircle } from "lucide-react";

interface FearGreedIndexProps {
  value: number;
  indicator: string;
  previousValue: number;
  previousChange: number;
}

export default function FearGreedIndex({ 
  value, 
  indicator, 
  previousValue, 
  previousChange 
}: FearGreedIndexProps) {
  // Data for the pie chart
  const data = [
    { name: "Value", value: value },
    { name: "Empty", value: 100 - value }
  ];

  // Color mapping based on the value
  const getColor = (value: number) => {
    if (value >= 75) return "#4ADE80"; // Extreme Greed
    if (value >= 55) return "#A3E635"; // Greed
    if (value >= 45) return "#FACC15"; // Neutral
    if (value >= 25) return "#FB923C"; // Fear
    return "#F87171"; // Extreme Fear
  };
  
  const indicatorColor = getColor(value);
  const isPositiveChange = previousChange >= 0;
  
  return (
    <div className="stat-card rounded-xl p-8 card-hover animate-scale-in border border-white/10" style={{ animationDelay: "400ms" }}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full sustainability-gradient animate-gradient" />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-glow">
              <AlertCircle size={18} className="text-primary" />
            </div>
            <h3 className="font-semibold font-display text-lg">ESG Performance Index</h3>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[280px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="75%"
                outerRadius="95%"
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill="url(#esgGradient)" />
                <Cell fill="hsl(var(--muted))" />
              </Pie>
              <defs>
                <linearGradient id="esgGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={indicatorColor} />
                  <stop offset="100%" stopColor={getColor(value + 10)} />
                </linearGradient>
              </defs>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold font-display gradient-text mb-2">{value}</div>
            <div 
              className="text-xl font-semibold mb-4 px-4 py-1 rounded-lg border"
              style={{ 
                color: indicatorColor,
                borderColor: indicatorColor + '40',
                backgroundColor: indicatorColor + '10'
              }}
            >
              {indicator}
            </div>
            
            <div className="flex items-center gap-3 text-sm stat-card p-3 rounded-lg border border-white/10">
              <span className="text-muted-foreground">Previous: {previousValue}</span>
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md",
                isPositiveChange 
                  ? "bg-success/10 text-success border border-success/20" 
                  : "bg-error/10 text-error border border-error/20"
              )}>
                {isPositiveChange 
                  ? <ArrowUpRight size={14} /> 
                  : <ArrowDownRight size={14} />
                }
                <span className="font-medium">{Math.abs(previousChange)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle top border glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </div>
  );
}
