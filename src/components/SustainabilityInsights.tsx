import { useState } from "react";
import { Brain, TrendingUp, AlertCircle, Target, Lightbulb, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  id: string;
  type: "recommendation" | "prediction" | "alert" | "optimization";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: string;
  confidence: number;
  actionRequired: boolean;
  estimatedSavings?: number;
  timeframe?: string;
}

interface SustainabilityInsightsProps {
  insights: Insight[];
}

export default function SustainabilityInsights({ insights }: SustainabilityInsightsProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "recommendation": return <Lightbulb size={16} className="text-primary" />;
      case "prediction": return <TrendingUp size={16} className="text-chart-blue" />;
      case "alert": return <AlertCircle size={16} className="text-error animate-pulse" />;
      case "optimization": return <Target size={16} className="text-success" />;
      default: return <Brain size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "recommendation": return "bg-primary/10 text-primary border-primary/20";
      case "prediction": return "bg-chart-blue/10 text-chart-blue border-chart-blue/20";
      case "alert": return "bg-error/10 text-error border-error/20";
      case "optimization": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted/10 text-muted-foreground border-border";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-error font-bold";
      case "medium": return "text-warning font-semibold";
      case "low": return "text-success font-medium";
      default: return "text-muted-foreground";
    }
  };

  const categories = ["all", ...Array.from(new Set(insights.map(i => i.category)))];
  const filteredInsights = selectedCategory === "all" 
    ? insights 
    : insights.filter(i => i.category === selectedCategory);

  const highPriorityInsights = insights.filter(i => i.impact === "high" && i.actionRequired);

  return (
    <div className="stat-card rounded-xl p-8 card-hover animate-scale-in border border-white/10" style={{ animationDelay: "500ms" }}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full sustainability-gradient animate-gradient" />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-glow">
              <Brain size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-display gradient-text mb-1 flex items-center gap-2">
                AI-Powered Insights
                <Sparkles size={18} className="text-accent animate-pulse" />
              </h3>
              <p className="text-sm text-muted-foreground">
                Smart sustainability recommendations and predictions
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-xl stat-card border border-white/10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* High Priority Alerts */}
        {highPriorityInsights.length > 0 && (
          <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-error/5 to-warning/5 border border-error/20 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={20} className="text-error animate-pulse" />
              <h4 className="font-semibold text-error">High Priority Actions</h4>
            </div>
            <div className="space-y-3">
              {highPriorityInsights.slice(0, 2).map(insight => (
                <div key={insight.id} className="flex items-center justify-between py-3 px-4 rounded-lg bg-card/50 border border-white/10">
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground">{insight.title}</h5>
                    <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                  </div>
                  <button className="text-primary hover:text-primary/80 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insights Grid */}
        <div className="grid gap-6">
          {filteredInsights.map((insight, index) => (
            <div 
              key={insight.id}
              className="stat-card p-6 rounded-xl border border-white/10 animate-fade-in cursor-pointer hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setShowDetails(showDetails === insight.id ? null : insight.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={cn(
                    "p-3 rounded-xl border",
                    getTypeColor(insight.type)
                  )}>
                    {getTypeIcon(insight.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground">{insight.title}</h4>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full border uppercase tracking-wide",
                        getTypeColor(insight.type)
                      )}>
                        {insight.type}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        Impact: <span className={getImpactColor(insight.impact)}>{insight.impact.toUpperCase()}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Confidence: <span className="font-semibold text-foreground">{insight.confidence}%</span>
                      </span>
                      {insight.estimatedSavings && (
                        <span className="text-success font-semibold">
                          Est. Savings: ${insight.estimatedSavings.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {insight.actionRequired && (
                    <div className="h-2 w-2 rounded-full bg-error animate-pulse"></div>
                  )}
                  <ChevronRight 
                    size={16} 
                    className={cn(
                      "text-muted-foreground transition-transform duration-300",
                      showDetails === insight.id && "rotate-90"
                    )} 
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {showDetails === insight.id && (
                <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="stat-card p-4 rounded-lg border border-white/10">
                      <div className="text-sm text-muted-foreground mb-1">Category</div>
                      <div className="font-semibold text-foreground">{insight.category}</div>
                    </div>
                    
                    {insight.timeframe && (
                      <div className="stat-card p-4 rounded-lg border border-white/10">
                        <div className="text-sm text-muted-foreground mb-1">Timeframe</div>
                        <div className="font-semibold text-foreground">{insight.timeframe}</div>
                      </div>
                    )}
                    
                    <div className="stat-card p-4 rounded-lg border border-white/10">
                      <div className="text-sm text-muted-foreground mb-1">Action Required</div>
                      <div className={cn(
                        "font-semibold",
                        insight.actionRequired ? "text-error" : "text-success"
                      )}>
                        {insight.actionRequired ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="px-6 py-2 rounded-xl button-gradient text-primary-foreground font-medium transition-all duration-300 hover:scale-105">
                      Take Action
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 stat-card rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-primary mb-1">
              {insights.filter(i => i.type === "recommendation").length}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Recommendations</div>
          </div>
          
          <div className="text-center p-4 stat-card rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-chart-blue mb-1">
              {insights.filter(i => i.type === "prediction").length}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Predictions</div>
          </div>
          
          <div className="text-center p-4 stat-card rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-error mb-1">
              {insights.filter(i => i.type === "alert").length}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Alerts</div>
          </div>
          
          <div className="text-center p-4 stat-card rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-success mb-1">
              ${insights.reduce((sum, i) => sum + (i.estimatedSavings || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Est. Savings</div>
          </div>
        </div>
      </div>
      
      {/* Subtle top border glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
}