import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog - Lucidex UI',
  description:
    'Track changes, updates, and improvements to the Lucidex UI design system.',
};

const changelogEntries = [
  {
    version: '1.0.0',
    date: '2024-12-15',
    type: 'major',
    changes: [
      'Initial release of Lucidex UI design system',
      'Complete component library with Qatar GBA color palette',
      'Accessibility-first design with WCAG 2.1 AA compliance',
      'Multi-framework support (React, Next.js, Blazor)',
      'Comprehensive token system',
      'Interactive component browser',
      'Template builder functionality',
    ],
  },
  {
    version: '0.9.0',
    date: '2024-12-01',
    type: 'minor',
    changes: [
      'Added dark mode support across all components',
      'Enhanced accessibility features',
      'Performance optimizations',
      'Service Worker integration for offline support',
    ],
  },
  {
    version: '0.8.0',
    date: '2024-11-15',
    type: 'minor',
    changes: [
      'Integrated Qatar GBA official color guidelines',
      'Updated Al Adaam, Dune, Skyline, Palm, Sea, and Sunrise color tokens',
      'Enhanced color contrast ratios for accessibility',
      'Updated component themes',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-foreground">Changelog</h1>
        <p className="text-lg text-muted-foreground">
          Keep track of all changes, updates, and improvements to Lucidex UI.
        </p>
      </div>

      <div className="space-y-8">
        {changelogEntries.map((entry, _index) => (
          <div
            key={entry.version}
            className="border-l-4 border-primary pb-8 pl-6 last:pb-0"
          >
            <div className="mb-4 flex items-center gap-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Version {entry.version}
              </h2>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  entry.type === 'major'
                    ? 'border border-qgba-al-adaam/20 bg-qgba-al-adaam/10 text-qgba-al-adaam'
                    : entry.type === 'minor'
                      ? 'border border-qgba-sea/20 bg-qgba-sea/10 text-qgba-sea'
                      : 'border border-qgba-palm/20 bg-qgba-palm/10 text-qgba-palm'
                }`}
              >
                {entry.type}
              </span>
              <span className="text-sm text-muted-foreground">
                {new Date(entry.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <ul className="space-y-2">
              {entry.changes.map((change, changeIndex) => (
                <li key={changeIndex} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span className="text-foreground">{change}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg border bg-card p-6">
        <h3 className="mb-2 text-lg font-semibold">Stay Updated</h3>
        <p className="mb-4 text-muted-foreground">
          Want to be notified about new releases and updates? Follow our
          development progress and get the latest news.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/your-repo/lucidex-ui"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            Watch on GitHub
          </a>
          <a
            href="/docs"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
