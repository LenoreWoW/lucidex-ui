import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contributing - Lucidex UI',
  description: 'Learn how to contribute to the Lucidex UI design system project.',
};

export default function ContributingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Contributing to Lucidex UI
        </h1>
        <p className="text-lg text-muted-foreground">
          We welcome contributions from the community! This guide will help you get started with contributing to the Lucidex UI design system.
        </p>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Getting Started</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Before you begin contributing, please take a moment to review our guidelines and processes. This ensures a smooth collaboration experience for everyone involved.
              </p>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Prerequisites</h3>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Node.js 18+ and npm</li>
                  <li>Git for version control</li>
                  <li>Familiarity with React, Next.js, and TypeScript</li>
                  <li>Understanding of design systems and accessibility principles</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Development Setup</h2>
            <div className="space-y-4 text-muted-foreground">
              <ol className="space-y-3 list-decimal pl-6">
                <li>
                  <strong>Fork the repository</strong> and clone your fork locally:
                  <pre className="mt-2 p-3 bg-muted rounded-md text-sm overflow-x-auto">
                    <code>git clone https://github.com/your-username/lucidex-ui.git</code>
                  </pre>
                </li>
                <li>
                  <strong>Install dependencies:</strong>
                  <pre className="mt-2 p-3 bg-muted rounded-md text-sm overflow-x-auto">
                    <code>npm install</code>
                  </pre>
                </li>
                <li>
                  <strong>Start the development server:</strong>
                  <pre className="mt-2 p-3 bg-muted rounded-md text-sm overflow-x-auto">
                    <code>npm run dev</code>
                  </pre>
                </li>
                <li>
                  <strong>Create a new branch</strong> for your feature or fix:
                  <pre className="mt-2 p-3 bg-muted rounded-md text-sm overflow-x-auto">
                    <code>git checkout -b feature/your-feature-name</code>
                  </pre>
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contribution Types</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-qgba-al-adaam rounded-full"></div>
                  Bug Fixes
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Found a bug? Help us fix it by reporting issues or submitting patches.
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Check existing issues first</li>
                  <li>Provide clear reproduction steps</li>
                  <li>Include screenshots if applicable</li>
                </ul>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-qgba-sea rounded-full"></div>
                  New Components
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Contribute new components following our design system guidelines.
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Follow Qatar GBA color guidelines</li>
                  <li>Ensure WCAG 2.1 AA compliance</li>
                  <li>Include comprehensive tests</li>
                </ul>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-qgba-palm rounded-full"></div>
                  Documentation
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Improve or add to our documentation to help other developers.
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Fix typos and clarify content</li>
                  <li>Add usage examples</li>
                  <li>Create new guides</li>
                </ul>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-qgba-sunrise rounded-full"></div>
                  Accessibility
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Help us maintain and improve accessibility across all components.
                </p>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Test with screen readers</li>
                  <li>Improve keyboard navigation</li>
                  <li>Enhance color contrast</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Code Guidelines</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Style and Standards</h3>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Follow TypeScript best practices with strict type checking</li>
                  <li>Use functional components with React Hooks</li>
                  <li>Follow the existing code style and naming conventions</li>
                  <li>Write comprehensive tests for new features</li>
                  <li>Ensure all components are accessible (WCAG 2.1 AA)</li>
                  <li>Use semantic HTML elements where appropriate</li>
                </ul>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Component Structure</h3>
                <pre className="p-3 bg-muted rounded-md text-sm overflow-x-auto">
                  <code>{`src/
├── components/
│   ├── ui/           # Base UI components
│   ├── components/   # Complex components
│   └── templates/    # Page templates
├── data/
│   └── components/   # Component definitions
└── lib/             # Utility functions`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Pull Request Process</h2>
            <div className="space-y-4 text-muted-foreground">
              <ol className="space-y-3 list-decimal pl-6">
                <li>Ensure your branch is up to date with the main branch</li>
                <li>Run all tests and ensure they pass</li>
                <li>Update documentation if necessary</li>
                <li>Create a detailed pull request with:
                  <ul className="mt-2 space-y-1 list-disc pl-6">
                    <li>Clear description of changes</li>
                    <li>Screenshots for UI changes</li>
                    <li>Link to related issues</li>
                    <li>Testing instructions</li>
                  </ul>
                </li>
                <li>Request review from maintainers</li>
                <li>Address any feedback promptly</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Community</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Join our community of contributors and stay updated with the latest developments:
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/your-repo/lucidex-ui"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub Repository
                </a>
                <a
                  href="/docs"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Documentation
                </a>
              </div>
            </div>
          </section>

          <div className="bg-qgba-al-adaam/5 border border-qgba-al-adaam/20 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
              </svg>
              Code of Conduct
            </h3>
            <p className="text-sm text-muted-foreground">
              By contributing to Lucidex UI, you agree to abide by our Code of Conduct. We are committed to providing a welcoming and inclusive environment for all contributors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}