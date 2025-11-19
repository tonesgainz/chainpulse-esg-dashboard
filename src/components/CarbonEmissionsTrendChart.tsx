import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, AlertTriangle, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmissionData {
  date: string;
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
}

interface CarbonEmissionsTrendChartProps {
  data: EmissionData[];
  timeframe: "daily" | "weekly" | "monthly";
}

export default function CarbonEmissionsTrendChart({ 
  data, 
  timeframe = "weekly" 
}: CarbonEmissionsTrendChartProps) {
  const formatTooltip = (value: number, name: string) => [
    `${value.toFixed(1)} kg CO2e`,
    name.charAt(0).toUpperCase() + name.slice(1)
  ];

  interface TooltipPayloadEntry {
    value: number;
    name: string;
    color: string;
  }

  interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayloadEntry[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="stat-card p-4 rounded-xl border border-white/20 backdrop-blur-xl">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          {payload.map((entry: TooltipPayloadEntry, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value.toFixed(1)} kg CO2e</span>
            </p>
          ))}
          <div className="mt-2 pt-2 border-t border-white/10">
            <p className="text-xs text-muted-foreground">
              Total: <span className="font-semibold text-foreground">
                {payload.reduce((sum: number, entry: TooltipPayloadEntry) => sum + entry.value, 0).toFixed(1)} kg CO2e
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate trend indicators
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];
  const totalChange = latestData && previousData 
    ? ((latestData.total - previousData.total) / previousData.total) * 100 
    : 0;

  return (
    <div className="stat-card rounded-xl p-8 card-hover animate-scale-in border border-white/10" style={{ animationDelay: "200ms" }}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full sustainability-gradient animate-gradient" />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-glow">
              <TrendingUp size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-display gradient-text mb-1">
                Carbon Emissions Trend
              </h3>
              <p className="text-sm text-muted-foreground">
                Tracking Scope 1, 2 & 3 emissions ({timeframe})
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border",
              totalChange <= 0 
                ? "bg-success/10 text-success border-success/20" 
                : "bg-error/10 text-error border-error/20"
            )}>
              {totalChange <= 0 ? (
                <Target size={16} className="animate-pulse" />
              ) : (
                <AlertTriangle size={16} className="animate-pulse" />
              )}
              <span>{totalChange > 0 ? '+' : ''}{totalChange.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Emission Scope Indicators */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="stat-card p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#10B981" }}></div>
              <span className="text-sm font-medium text-muted-foreground">Scope 1</span>
            </div>
            <div className="text-2xl font-bold text-success">
              {latestData?.scope1.toFixed(1) || 0}
              <span className="text-sm font-normal text-muted-foreground ml-1">kg CO2e</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Direct emissions</p>
          </div>
          
          <div className="stat-card p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#3B82F6" }}></div>
              <span className="text-sm font-medium text-muted-foreground">Scope 2</span>
            </div>
            <div className="text-2xl font-bold text-chart-blue">
              {latestData?.scope2.toFixed(1) || 0}
              <span className="text-sm font-normal text-muted-foreground ml-1">kg CO2e</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Indirect (energy)</p>
          </div>
          
          <div className="stat-card p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#F59E0B" }}></div>
              <span className="text-sm font-medium text-muted-foreground">Scope 3</span>
            </div>
            <div className="text-2xl font-bold text-warning">
              {latestData?.scope3.toFixed(1) || 0}
              <span className="text-sm font-normal text-muted-foreground ml-1">kg CO2e</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Value chain</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}kg`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Line 
                type="monotone" 
                dataKey="scope1" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#10B981", strokeWidth: 2 }}
                name="Scope 1"
              />
              <Line 
                type="monotone" 
                dataKey="scope2" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
                name="Scope 2"
              />
              <Line 
                type="monotone" 
                dataKey="scope3" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#F59E0B", strokeWidth: 2 }}
                name="Scope 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Subtle top border glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
}