import { Star, Code, Search } from 'lucide-react';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-8 text-center">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="rounded-2xl bg-primary/10 p-4 ring-1 ring-primary/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
                  <span className="text-2xl font-bold text-primary-foreground">
                    P
                  </span>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Polaris UI Explorer
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Explore and discover beautiful UI components and design patterns
              for your next project
            </p>
          </div>

          {/* Features Grid */}
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="group space-y-4 rounded-xl border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Smart Search
              </h3>
              <p className="text-sm text-muted-foreground">
                Find components quickly with our intelligent search powered by
                Fuse.js
              </p>
            </div>

            <div className="group space-y-4 rounded-xl border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Code Examples
              </h3>
              <p className="text-sm text-muted-foreground">
                Copy-paste ready components with TypeScript and Tailwind CSS
              </p>
            </div>

            <div className="group space-y-4 rounded-xl border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Best Practices
              </h3>
              <p className="text-sm text-muted-foreground">
                Learn from curated design patterns and accessibility standards
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 space-y-6">
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-105 hover:bg-primary/90 hover:shadow-xl">
                Start Exploring
              </button>
              <button className="rounded-lg border border-border px-8 py-3 font-medium transition-all duration-200 hover:scale-105 hover:border-primary/20 hover:bg-accent hover:text-accent-foreground">
                View Components
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with Next.js 14, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
