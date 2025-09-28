
export const sustainabilityStats = {
  esgScore: 78,
  carbonFootprint: 1247.8, // kg CO2e
  sustainabilityCosts: 145680, // monthly costs in USD
  carbonIntensity: 0.34, // kg CO2e per revenue dollar
  dailyChange: 3.2, // ESG score improvement
  weeklyChange: -5.1 // carbon reduction percentage
};

export const carbonGaugeData = {
  current: 1247.8, // kg CO2e
  dailyChange: -5.1, // carbon reduction
  weeklyChange: -12.3 // carbon reduction
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
  { id: 5, name: "Energy Efficiency", metric: "kWh/unit", category: "Environmental", change: -9.1 },
  { id: 6, name: "CBAM Compliance", metric: "%", category: "Governance", change: 18.5 },
  { id: 7, name: "Water Usage", metric: "L/unit", category: "Environmental", change: -11.8 },
  { id: 8, name: "Social Impact", metric: "score", category: "Social", change: 7.9 },
];

export const sustainabilityProjects = [
  { id: 1, name: "Solar Installation", category: "Renewable Energy", esgScore: 8.4, carbonReduction: 450.2, costSavings: 12400, status: "Active" },
  { id: 2, name: "Supply Chain Audit", category: "Social Compliance", esgScore: 7.6, carbonReduction: 85.7, costSavings: -8500, status: "In Progress" },
  { id: 3, name: "Waste Management", category: "Circular Economy", esgScore: 8.1, carbonReduction: 230.5, costSavings: 5600, status: "Active" },
  { id: 4, name: "CBAM Compliance", category: "Regulatory", esgScore: 7.8, carbonReduction: 0, costSavings: -15000, status: "Active" },
  { id: 5, name: "Energy Efficiency", category: "Operations", esgScore: 8.7, carbonReduction: 340.8, costSavings: 18200, status: "Active" },
  { id: 6, name: "Green Transport", category: "Logistics", esgScore: 7.2, carbonReduction: 120.3, costSavings: -3200, status: "Planning" },
  { id: 7, name: "Water Conservation", category: "Resource Management", esgScore: 8.0, carbonReduction: 95.4, costSavings: 4800, status: "Active" },
];

export const sustainabilityCategories = [
  { id: "all", name: "All" },
  { id: "environmental", name: "Environmental" },
  { id: "social", name: "Social" },
  { id: "governance", name: "Governance" },
];
