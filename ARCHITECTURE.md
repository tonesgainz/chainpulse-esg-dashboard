# ChainPulse ESG Dashboard - Architecture Documentation

**Version**: 1.0.0
**Last Updated**: 2025-11-22
**Status**: Active Development

---

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Component Architecture](#component-architecture)
4. [Data Flow](#data-flow)
5. [State Management](#state-management)
6. [Routing Strategy](#routing-strategy)
7. [Error Handling](#error-handling)
8. [Performance Optimization](#performance-optimization)
9. [Security Architecture](#security-architecture)
10. [Deployment Architecture](#deployment-architecture)
11. [Technology Stack](#technology-stack)
12. [Design Patterns](#design-patterns)
13. [Future Enhancements](#future-enhancements)

---

## Overview

ChainPulse ESG Dashboard is a comprehensive web application for monitoring Environmental, Social, and Governance (ESG) metrics across supply chains. The application provides real-time tracking of carbon emissions, supplier compliance, CBAM regulations, and sustainability initiatives.

### Key Features

- **Real-time ESG Monitoring**: Track scores, carbon footprint, and sustainability costs
- **Carbon Emissions Analysis**: Scope 1, 2, and 3 emissions tracking with historical trends
- **Supply Chain Management**: Supplier ESG scoring and risk assessment
- **CBAM Compliance**: EU compliance tracking with deadline monitoring
- **AI-Powered Insights**: Automated recommendations and predictive analytics

### Architecture Principles

1. **Component-Based**: Modular, reusable React components
2. **Type-Safe**: Full TypeScript coverage with strict mode
3. **Performance-First**: Code splitting, lazy loading, memoization
4. **Security-Focused**: XSS protection, CSP headers, sanitization
5. **Accessibility**: WCAG 2.1 AA compliance
6. **Scalability**: Ready for backend integration

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Client Browser                              │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                    React Application                        │   │
│  │                                                             │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │   │
│  │  │   UI Layer   │  │  State Mgmt  │  │  Data Layer  │    │   │
│  │  │              │  │              │  │              │    │   │
│  │  │  Components  │──│ React Query  │──│  API Client  │    │   │
│  │  │   Routing    │  │    Hooks     │  │  Mock Data   │    │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │   │
│  │                                                             │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │         Cross-Cutting Concerns                      │  │   │
│  │  │                                                      │  │   │
│  │  │  - Error Boundaries                                │  │   │
│  │  │  - Security (XSS Protection, CSP)                 │  │   │
│  │  │  - Performance (Lazy Loading, Memoization)        │  │   │
│  │  │  - Accessibility (ARIA, Keyboard Nav)             │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                ↓
                                ↓ HTTPS
                                ↓
┌─────────────────────────────────────────────────────────────────────┐
│                         Netlify CDN                                  │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  Static Assets:  dist/  (HTML, JS, CSS, Images)           │   │
│  │  Security Headers: CSP, HSTS, X-Frame-Options              │   │
│  │  Caching: Aggressive for assets, none for HTML             │   │
│  └────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                ↓
                                ↓ (Optional)
                                ↓
┌─────────────────────────────────────────────────────────────────────┐
│                     Backend Services (Future)                        │
│                                                                      │
│  ┌──────────────────┐    ┌──────────────────┐                      │
│  │   Supabase       │    │   External APIs  │                      │
│  │   - Auth         │    │   - ESG Providers│                      │
│  │   - Database     │    │   - Carbon APIs  │                      │
│  │   - Real-time    │    │   - CBAM Data    │                      │
│  └──────────────────┘    └──────────────────┘                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | Responsibility | Technologies |
|-------|---------------|--------------|
| **Presentation** | UI components, user interactions | React, shadcn/ui, Tailwind |
| **Application** | Business logic, state management | React Query, Custom Hooks |
| **Data** | Data fetching, caching, transformation | Mock Data, Future: REST/GraphQL |
| **Infrastructure** | Deployment, CDN, security | Netlify, Security Headers |

---

## Component Architecture

### Component Hierarchy

```
App (Root)
│
├── ErrorBoundary
│   └── QueryClientProvider
│       └── TooltipProvider
│           └── BrowserRouter
│               └── Routes
│                   ├── Index (Dashboard)
│                   │   ├── Sidebar
│                   │   ├── Header
│                   │   ├── StatsCard (×4)
│                   │   ├── GaugeChart
│                   │   ├── FearGreedIndex
│                   │   ├── CarbonEmissionsTrendChart
│                   │   ├── SupplyChainESGHeatmap
│                   │   ├── CBAMComplianceDashboard
│                   │   ├── SustainabilityInsights
│                   │   ├── MarkdownRenderer (×2)
│                   │   └── TrendingSection
│                   │
│                   └── NotFound (404)
```

### Component Categories

#### 1. **Layout Components**
- `App.tsx` - Root component with providers
- `ErrorBoundary.tsx` - Error handling wrapper
- `Sidebar.tsx` - Navigation sidebar
- `Header.tsx` - Top navigation bar

#### 2. **Data Visualization Components**
- `StatsCard.tsx` - Metric display cards
- `GaugeChart.tsx` - Carbon footprint gauge
- `FearGreedIndex.tsx` - ESG score indicator
- `CarbonEmissionsTrendChart.tsx` - Emissions timeline
- `SupplyChainESGHeatmap.tsx` - Supplier heatmap
- `CBAMComplianceDashboard.tsx` - Compliance tracking

#### 3. **Content Components**
- `MarkdownRenderer.tsx` - Sanitized markdown display
- `SustainabilityInsights.tsx` - AI recommendations
- `TrendingSection.tsx` - Trending metrics
- `ProjectsTable.tsx` - Sustainability projects

#### 4. **UI Primitives** (`/components/ui/`)
- Built on Radix UI primitives
- Styled with Tailwind CSS
- Fully accessible and composable

### Component Design Principles

```typescript
/**
 * Component Template
 *
 * @example
 * ```tsx
 * <ComponentName
 *   requiredProp={value}
 *   optionalProp={value}
 *   onAction={handler}
 * />
 * ```
 */

interface ComponentProps {
  // Props interface with JSDoc
  requiredProp: Type;
  optionalProp?: Type;
  children?: ReactNode;
  className?: string; // Allow style composition
  onAction?: () => void; // Optional callbacks
}

const Component = ({
  requiredProp,
  optionalProp = defaultValue,
  className,
}: ComponentProps) => {
  // 1. Hooks at the top
  const [state, setState] = useState();
  const memoizedValue = useMemo(() => {}, [deps]);

  // 2. Event handlers
  const handleAction = useCallback(() => {}, [deps]);

  // 3. Early returns for conditional rendering
  if (!data) return <Skeleton />;

  // 4. Main render
  return (
    <div className={cn(baseStyles, className)}>
      {/* Accessible, semantic HTML */}
    </div>
  );
};

// 5. Export with display name for debugging
Component.displayName = 'Component';
export default Component;
```

---

## Data Flow

### Current Architecture (Mock Data)

```
┌─────────────────┐
│  Component      │
│  (e.g., Index)  │
└────────┬────────┘
         │
         │ uses hook
         ↓
┌─────────────────┐
│  useStats()     │
│  Custom Hook    │
└────────┬────────┘
         │
         │ imports
         ↓
┌─────────────────┐
│  mockData.ts    │
│  Static Data    │
└─────────────────┘
```

### Future Architecture (With Backend)

```
┌─────────────────┐
│  Component      │
└────────┬────────┘
         │
         │ useQuery()
         ↓
┌─────────────────────┐
│  React Query        │
│  - Caching          │
│  - Retry Logic      │
│  - Optimistic UI    │
└────────┬────────────┘
         │
         │ fetcher
         ↓
┌─────────────────────┐
│  API Client         │
│  - Auth Headers     │
│  - Request/Response │
│  - Error Handling   │
└────────┬────────────┘
         │
         │ HTTP/WS
         ↓
┌─────────────────────┐
│  Backend API        │
│  - REST/GraphQL     │
│  - Authentication   │
│  - Authorization    │
└─────────────────────┘
```

### Data Flow Patterns

#### 1. **Query Pattern** (Read Operations)

```typescript
// Hook
function useESGData() {
  return useQuery({
    queryKey: ['esg', 'scores'],
    queryFn: fetchESGScores,
    staleTime: 5 * 60 * 1000,
  });
}

// Component
function Dashboard() {
  const { data, isLoading, error } = useESGData();

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;

  return <StatsCard data={data} />;
}
```

#### 2. **Mutation Pattern** (Write Operations)

```typescript
// Hook
function useUpdateESG() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateESGScore,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['esg'] });
    },
  });
}

// Component
function ESGForm() {
  const mutation = useUpdateESG();

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  return <Form onSubmit={handleSubmit} />;
}
```

---

## State Management

### State Management Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    Application State                         │
│                                                               │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐    │
│  │   Server    │  │     UI       │  │     URL         │    │
│  │   State     │  │    State     │  │    State        │    │
│  │             │  │              │  │                 │    │
│  │ React Query │  │ useState()   │  │ React Router    │    │
│  │ useQuery()  │  │ useReducer() │  │ useSearchParams │    │
│  └─────────────┘  └──────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### State Categories

| State Type | Location | Example | Persistence |
|-----------|----------|---------|-------------|
| **Server State** | React Query cache | ESG scores, carbon data | Memory + HTTP cache |
| **UI State** | Component useState | Modal open, form input | None |
| **URL State** | Router params/query | Selected filter, page | URL |
| **Local State** | localStorage | Theme preference, settings | localStorage |

### State Management Example

```typescript
// src/hooks/useStats.tsx
export function useStats() {
  const [loading, setLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return {
    loading,
    stats: sustainabilityStats,
    carbonData: carbonGaugeData,
    // ... other data
  };
}
```

---

## Routing Strategy

### Route Structure

```
/                       → Index (Dashboard)
/*                      → NotFound (404)

Future Routes:
/settings              → User Settings
/reports               → ESG Reports
/suppliers             → Supplier Management
/compliance            → Compliance Dashboard
/projects/:id          → Project Details
```

### Route Configuration

```typescript
// src/App.tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### Navigation Patterns

1. **Programmatic Navigation**:
   ```typescript
   import { useNavigate } from 'react-router-dom';

   const navigate = useNavigate();
   navigate('/dashboard');
   ```

2. **Declarative Navigation**:
   ```tsx
   import { Link } from 'react-router-dom';

   <Link to="/dashboard">Dashboard</Link>
   ```

---

## Error Handling

### Error Handling Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    Error Handling Layers                     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. ErrorBoundary (React Errors)                    │   │
│  │     - Component lifecycle errors                     │   │
│  │     - Rendering errors                               │   │
│  │     - User-friendly fallback UI                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  2. React Query (API Errors)                        │   │
│  │     - Network errors                                 │   │
│  │     - HTTP errors                                    │   │
│  │     - Retry logic                                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  3. try/catch (Synchronous Errors)                  │   │
│  │     - Parsing errors                                 │   │
│  │     - Validation errors                              │   │
│  │     - Business logic errors                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  4. Global Error Handler                            │   │
│  │     - Unhandled promise rejections                   │   │
│  │     - Window errors                                  │   │
│  │     - Send to logging service                        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Error Boundary Implementation

```typescript
// Catches React component errors
<ErrorBoundary onError={handleError}>
  <App />
</ErrorBoundary>
```

### Query Error Handling

```typescript
// Handles API errors
const { data, error } = useQuery({
  queryFn: fetchData,
  retry: 3,
  onError: (error) => {
    toast.error('Failed to load data');
  },
});
```

---

## Performance Optimization

### Performance Strategies

```
┌─────────────────────────────────────────────────────────────┐
│              Performance Optimization Layers                 │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Build Time                                          │   │
│  │  - Tree shaking                                      │   │
│  │  - Code splitting                                    │   │
│  │  - Asset optimization                                │   │
│  │  - Bundle size monitoring                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Runtime                                             │   │
│  │  - React.memo()                                      │   │
│  │  - useMemo()                                         │   │
│  │  - useCallback()                                     │   │
│  │  - Lazy loading                                      │   │
│  │  - Virtual scrolling                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Network                                             │   │
│  │  - HTTP/2                                            │   │
│  │  - CDN caching                                       │   │
│  │  - Resource hints (preload, prefetch)               │   │
│  │  - Compression (gzip, brotli)                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Memoization Example

```typescript
// MarkdownRenderer.tsx
const safeHTML = useMemo(() => {
  const parsed = parseMarkdown(content);
  return sanitizeHTML(parsed);
}, [content]);
```

### Code Splitting Example

```typescript
// Future implementation
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Reports = lazy(() => import('./pages/Reports'));

<Suspense fallback={<Spinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/reports" element={<Reports />} />
  </Routes>
</Suspense>
```

---

## Security Architecture

### Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. Infrastructure Security                          │   │
│  │     - HTTPS only                                     │   │
│  │     - Security headers (CSP, HSTS, X-Frame-Options) │   │
│  │     - CDN protection                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  2. Application Security                            │   │
│  │     - XSS prevention (sanitization)                  │   │
│  │     - Input validation                               │   │
│  │     - Output encoding                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↓                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  3. Authentication & Authorization (Future)          │   │
│  │     - JWT tokens                                     │   │
│  │     - Role-based access control                      │   │
│  │     - Session management                             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Security Implementations

#### 1. **XSS Prevention**

```typescript
// MarkdownRenderer.tsx
const sanitizeHTML = (html: string): string => {
  // Remove script tags
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handlers
  html = html.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');

  // Whitelist safe tags
  // ... additional sanitization
  return html;
};
```

#### 2. **Content Security Policy**

```toml
# netlify.toml
Content-Security-Policy = """
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
"""
```

#### 3. **Input Validation** (Future)

```typescript
// Using Zod for schema validation
import { z } from 'zod';

const ESGScoreSchema = z.object({
  score: z.number().min(0).max(100),
  category: z.enum(['environmental', 'social', 'governance']),
  timestamp: z.date(),
});

type ESGScore = z.infer<typeof ESGScoreSchema>;
```

---

## Deployment Architecture

### Netlify Deployment Flow

```
┌─────────────────┐
│  Git Push       │
│  to GitHub      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Netlify        │
│  Build Trigger  │
└────────┬────────┘
         │
         ↓
┌─────────────────────────┐
│  Build Process          │
│  1. npm install         │
│  2. npm run build       │
│  3. Generate dist/      │
└────────┬────────────────┘
         │
         ↓
┌─────────────────────────┐
│  Deploy to CDN          │
│  - Upload assets        │
│  - Apply headers        │
│  - Configure redirects  │
└────────┬────────────────┘
         │
         ↓
┌─────────────────────────┐
│  Live on Netlify CDN    │
│  - Global distribution  │
│  - HTTPS automatic      │
│  - Instant rollback     │
└─────────────────────────┘
```

### Build Optimization

```json
// package.json
{
  "scripts": {
    "build": "vite build",
    "build:dev": "vite build --mode development"
  }
}
```

### Environment Variables

```bash
# .env.example
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-key
```

---

## Technology Stack

### Core Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 18.3.1 | UI library |
| **Language** | TypeScript | 5.5.3 | Type safety |
| **Build Tool** | Vite | 5.4.20 | Fast builds |
| **Styling** | Tailwind CSS | 3.4.11 | Utility-first CSS |
| **Components** | shadcn/ui | Latest | UI primitives |
| **State Management** | TanStack Query | 5.56.2 | Server state |
| **Routing** | React Router | 6.26.2 | Client routing |
| **Charts** | Recharts | 2.12.7 | Data visualization |
| **Icons** | Lucide React | 0.462.0 | Icon library |

### Development Tools

- **ESLint**: Code linting
- **TypeScript ESLint**: TS-specific linting
- **Prettier**: Code formatting (recommended)
- **Git**: Version control
- **GitHub**: Code hosting

### Deployment

- **Netlify**: Hosting and CDN
- **GitHub Actions**: CI/CD (future)

---

## Design Patterns

### 1. **Container/Presentational Pattern**

```typescript
// Container (Smart Component)
function DashboardContainer() {
  const { data, loading } = useStats();

  if (loading) return <Spinner />;

  return <DashboardView data={data} />;
}

// Presentational (Dumb Component)
function DashboardView({ data }: { data: Stats }) {
  return <div>{/* Render UI */}</div>;
}
```

### 2. **Compound Component Pattern**

```typescript
// Usage
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

### 3. **Render Props Pattern** (for sharing logic)

```typescript
<DataProvider
  render={({ data, loading }) => (
    loading ? <Spinner /> : <View data={data} />
  )}
/>
```

### 4. **Custom Hooks Pattern**

```typescript
function useStats() {
  // Encapsulate reusable logic
  const [data, setData] = useState();
  // ...
  return { data, loading, error };
}
```

---

## Future Enhancements

### Phase 1: Core Features (Q1 2026)
- [ ] Backend API integration (Supabase)
- [ ] Real-time data updates
- [ ] User authentication
- [ ] Advanced filtering and search
- [ ] Data export (CSV/PDF)

### Phase 2: Advanced Features (Q2 2026)
- [ ] Multi-language support (i18n)
- [ ] Dark mode
- [ ] Offline support (PWA)
- [ ] Advanced analytics
- [ ] Custom reports

### Phase 3: Enterprise Features (Q3 2026)
- [ ] Multi-tenant support
- [ ] API integrations (ESG providers)
- [ ] Automated compliance checking
- [ ] Machine learning insights
- [ ] Mobile apps (React Native)

---

## Conclusion

This architecture is designed to be:
- **Scalable**: Ready for growth
- **Maintainable**: Clear patterns and documentation
- **Secure**: Multiple layers of protection
- **Performant**: Optimized for speed
- **Accessible**: WCAG 2.1 AA compliant

For questions or contributions, see [CONTRIBUTING.md](CONTRIBUTING.md).

---

**Document Version**: 1.0.0
**Last Review**: 2025-11-22
**Next Review**: 2026-01-22
