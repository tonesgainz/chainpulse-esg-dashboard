# Contributing to ChainPulse ESG Dashboard

Thank you for your interest in contributing to ChainPulse ESG Dashboard! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Code Standards](#code-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing Requirements](#testing-requirements)
8. [Documentation](#documentation)
9. [Issue Reporting](#issue-reporting)
10. [Security](#security)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Initial Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/chainpulse-esg-dashboard.git
   cd chainpulse-esg-dashboard
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/tonesgainz/chainpulse-esg-dashboard.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Verify setup**
   - Open http://localhost:8080
   - Ensure the dashboard loads without errors

---

## Development Workflow

### Branching Strategy

We follow a feature branch workflow:

```
main (production)
  ↓
develop (staging)
  ↓
feature/your-feature-name
```

### Creating a Feature Branch

```bash
# Update your local main
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

Examples:
- `feature/add-dark-mode`
- `fix/carbon-chart-rendering`
- `docs/update-api-documentation`
- `refactor/simplify-state-management`

### Development Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow code standards (see below)
   - Add tests for new functionality

3. **Test your changes**
   ```bash
   npm run lint          # Lint code
   npm run build         # Test build
   npm run preview       # Test production build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add dark mode toggle"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/my-feature
   ```

6. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill out the PR template

---

## Code Standards

### TypeScript

#### Type Safety

```typescript
// ✅ Good: Explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  return fetchUser(id);
}

// ❌ Bad: Implicit any
function getUser(id) {
  return fetchUser(id);
}
```

#### Strict Mode

We use TypeScript strict mode. All code must:
- Have explicit types for function parameters and returns
- No implicit `any` types
- Handle null/undefined cases
- No unused variables

### React Components

#### Component Structure

```typescript
/**
 * Component Description
 *
 * @example
 * ```tsx
 * <MyComponent prop={value} />
 * ```
 */

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  /** Prop description */
  requiredProp: string;
  /** Optional prop */
  optionalProp?: number;
  /** Children elements */
  children?: React.ReactNode;
  /** Custom className */
  className?: string;
}

export default function MyComponent({
  requiredProp,
  optionalProp = 10,
  className,
}: MyComponentProps) {
  // 1. Hooks
  const [state, setState] = useState<string>('');

  // 2. Event handlers
  const handleClick = useCallback(() => {
    setState('clicked');
  }, []);

  // 3. Early returns
  if (!requiredProp) {
    return null;
  }

  // 4. Main render
  return (
    <div className={cn('base-class', className)}>
      {/* Content */}
    </div>
  );
}

// 5. Display name (for debugging)
MyComponent.displayName = 'MyComponent';
```

#### Hooks Best Practices

```typescript
// ✅ Good: Explicit dependencies
useEffect(() => {
  fetchData(id);
}, [id]);

// ❌ Bad: Missing dependencies
useEffect(() => {
  fetchData(id);
}, []);

// ✅ Good: useMemo for expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// ❌ Bad: Computing on every render
const expensiveValue = computeExpensiveValue(data);
```

### Styling with Tailwind

#### Class Organization

```tsx
// ✅ Good: Organized by category
<div className={cn(
  // Layout
  'flex items-center justify-between',
  // Spacing
  'p-4 gap-2',
  // Typography
  'text-lg font-semibold',
  // Colors
  'bg-background text-foreground',
  // Responsive
  'sm:p-6 md:p-8',
  // Custom
  className
)} />

// ❌ Bad: Random order
<div className="text-lg p-4 bg-background flex sm:p-6" />
```

#### Using cn() Helper

```typescript
import { cn } from '@/lib/utils';

// ✅ Good: Conditional classes
<div className={cn(
  'base-class',
  isActive && 'active-class',
  error && 'error-class',
  className
)} />

// ❌ Bad: Template strings
<div className={`base-class ${isActive ? 'active-class' : ''}`} />
```

### File Organization

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI primitives
│   ├── ErrorBoundary.tsx
│   └── Header.tsx
├── hooks/               # Custom React hooks
│   └── useStats.tsx
├── lib/                 # Utilities
│   ├── utils.ts
│   └── mockData.ts
├── pages/               # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── integrations/        # Third-party integrations
│   └── supabase/
└── App.tsx              # Root component
```

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `ErrorBoundary.tsx` |
| **Hooks** | camelCase with `use` prefix | `useStats.tsx` |
| **Utilities** | camelCase | `formatCurrency` |
| **Constants** | SCREAMING_SNAKE_CASE | `MAX_RETRIES` |
| **Interfaces** | PascalCase | `UserProfile` |
| **Types** | PascalCase | `ESGScore` |

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes

### Examples

```bash
# Feature
git commit -m "feat(dashboard): add carbon intensity chart"

# Bug fix
git commit -m "fix(api): handle null response in useStats hook"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactor
git commit -m "refactor(components): extract common chart logic"

# Breaking change
git commit -m "feat(api): migrate to GraphQL

BREAKING CHANGE: REST API endpoints removed"
```

### Commit Body

For significant changes, add a detailed body:

```bash
git commit -m "feat(security): add XSS protection to MarkdownRenderer

- Implement HTML sanitization with whitelist approach
- Remove dangerous attributes and script tags
- Add comprehensive tests for XSS scenarios
- Update documentation with security notes

Closes #123"
```

---

## Pull Request Process

### Before Submitting

1. ✅ Code follows style guidelines
2. ✅ All tests pass (`npm run lint`, `npm run build`)
3. ✅ Documentation updated (if applicable)
4. ✅ Commits follow conventional commits
5. ✅ Branch is up to date with main

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process

1. **Automated Checks**: CI runs linting and tests
2. **Code Review**: Maintainers review code quality
3. **Testing**: Verify functionality works as expected
4. **Approval**: At least one maintainer approval required
5. **Merge**: Squash and merge into main

### Addressing Feedback

```bash
# Make requested changes
git add .
git commit -m "refactor: address PR feedback"
git push origin feature/my-feature
```

---

## Testing Requirements

### Unit Tests (Future)

```typescript
import { render, screen } from '@testing-library/react';
import { StatsCard } from './StatsCard';

describe('StatsCard', () => {
  it('renders stat value correctly', () => {
    render(<StatsCard title="ESG Score" value="78/100" />);
    expect(screen.getByText('78/100')).toBeInTheDocument();
  });

  it('displays positive change indicator', () => {
    render(<StatsCard value="78" change={3.2} />);
    expect(screen.getByText('+3.2%')).toBeInTheDocument();
  });
});
```

### Testing Checklist

- [ ] Component renders without errors
- [ ] Props are handled correctly
- [ ] Edge cases are tested (null, undefined, empty)
- [ ] Event handlers work as expected
- [ ] Accessibility is maintained

---

## Documentation

### Code Documentation

#### JSDoc Comments

```typescript
/**
 * Formats a number as currency
 *
 * @param value - The numeric value to format
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 *
 * @example
 * ```typescript
 * formatCurrency(1000) // "$1,000.00"
 * formatCurrency(1000, 'EUR') // "€1,000.00"
 * ```
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
}
```

#### Component Documentation

Every component should have:
1. Description of purpose
2. Props interface with JSDoc
3. Usage example
4. Accessibility notes (if applicable)

### README Updates

Update README.md when adding:
- New features
- New dependencies
- New setup steps
- Breaking changes

---

## Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g. macOS 13.0]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]
```

### Feature Requests

```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other options explored
```

---

## Security

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Instead:
1. Email: security@chainpulse.example.com
2. Include detailed description
3. Steps to reproduce (if applicable)
4. Potential impact assessment

We will respond within 48 hours.

### Security Best Practices

When contributing:
- Never commit secrets (API keys, passwords)
- Sanitize all user input
- Use parameterized queries (when backend added)
- Follow OWASP Top 10 guidelines
- Validate all data from external sources

---

## Questions?

- 📧 Email: contribute@chainpulse.example.com
- 💬 Discussions: [GitHub Discussions](https://github.com/tonesgainz/chainpulse-esg-dashboard/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/tonesgainz/chainpulse-esg-dashboard/issues)

---

## License

By contributing to ChainPulse ESG Dashboard, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! 🎉**

Your contributions make this project better for everyone.
