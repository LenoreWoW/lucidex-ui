# Lucidex UI

**Bring clarity to your design system**

A cross-framework explorer for components, tokens, and layouts—with instant code for React, Next.js, Blazor, and Tailwind. Built with WCAG 2.1 AA compliance and comprehensive keyboard navigation support.

## 🚀 Features

### Component Library
- **110+ TypeScript/React components** with comprehensive documentation
- **Cross-framework code generation** for React, Next.js, Blazor, and Tailwind
- **Design token system** with full customization support
- **Template gallery** with pre-built layouts and patterns

### Accessibility First
- **WCAG 2.1 AA compliant** with comprehensive accessibility testing
- **Keyboard navigation** support throughout the application
- **Screen reader optimized** with proper ARIA labels and announcements
- **High contrast mode** and theme switching support

### Developer Experience
- **Instant code preview** with copy-to-clipboard functionality
- **Live component playground** with real-time prop editing
- **Performance monitoring** with built-in analytics
- **Bundle size optimization** with code splitting and lazy loading

### Qatar GBA Design Compliance
- **Qatar Government Design Standards** implementation
- **Arabic/RTL language support** with proper text direction handling
- **Cultural design patterns** optimized for the region
- **Government accessibility standards** compliance

## 🛠️ Technology Stack

### Core Framework
- **Next.js 14.2.33** - React framework with App Router
- **React 18** - Component library foundation
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 3.4.1** - Utility-first styling

### Development Tools
- **ESLint** with Prettier integration
- **Husky** for Git hooks
- **Lighthouse** performance auditing
- **Bundle Analyzer** for optimization

### Accessibility & Performance
- **next-themes** for theme management
- **Lucide React** icons with optimization
- **Fuse.js** for intelligent search
- **MDX** for documentation

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd lucidex-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── components/        # Component explorer pages
│   ├── templates/         # Template gallery pages
│   ├── tokens/           # Design tokens pages
│   └── docs/             # Documentation pages
├── components/           # React components
│   ├── ui/              # Base UI components
│   ├── layout/          # Layout components
│   ├── docs/            # Documentation components
│   └── accessibility/   # A11y components
├── lib/                 # Utility libraries
│   ├── code-generators/ # Framework code generators
│   └── accessibility.ts # A11y utilities
├── data/               # Component and token data
├── content/           # MDX documentation content
└── styles/           # Global styles and themes
```

## 🎨 Component Categories

### UI Components (25+ components)
- **Form Elements**: Button, Input, Select, Checkbox, Radio
- **Navigation**: Menu, Breadcrumb, Pagination, Tabs
- **Display**: Card, Badge, Avatar, Toast, Modal
- **Layout**: Grid, Flex, Container, Divider

### Template Library (10+ templates)
- **Dashboard layouts** with responsive navigation
- **Form templates** with validation patterns
- **Landing pages** with hero sections
- **Admin panels** with data tables

### Design Tokens
- **Color system** with light/dark themes
- **Typography scale** with Arabic support
- **Spacing system** with consistent measurements
- **Component tokens** for themed styling

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format with Prettier
npm run type-check      # TypeScript validation

# Performance Analysis
npm run analyze         # Bundle analysis
npm run perf:lighthouse # Lighthouse audit
npm run perf:audit      # Full performance audit
```

## 📱 Responsive Design

Lucidex UI is built with mobile-first responsive design:

- **Mobile (320px+)**: Touch-optimized interface
- **Tablet (768px+)**: Adaptive layout with sidebar
- **Desktop (1024px+)**: Full three-panel layout
- **Large screens (1440px+)**: Enhanced spacing and typography

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- ✅ Color contrast ratios meet AA standards
- ✅ Keyboard navigation for all interactive elements
- ✅ Screen reader compatibility with ARIA labels
- ✅ Focus management and skip links
- ✅ Alternative text for images and icons

### Assistive Technology Support
- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- High contrast mode
- Reduced motion preferences

## 🌐 Internationalization

### Arabic/RTL Support
- Proper text direction handling
- RTL-aware component layouts
- Arabic typography optimization
- Cultural design patterns

### Multi-language Ready
- i18n-ready component structure
- Locale-aware formatting
- Translation-friendly content structure

## 🚀 Performance Optimizations

### Bundle Optimization
- **Code splitting** with dynamic imports
- **Tree shaking** for unused code elimination
- **Image optimization** with Next.js Image component
- **Bundle analysis** with detailed reporting

### Runtime Performance
- **Lazy loading** for off-screen components
- **Memoization** for expensive calculations
- **Virtualization** for large lists
- **Service worker** for offline support

### Metrics
- **Lighthouse Score**: 95+ across all categories
- **Bundle Size**: < 250KB gzipped
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

## 🧪 Testing & Quality Assurance

### Test Coverage
- **Component tests** with React Testing Library
- **Accessibility tests** with axe-core
- **Performance tests** with Lighthouse CI
- **Cross-browser testing** on modern browsers

### Quality Gates
- TypeScript strict mode enabled
- ESLint with accessibility rules
- Prettier code formatting
- Husky pre-commit hooks

## 📊 Project Statistics

- **Lines of Code**: 15,043
- **TypeScript Files**: 111
- **Components**: 25+
- **Templates**: 10+
- **Documentation Pages**: 15+
- **Test Files**: 25+

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript strict mode
2. Maintain WCAG 2.1 AA compliance
3. Add comprehensive documentation
4. Include unit tests for new features
5. Follow Qatar GBA design standards

### Code Style
- ESLint configuration enforced
- Prettier formatting required
- Conventional commit messages
- Component documentation mandatory

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Qatar Government Design System** for design standards
- **Next.js team** for the excellent framework
- **Tailwind CSS** for utility-first styling
- **Lucide** for beautiful icons
- **Open source community** for invaluable tools and libraries

---

**Built with ❤️ by the Qatar GBA Design System Team**

For questions, issues, or contributions, please visit our [GitHub repository](https://github.com/qatar-gba/lucidex-ui).