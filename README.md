# ChainPulse ESG Dashboard

A comprehensive Environmental, Social, and Governance (ESG) monitoring and compliance dashboard for supply chain sustainability tracking. Monitor carbon emissions, ESG scores, CBAM compliance, and supplier performance in real-time.

## Features

### 📊 **Real-time ESG Monitoring**
- Track ESG scores, carbon footprint, and sustainability costs
- Monitor carbon intensity and daily/weekly performance trends
- Interactive gauge charts and trend visualizations

### 🌍 **Carbon Emissions Tracking**
- Scope 1, 2, and 3 emissions monitoring
- Historical trend analysis with interactive charts
- Carbon footprint reduction tracking

### 🏭 **Supply Chain ESG Management**
- Supplier ESG score heatmap visualization
- Risk level assessment (low, medium, high)
- Supplier compliance and carbon footprint tracking
- Geographic distribution analysis

### 📋 **CBAM Compliance Dashboard**
- EU Carbon Border Adjustment Mechanism (CBAM) compliance tracking
- Deadline monitoring and progress tracking
- Estimated penalty calculations
- Document and certification status

### 🤖 **AI-Powered Insights**
- Automated sustainability recommendations
- Predictive analytics for emissions reduction
- Cost optimization suggestions
- Compliance alerts and deadline notifications

### 📈 **Sustainability Projects**
- Track renewable energy initiatives
- Monitor cost savings and carbon reduction impact
- Project status and ESG score improvements
- ROI tracking for sustainability investments

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom animations
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Backend**: Supabase (optional integration)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm (recommended: [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd chainpulse-esg-dashboard

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```sh
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Configuration

### Environment Variables

The application uses Supabase for optional backend integration. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

To get these values:
1. Create a project at [Supabase](https://app.supabase.com/)
2. Navigate to Project Settings → API
3. Copy the URL and anon/public key

**Note**: The application currently uses mock data and can run without Supabase configuration. Backend integration is optional for production deployments.

## Project Structure

```
chainpulse-esg-dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── CBAMComplianceDashboard.tsx
│   │   ├── CarbonEmissionsTrendChart.tsx
│   │   ├── FearGreedIndex.tsx
│   │   ├── GaugeChart.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatsCard.tsx
│   │   ├── SupplyChainESGHeatmap.tsx
│   │   └── SustainabilityInsights.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useStats.tsx    # ESG data management
│   ├── lib/                # Utility functions
│   │   ├── mockData.ts     # Mock ESG data
│   │   └── utils.ts        # Helper functions
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Main dashboard
│   │   └── NotFound.tsx    # 404 page
│   ├── integrations/       # Third-party integrations
│   │   └── supabase/       # Supabase client (optional)
│   ├── App.tsx             # Root component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
└── supabase/              # Supabase configuration (optional)
```

## Available Scripts

```sh
# Start development server
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Deployment

### Deploy to Netlify

This project is configured for easy deployment to Netlify:

1. **Push to GitHub** (if not already done)

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Netlify auto-detects settings from `netlify.toml`

3. **Configure Environment Variables:**
   - Go to Site settings → Environment variables
   - Add your Supabase credentials (if using backend integration)

4. **Deploy:**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

The `netlify.toml` configuration includes:
- Optimized build settings
- SPA routing redirects
- Environment variable handling

### Other Deployment Options

- **Vercel**: Import from GitHub, auto-detects Vite configuration
- **GitHub Pages**: Use `gh-pages` or GitHub Actions
- **Docker**: Create a Dockerfile with nginx to serve the build
- **AWS S3 + CloudFront**: Upload build files to S3, configure CloudFront

## Data Sources

This application uses mock data for demonstration. In production, connect to:

- **ESG Data Providers**: MSCI ESG, Sustainalytics, Refinitiv
- **Carbon Accounting Platforms**: Persefoni, Plan A, Watershed
- **Compliance Databases**: CBAM registries, certification bodies
- **ERP Systems**: Internal sustainability and cost data
- **Supply Chain APIs**: Supplier ESG assessments and certifications

## Key Metrics Tracked

- **ESG Score**: Overall environmental, social, and governance rating (0-100)
- **Carbon Footprint**: Total CO2 equivalent emissions (kg CO2e)
- **Carbon Intensity**: Emissions per dollar revenue (kg CO2e/$)
- **Sustainability Costs**: Total spending on ESG initiatives
- **Scope Emissions**: Scope 1, 2, and 3 carbon emissions
- **Supplier Compliance**: ESG scores and risk levels across supply chain
- **CBAM Status**: EU compliance progress and penalty estimates

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is available under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Icons by [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- Inspired by real-world ESG compliance and sustainability tracking needs
