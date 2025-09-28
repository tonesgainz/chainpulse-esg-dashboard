import { AlertTriangle, CheckCircle, Clock, FileText, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplianceItem {
  id: string;
  category: string;
  status: "completed" | "in-progress" | "pending" | "overdue";
  deadline: string;
  progress: number;
  description: string;
  penaltyCost?: number;
}

interface CBAMComplianceDashboardProps {
  complianceItems: ComplianceItem[];
  overallStatus: number;
  estimatedPenalties: number;
}

export default function CBAMComplianceDashboard({ 
  complianceItems, 
  overallStatus,
  estimatedPenalties 
}: CBAMComplianceDashboardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle size={16} className="text-success" />;
      case "in-progress": return <Clock size={16} className="text-warning animate-pulse" />;
      case "pending": return <FileText size={16} className="text-muted-foreground" />;
      case "overdue": return <AlertTriangle size={16} className="text-error animate-pulse" />;
      default: return <FileText size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/10 text-success border-success/20";
      case "in-progress": return "bg-warning/10 text-warning border-warning/20";
      case "pending": return "bg-muted/10 text-muted-foreground border-border";
      case "overdue": return "bg-error/10 text-error border-error/20";
      default: return "bg-muted/10 text-muted-foreground border-border";
    }
  };

  const completedItems = complianceItems.filter(item => item.status === "completed").length;
  const overdueItems = complianceItems.filter(item => item.status === "overdue").length;
  const inProgressItems = complianceItems.filter(item => item.status === "in-progress").length;

  return (
    <div className="stat-card rounded-xl p-8 card-hover animate-scale-in border border-white/10" style={{ animationDelay: "400ms" }}>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full sustainability-gradient animate-gradient" />
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-glow">
              <FileText size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-display gradient-text mb-1">
                CBAM Compliance Dashboard
              </h3>
              <p className="text-sm text-muted-foreground">
                Carbon Border Adjustment Mechanism tracking
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border",
              overallStatus >= 80 
                ? "bg-success/10 text-success border-success/20" 
                : overallStatus >= 60 
                ? "bg-warning/10 text-warning border-warning/20"
                : "bg-error/10 text-error border-error/20"
            )}>
              <span>{overallStatus}% Complete</span>
            </div>
          </div>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stat-card p-6 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle size={20} className="text-success" />
              <span className="text-sm font-medium text-muted-foreground">Completed</span>
            </div>
            <div className="text-3xl font-bold text-success mb-1">{completedItems}</div>
            <div className="text-xs text-muted-foreground">Requirements</div>
          </div>
          
          <div className="stat-card p-6 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Clock size={20} className="text-warning animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">In Progress</span>
            </div>
            <div className="text-3xl font-bold text-warning mb-1">{inProgressItems}</div>
            <div className="text-xs text-muted-foreground">Requirements</div>
          </div>
          
          <div className="stat-card p-6 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle size={20} className="text-error animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Overdue</span>
            </div>
            <div className="text-3xl font-bold text-error mb-1">{overdueItems}</div>
            <div className="text-xs text-muted-foreground">Requirements</div>
          </div>
          
          <div className="stat-card p-6 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign size={20} className="text-chart-purple" />
              <span className="text-sm font-medium text-muted-foreground">Est. Penalties</span>
            </div>
            <div className="text-3xl font-bold text-chart-purple mb-1">
              ${(estimatedPenalties / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-muted-foreground">If non-compliant</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-foreground">Overall Compliance Progress</h4>
            <span className="text-sm text-muted-foreground">{overallStatus}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out animate-glow"
              style={{
                width: `${overallStatus}%`,
                background: overallStatus >= 80 
                  ? 'linear-gradient(90deg, hsl(142 86% 28%), hsl(142 86% 40%))' 
                  : overallStatus >= 60 
                  ? 'linear-gradient(90deg, hsl(47 96% 53%), hsl(47 96% 65%))'
                  : 'linear-gradient(90deg, hsl(0 72% 51%), hsl(0 84% 60%))'
              }}
            />
          </div>
        </div>

        {/* Compliance Items List */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground mb-4">Compliance Requirements</h4>
          {complianceItems.map((item, index) => (
            <div 
              key={item.id}
              className="stat-card p-6 rounded-xl border border-white/10 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(item.status)}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground mb-1">{item.category}</h5>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        Deadline: {item.deadline}
                      </span>
                      {item.penaltyCost && (
                        <span className="flex items-center gap-1 text-error">
                          <DollarSign size={12} />
                          Penalty: ${item.penaltyCost.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground">{item.progress}%</div>
                    <div className={cn(
                      "text-xs px-3 py-1 rounded-full font-medium border",
                      getStatusColor(item.status)
                    )}>
                      {item.status.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="w-24">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.progress}%`,
                          backgroundColor: item.status === "completed" ? "hsl(142 86% 28%)" :
                                         item.status === "in-progress" ? "hsl(47 96% 53%)" :
                                         item.status === "overdue" ? "hsl(0 72% 51%)" : "hsl(var(--muted-foreground))"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Deadlines Alert */}
        {overdueItems > 0 && (
          <div className="mt-6 p-6 rounded-xl bg-error/5 border border-error/20 animate-pulse">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={20} className="text-error" />
              <h4 className="font-semibold text-error">Urgent Action Required</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              You have {overdueItems} overdue compliance requirement{overdueItems > 1 ? 's' : ''} that need immediate attention to avoid penalties.
            </p>
          </div>
        )}
      </div>
      
      {/* Subtle top border glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
}