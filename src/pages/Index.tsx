
import { useState } from "react";
import { useStats } from "@/hooks/useStats";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import GaugeChart from "@/components/GaugeChart";
import TrendingSection from "@/components/TrendingSection";
import FearGreedIndex from "@/components/FearGreedIndex";
import CarbonEmissionsTrendChart from "@/components/CarbonEmissionsTrendChart";
import SupplyChainESGHeatmap from "@/components/SupplyChainESGHeatmap";
import CBAMComplianceDashboard from "@/components/CBAMComplianceDashboard";
import SustainabilityInsights from "@/components/SustainabilityInsights";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Leaf, Target, DollarSign, TrendingDown, BarChart3, FileCheck, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Index() {
  const { 
    loading, 
    stats, 
    carbonData, 
    esgScore, 
    trending, 
    recentProjects,
    carbonEmissionsData,
    suppliersData,
    cbamComplianceData,
    sustainabilityInsights,
    refreshData 
  } = useStats();
  
  // Format large numbers for display
  const formatCurrency = (value: number) => {
    if (!value && value !== 0) return '$0';
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${value.toFixed(2)}`;
  };
  
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header onRefresh={refreshData} isLoading={loading} />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 space-y-8">
          <div className="max-w-screen-2xl mx-auto space-y-8">
            {/* Enhanced Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <StatsCard 
                title="ESG Score" 
                value={`${stats.esgScore}/100`} 
                change={stats.dailyChange} 
                icon={<Leaf size={22} className="text-success animate-float" />}
                animationDelay="0ms"
              />
              
              <StatsCard 
                title="Carbon Footprint" 
                value={`${stats.carbonFootprint.toFixed(1)} kg CO2e`} 
                change={stats.weeklyChange} 
                icon={<Target size={22} className="text-chart-blue animate-float" />}
                animationDelay="100ms"
              />
              
              <StatsCard 
                title="Sustainability Costs" 
                value={formatCurrency(stats.sustainabilityCosts)} 
                change={-3.2} 
                icon={<DollarSign size={22} className="text-warning animate-float" />}
                animationDelay="200ms"
              />
              
              <StatsCard 
                title="Carbon Intensity" 
                value={`${stats.carbonIntensity} kg CO2e/$`} 
                change={-8.4} 
                icon={<TrendingDown size={22} className="text-chart-purple animate-float" />}
                animationDelay="300ms"
              />
            </div>
            
            {/* Core Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GaugeChart 
                value={carbonData.current} 
                dailyChange={carbonData.dailyChange} 
                weeklyChange={carbonData.weeklyChange} 
              />
              
              <FearGreedIndex 
                value={esgScore.value} 
                indicator={esgScore.indicator} 
                previousValue={esgScore.previousValue} 
                previousChange={esgScore.previousChange} 
              />
            </div>

            {/* Carbon Emissions Trend Chart */}
            <CarbonEmissionsTrendChart 
              data={carbonEmissionsData} 
              timeframe="weekly" 
            />

            {/* Supply Chain & Compliance Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <SupplyChainESGHeatmap suppliers={suppliersData} />
              
              <div className="space-y-8">
                <CBAMComplianceDashboard 
                  complianceItems={cbamComplianceData.items}
                  overallStatus={cbamComplianceData.overallStatus}
                  estimatedPenalties={cbamComplianceData.estimatedPenalties}
                />
              </div>
            </div>

            {/* AI Insights Section */}
            <SustainabilityInsights insights={sustainabilityInsights} />

            {/* Enhanced Documentation Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="stat-card rounded-xl p-8 border border-white/10 animate-fade-in">
                <div className="relative">
                  {/* Animated background */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full sustainability-gradient animate-gradient" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-glow">
                        <FileCheck size={18} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-bold font-display gradient-text">Sustainability Documentation</h3>
                    </div>
                    
                    <MarkdownRenderer 
                      content={`
# ESG Reporting Standards

Our comprehensive sustainability framework follows **GRI Standards** and **SASB** guidelines.

## Key Compliance Areas:
- **Carbon Accounting**: Scope 1, 2, and 3 emissions tracking
- **Supply Chain Transparency**: Regular ESG assessments
- **Regulatory Compliance**: CBAM readiness and documentation

### Current Performance:
- ESG Score: **${stats.esgScore}/100**
- Carbon Intensity: **${stats.carbonIntensity} kg CO2e/$**
- Compliance Rate: **${cbamComplianceData.overallStatus}%**

[View Full ESG Report](https://example.com/esg-report)
                      `}
                      className="text-sm"
                    />
                  </div>
                  
                  {/* Subtle top border glow */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                </div>
              </div>

              <div className="stat-card rounded-xl p-8 border border-white/10 animate-fade-in">
                <div className="relative">
                  {/* Animated background */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full sustainability-gradient animate-gradient" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-glow">
                        <Brain size={18} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-bold font-display gradient-text">Action Items</h3>
                    </div>
                    
                    <MarkdownRenderer 
                      content={`
# Priority Actions

## High Impact Opportunities:
- **Energy Optimization**: Switch to renewable sources for *40% emission reduction*
- **Supply Chain**: Address compliance issues with high-risk suppliers
- **CBAM Preparation**: Complete overdue documentation requirements

## Quick Wins:
- Implement \`waste reduction\` practices (30% improvement)
- Update carbon accounting methodology
- Schedule supplier ESG assessments

### Timeline:
- **Immediate**: Address overdue compliance items
- **30 days**: Complete energy audit  
- **90 days**: Implement optimization recommendations

*Estimated total savings: $${sustainabilityInsights.reduce((sum, i) => sum + (i.estimatedSavings || 0), 0).toLocaleString()}*
                      `}
                      className="text-sm"
                    />
                  </div>
                  
                  {/* Subtle top border glow */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                </div>
              </div>
            </div>
            
            {/* Enhanced Trending Section */}
            <TrendingSection tokens={trending} />
            
            {/* Enhanced Projects Section */}
            <div className="stat-card rounded-xl p-8 border border-white/10 animate-fade-in">
              <div className="relative">
                {/* Animated background */}
                <div className="absolute inset-0 opacity-5">
                  <div className="h-full w-full sustainability-gradient animate-gradient" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-glow">
                      <BarChart3 size={18} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-display gradient-text">Sustainability Projects</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {recentProjects.map((project, index) => (
                      <div 
                        key={project.id} 
                        className="group stat-card p-6 rounded-xl border border-white/10 card-hover animate-scale-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 space-y-1">
                            <h4 className="font-semibold text-lg text-foreground/95">{project.name}</h4>
                            <p className="text-sm text-muted-foreground font-medium">{project.category}</p>
                          </div>
                          
                          <div className="flex items-center gap-8 text-sm">
                            <div className="text-center space-y-1">
                              <div className="font-bold text-lg text-success">{project.esgScore}</div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide">ESG Score</div>
                            </div>
                            
                            <div className="text-center space-y-1">
                              <div className="font-bold text-lg text-primary">{project.carbonReduction} kg</div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide">CO2e Saved</div>
                            </div>
                            
                            <div className="text-center space-y-1">
                              <div className={`font-bold text-lg ${project.costSavings >= 0 ? 'text-success' : 'text-error'}`}>
                                {project.costSavings >= 0 ? '+' : ''}${project.costSavings.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide">Cost Impact</div>
                            </div>
                            
                            <div className="text-center space-y-1">
                              <div className={cn(
                                "px-4 py-2 rounded-lg text-sm font-semibold border",
                                project.status === 'Active' ? 'bg-success/10 text-success border-success/20' :
                                project.status === 'In Progress' ? 'bg-warning/10 text-warning border-warning/20' :
                                'bg-secondary/50 text-muted-foreground border-border'
                              )}>
                                {project.status}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Subtle top border glow */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
