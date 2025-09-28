export interface SustainabilityProject {
  id: string;
  name: string;
  category: string;
  esgScore: number;
  carbonReduction: number;
  costSavings: number;
  status: string;
}

export interface EmissionData {
  date: string;
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
}

export interface Supplier {
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

export interface ComplianceItem {
  id: string;
  category: string;
  status: "completed" | "in-progress" | "pending" | "overdue";
  deadline: string;
  progress: number;
  description: string;
  penaltyCost?: number;
}

export interface Insight {
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

export const sustainabilityStats = {
  esgScore: 78,
  carbonFootprint: 1247.8,
  sustainabilityCosts: 145680,
  carbonIntensity: 0.34,
  dailyChange: 3.2,
  weeklyChange: -5.1
};

export const carbonGaugeData = {
  current: 1247.8,
  dailyChange: -5.1,
  weeklyChange: -12.3
};

export const esgScoreIndex = {
  value: 78,
  indicator: "Good",
  previousValue: 74,
  previousChange: 4
};

export const sustainabilityTrends = [
  { id: 1, name: "Carbon Intensity", metric: "kg CO2e/$", category: "Carbon", change: -8.4 },
  { id: 2, name: "Renewable Energy", metric: "%", category: "Environmental", change: 12.7 },
  { id: 3, name: "Waste Reduction", metric: "tons", category: "Environmental", change: -15.2 },
  { id: 4, name: "Supply Chain ESG", metric: "score", category: "Social", change: 6.3 },
];

export const sustainabilityProjects = [
  { id: 1, name: "Solar Installation", category: "Renewable Energy", esgScore: 8.4, carbonReduction: 450.2, costSavings: 12400, status: "Active" },
  { id: 2, name: "Supply Chain Audit", category: "Social Compliance", esgScore: 7.6, carbonReduction: 85.7, costSavings: -8500, status: "In Progress" },
];

export const sustainabilityCategories = [
  { id: "all", name: "All" },
  { id: "environmental", name: "Environmental" },
  { id: "social", name: "Social" },
  { id: "governance", name: "Governance" },
];

export const useStats = () => {
  const carbonEmissionsData: EmissionData[] = [
    { date: "Jan", scope1: 145.2, scope2: 234.8, scope3: 456.1, total: 836.1 },
    { date: "Feb", scope1: 138.4, scope2: 228.3, scope3: 442.7, total: 809.4 },
  ];

  const suppliersData: Supplier[] = [
    {
      id: "1", name: "EcoTextiles Corp", location: "Mumbai, India", 
      coordinates: { x: 65, y: 45 }, esgScore: 85, carbonFootprint: 12.4,
      riskLevel: "low", category: "Textiles", compliance: 94
    },
  ];

  const cbamComplianceData: ComplianceItem[] = [
    {
      id: "1", category: "Carbon Content Declaration", status: "completed",
      deadline: "2024-12-31", progress: 100, description: "Submit carbon content data"
    },
  ];

  const sustainabilityInsights: Insight[] = [
    {
      id: "1", type: "recommendation", title: "Optimize Energy",
      description: "Switch to renewable energy", impact: "high", category: "Energy", 
      confidence: 92, actionRequired: true, estimatedSavings: 125000, timeframe: "6 months"
    },
  ];

  return {
    loading: false,
    stats: sustainabilityStats,
    carbonData: carbonGaugeData,
    esgScore: esgScoreIndex,
    trending: sustainabilityTrends,
    recentProjects: sustainabilityProjects,
    carbonEmissionsData,
    suppliersData,
    cbamComplianceData: {
      items: cbamComplianceData,
      overallStatus: 67,
      estimatedPenalties: 48500
    },
    sustainabilityInsights,
    refreshData: () => console.log("Refreshing...")
  };
};