
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ArrowDownRight, ArrowUpRight, Leaf } from "lucide-react";

interface GaugeChartProps {
  value: number;
  dailyChange: number;
  weeklyChange: number;
}

export default function GaugeChart({ value, dailyChange, weeklyChange }: GaugeChartProps) {
  // Format value as billions with 2 decimal places
  const formattedValue = (value / 1000000000).toFixed(2);
  
  // Gauge chart data setup
  const data = [
    { name: "Value", value: 70 }, // Filled
    { name: "Empty", value: 30 }, // Empty
  ];
  
  // For visual appeal, add color gradient
  const COLORS = ["#4A9DFF", "#2DD4BF"]; // Gradient blue to teal
  const EMPTY_COLOR = "#374151"; // Dark gray for empty space
  
  return (
    <div className="relative stat-card rounded-xl p-8 card-hover animate-scale-in border border-white/10" style={{ animationDelay: "100ms" }}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full sustainability-gradient animate-gradient" />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground/80 flex items-center gap-2 uppercase tracking-wide">
              <Leaf size={16} className="text-primary animate-glow" />
              Carbon Footprint
            </h3>
            <div className="text-3xl font-bold font-display text-foreground/95 tracking-tight">
              {value.toFixed(1)} <span className="text-lg text-muted-foreground">kg CO2e</span>
            </div>
          </div>
        </div>

        <div className="flex h-[200px] items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius="75%"
                outerRadius="95%"
                paddingAngle={0}
                dataKey="value"
              >
                <Cell key="filled" fill="url(#carbonGradient)" />
                <Cell key="empty" fill="hsl(var(--muted))" />
              </Pie>
              <defs>
                <linearGradient id="carbonGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(142 86% 28%)" />
                  <stop offset="50%" stopColor="hsl(160 84% 39%)" />
                  <stop offset="100%" stopColor="hsl(47 96% 53%)" />
                </linearGradient>
              </defs>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center -mt-6">
            <div className="text-xl font-semibold mb-6 text-center gradient-text">
              Carbon Reduction
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-[280px]">
              <div className="flex flex-col items-center stat-card p-4 rounded-lg border border-white/10">
                <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Daily</div>
                <div className="flex items-center gap-1">
                  {dailyChange >= 0 ? (
                    <ArrowUpRight size={16} className="text-error" />
                  ) : (
                    <ArrowDownRight size={16} className="text-success animate-pulse" />
                  )}
                  <span className={`text-lg font-bold ${dailyChange >= 0 ? 'text-error' : 'text-success'}`}>
                    {Math.abs(dailyChange)}%
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col items-center stat-card p-4 rounded-lg border border-white/10">
                <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Weekly</div>
                <div className="flex items-center gap-1">
                  {weeklyChange >= 0 ? (
                    <ArrowUpRight size={16} className="text-error" />
                  ) : (
                    <ArrowDownRight size={16} className="text-success animate-pulse" />
                  )}
                  <span className={`text-lg font-bold ${weeklyChange >= 0 ? 'text-error' : 'text-success'}`}>
                    {Math.abs(weeklyChange)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle top border glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
}
