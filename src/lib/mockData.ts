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

export const carbonEmissionsData: EmissionData[] = [
  { date: "Jan", scope1: 145.2, scope2: 234.8, scope3: 456.1, total: 836.1 },
  { date: "Feb", scope1: 138.4, scope2: 228.3, scope3: 442.7, total: 809.4 },
  { date: "Mar", scope1: 142.1, scope2: 225.6, scope3: 438.9, total: 806.6 },
  { date: "Apr", scope1: 135.7, scope2: 220.4, scope3: 425.3, total: 781.4 },
  { date: "May", scope1: 139.8, scope2: 218.9, scope3: 432.1, total: 790.8 },
  { date: "Jun", scope1: 133.2, scope2: 215.7, scope3: 419.8, total: 768.7 },
];

export const suppliersData: Supplier[] = [
  {
    id: "1", name: "EcoTextiles Corp", location: "Mumbai, India", 
    coordinates: { x: 65, y: 45 }, esgScore: 85, carbonFootprint: 12.4,
    riskLevel: "low", category: "Textiles", compliance: 94
  },
  {
    id: "2", name: "GreenTech Materials", location: "Shenzhen, China", 
    coordinates: { x: 75, y: 35 }, esgScore: 78, carbonFootprint: 18.7,
    riskLevel: "medium", category: "Electronics", compliance: 87
  },
  {
    id: "3", name: "SustainPack Ltd", location: "Birmingham, UK", 
    coordinates: { x: 25, y: 25 }, esgScore: 92, carbonFootprint: 8.3,
    riskLevel: "low", category: "Packaging", compliance: 98
  },
];

// Generate dynamic dates relative to current date
const today = new Date();
const nextMonth = new Date(today);
nextMonth.setMonth(today.getMonth() + 1);
const twoMonthsOut = new Date(today);
twoMonthsOut.setMonth(today.getMonth() + 2);

export const cbamComplianceItems: ComplianceItem[] = [
  {
    id: "1", category: "Carbon Content Declaration", status: "completed",
    deadline: today.toISOString().split('T')[0], progress: 100, description: "Submit carbon content data"
  },
  {
    id: "2", category: "CBAM Certificate", status: "in-progress",
    deadline: nextMonth.toISOString().split('T')[0], progress: 75, description: "Obtain CBAM certificates for imports"
  },
  {
    id: "3", category: "Verification Report", status: "pending",
    deadline: twoMonthsOut.toISOString().split('T')[0], progress: 30, description: "Third-party verification of emissions data"
  },
];

export const cbamComplianceData = {
  items: cbamComplianceItems,
  overallStatus: 67,
  estimatedPenalties: 48500
};

export const sustainabilityInsights: Insight[] = [
  {
    id: "1", type: "recommendation" as const, title: "Optimize Energy Usage",
    description: "Switch to renewable energy sources to reduce Scope 2 emissions by 40%", 
    impact: "high" as const, category: "Energy", 
    confidence: 92, actionRequired: true, estimatedSavings: 125000, timeframe: "6 months"
  },
  {
    id: "2", type: "alert" as const, title: "CBAM Compliance Deadline",
    description: "Upcoming CBAM certificate deadline requires immediate attention", 
    impact: "high" as const, category: "Compliance", 
    confidence: 98, actionRequired: true, estimatedSavings: 0, timeframe: "2 weeks"
  },
  {
    id: "3", type: "optimization" as const, title: "Supply Chain Efficiency",
    description: "Consolidate shipments to reduce transportation emissions", 
    impact: "medium" as const, category: "Logistics", 
    confidence: 85, actionRequired: false, estimatedSavings: 45000, timeframe: "3 months"
  },
];

// This function is now moved to hooks/useStats.tsx