
import { useState } from "react";
import { useStats } from "@/hooks/useStats";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import GaugeChart from "@/components/GaugeChart";
import TrendingSection from "@/components/TrendingSection";
import FearGreedIndex from "@/components/FearGreedIndex";
import { Leaf, Target, DollarSign, TrendingDown } from "lucide-react";

export default function Index() {
  const { 
    loading, 
    stats, 
    carbonData, 
    esgScore, 
    trending, 
    recentProjects, 
    refreshData 
  } = useStats();
  
  // Format large numbers for display
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${value.toFixed(2)}`;
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header onRefresh={refreshData} isLoading={loading} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <StatsCard 
                title="ESG Score" 
                value={`${stats.esgScore}/100`} 
                change={stats.dailyChange} 
                icon={<Leaf size={20} className="text-chart-green" />}
                colorClass="from-green-500/20 to-green-600/5"
                animationDelay="0ms"
              />
              
              <StatsCard 
                title="Carbon Footprint" 
                value={`${stats.carbonFootprint.toFixed(1)} kg CO2e`} 
                change={stats.weeklyChange} 
                icon={<Target size={20} className="text-chart-blue" />}
                colorClass="from-blue-500/20 to-blue-600/5"
                animationDelay="50ms"
              />
              
              <StatsCard 
                title="Sustainability Costs" 
                value={formatCurrency(stats.sustainabilityCosts)} 
                change={-3.2} 
                icon={<DollarSign size={20} className="text-chart-yellow" />}
                colorClass="from-yellow-500/20 to-yellow-600/5"
                animationDelay="100ms"
              />
              
              <StatsCard 
                title="Carbon Intensity" 
                value={`${stats.carbonIntensity} kg CO2e/$`} 
                change={-8.4} 
                icon={<TrendingDown size={20} className="text-chart-purple" />}
                colorClass="from-purple-500/20 to-purple-600/5"
                animationDelay="150ms"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            
            <TrendingSection tokens={trending} />
            
            <div className="rounded-lg border border-border bg-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Sustainability Projects</h3>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                      <div className="flex-1">
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.category}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{project.esgScore}</div>
                          <div className="text-muted-foreground">ESG Score</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{project.carbonReduction} kg</div>
                          <div className="text-muted-foreground">CO2e Saved</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-medium ${project.costSavings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {project.costSavings >= 0 ? '+' : ''}${project.costSavings.toLocaleString()}
                          </div>
                          <div className="text-muted-foreground">Cost Impact</div>
                        </div>
                        <div className="text-center">
                          <div className={`px-2 py-1 rounded text-xs ${
                            project.status === 'Active' ? 'bg-green-100 text-green-800' :
                            project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
