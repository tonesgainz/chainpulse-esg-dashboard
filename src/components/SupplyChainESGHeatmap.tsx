import { useState } from "react";
import { MapPin, Filter, Info, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Supplier {
  id: string;
  name: string;
  location: string;
  coordinates: { x: number; y: number };
  esgScore: number;
  carbonFootprint: number;
  riskLevel: "low" | "medium" | "high";
  category: string;
  compliance: number;
}

interface SupplyChainESGHeatmapProps {
  suppliers: Supplier[];
}

export default function SupplyChainESGHeatmap({ suppliers }: SupplyChainESGHeatmapProps) {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [filterRating, setFilterRating] = useState<"all" | "low" | "medium" | "high">("all");
  const [showDetails, setShowDetails] = useState(false);

  const getESGColor = (score: number) => {
    if (score >= 80) return { bg: "bg-success", border: "border-success", text: "text-success" };
    if (score >= 60) return { bg: "bg-warning", border: "border-warning", text: "text-warning" };
    return { bg: "bg-error", border: "border-error", text: "text-error" };
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return { bg: "bg-success/20", border: "border-success", text: "text-success" };
      case "medium": return { bg: "bg-warning/20", border: "border-warning", text: "text-warning" };
      case "high": return { bg: "bg-error/20", border: "border-error", text: "text-error" };
      default: return { bg: "bg-muted", border: "border-muted", text: "text-muted-foreground" };
    }
  };

  const filteredSuppliers = filterRating === "all" 
    ? suppliers 
    : suppliers.filter(s => s.riskLevel === filterRating);

  return (
    <div className="stat-card rounded-xl p-8 card-hover animate-scale-in border border-white/10" style={{ animationDelay: "300ms" }}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full sustainability-gradient animate-gradient" />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-glow">
              <MapPin size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-display gradient-text mb-1">
                Supply Chain ESG Heatmap
              </h3>
              <p className="text-sm text-muted-foreground">
                Supplier locations with ESG performance indicators
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value as "all" | "low" | "medium" | "high")}
              className="px-4 py-2 rounded-xl stat-card border border-white/10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Suppliers</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="h-10 w-10 rounded-xl stat-card flex items-center justify-center border border-white/10 transition-all duration-300 hover:scale-105"
            >
              <Info size={16} />
            </button>
          </div>
        </div>

        {/* World Map Visualization */}
        <div className="relative bg-card/50 rounded-xl border border-white/10 p-6 mb-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-gradient" />
          </div>
          
          <div className="relative h-[400px] w-full">
            {/* Simplified world map background */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                <path d="M100,100 L900,100 L900,400 L100,400 Z" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
                <path d="M200,150 Q400,120 600,140 Q800,160 900,180" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
                <path d="M100,250 Q300,230 500,240 Q700,250 900,260" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
                <path d="M150,350 Q350,330 550,340 Q750,350 850,360" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>
            
            {/* Supplier markers */}
            {filteredSuppliers.map((supplier, index) => {
              const colors = getESGColor(supplier.esgScore);
              return (
                <div
                  key={supplier.id}
                  className={cn(
                    "absolute cursor-pointer transition-all duration-300 animate-fade-in",
                    selectedSupplier?.id === supplier.id ? "scale-125 z-20" : "hover:scale-110 z-10"
                  )}
                  style={{
                    left: `${supplier.coordinates.x}%`,
                    top: `${supplier.coordinates.y}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                  onClick={() => setSelectedSupplier(supplier)}
                >
                  <div className={cn(
                    "h-4 w-4 rounded-full border-2 animate-pulse",
                    colors.bg,
                    colors.border,
                    "shadow-lg"
                  )}>
                    <div className={cn(
                      "absolute inset-0 rounded-full animate-ping opacity-75",
                      colors.bg
                    )} />
                  </div>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="stat-card p-3 rounded-lg border border-white/20 backdrop-blur-xl whitespace-nowrap">
                      <p className="font-semibold text-sm">{supplier.name}</p>
                      <p className="text-xs text-muted-foreground">{supplier.location}</p>
                      <p className={cn("text-xs font-medium", colors.text)}>
                        ESG Score: {supplier.esgScore}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Supplier Details Panel */}
        {selectedSupplier && (
          <div className="stat-card p-6 rounded-xl border border-white/10 animate-scale-in">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold font-display text-foreground mb-1">
                  {selectedSupplier.name}
                </h4>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin size={14} />
                  {selectedSupplier.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedSupplier(null)}
                className="h-8 w-8 rounded-lg stat-card flex items-center justify-center border border-white/10 hover:scale-105 transition-all duration-300"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 stat-card rounded-lg border border-white/10">
                <div className={cn("text-2xl font-bold", getESGColor(selectedSupplier.esgScore).text)}>
                  {selectedSupplier.esgScore}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">ESG Score</div>
              </div>
              
              <div className="text-center p-4 stat-card rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-chart-purple">
                  {selectedSupplier.carbonFootprint.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">kg CO2e</div>
              </div>
              
              <div className="text-center p-4 stat-card rounded-lg border border-white/10">
                <div className={cn(
                  "text-sm font-semibold px-3 py-1 rounded-full inline-block",
                  getRiskColor(selectedSupplier.riskLevel).bg,
                  getRiskColor(selectedSupplier.riskLevel).border,
                  getRiskColor(selectedSupplier.riskLevel).text,
                  "border"
                )}>
                  {selectedSupplier.riskLevel.toUpperCase()}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mt-2">Risk Level</div>
              </div>
              
              <div className="text-center p-4 stat-card rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-success">
                  {selectedSupplier.compliance}%
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Compliance</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Category: <span className="text-foreground font-medium">{selectedSupplier.category}</span></span>
                <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                  View Details <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 p-4 stat-card rounded-xl border border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-success border border-success"></div>
            <span className="text-xs text-muted-foreground">High ESG (80+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-warning border border-warning"></div>
            <span className="text-xs text-muted-foreground">Medium ESG (60-79)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-error border border-error"></div>
            <span className="text-xs text-muted-foreground">Low ESG (below 60)</span>
          </div>
        </div>
      </div>
      
      {/* Subtle top border glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
}