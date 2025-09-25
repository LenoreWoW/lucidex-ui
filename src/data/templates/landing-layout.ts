import { Template } from '@/types/templates';

export const landingLayoutTemplate: Template = {
  id: 'landing-layout-01',
  name: 'Qatar GBA Landing Page',
  description:
    'A modern and engaging landing page layout for government services with hero section, features, and call-to-action areas',
  category: 'landing-page',
  tags: [
    'landing',
    'hero',
    'features',
    'cta',
    'qatar-gba',
    'responsive',
    'marketing',
  ],
  preview:
    'Professional landing page with hero section, service highlights, and government branding',
  responsive: true,
  accessible: true,
  qatarGBACompliant: true,
  metadata: {
    version: '1.0.0',
    lastUpdated: '2025-09-25',
    complexity: 'intermediate',
    estimatedImplementationTime: '3-4 hours',
    usageNotes:
      'Ideal for government portals, service introductions, and public-facing websites',
    designTokensUsed: [
      'qatar-primary',
      'qatar-secondary',
      'qatar-neutral',
      'typography-scale',
    ],
    dependencies: ['lucide-react', 'clsx'],
  },
  codeSnippets: [
    {
      language: 'react',
      filename: 'LandingLayout.tsx',
      code: `import React from 'react';
import { ArrowRight, Shield, Users, Globe, CheckCircle, Star, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

interface LandingLayoutProps {
  brandLogo?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  features?: Feature[];
  testimonials?: Testimonial[];
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({
  brandLogo,
  heroTitle = "Government Services Made Simple",
  heroSubtitle = "Access all your Qatar government services in one secure, digital platform.",
  ctaText = "Get Started Today",
  onCtaClick,
  features = DEFAULT_FEATURES,
  testimonials = DEFAULT_TESTIMONIALS
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-qatar-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {brandLogo ? (
                <img src={brandLogo} alt="Qatar GBA" className="h-10 w-auto" />
              ) : (
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-qatar-primary-600 mr-3" />
                  <span className="text-xl font-bold text-qatar-neutral-900">Qatar GBA</span>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                Services
              </a>
              <a href="#about" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                Contact
              </a>
              <button className="bg-qatar-primary-600 text-white px-4 py-2 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium">
                Sign In
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-qatar-neutral-600 hover:text-qatar-primary-600 hover:bg-qatar-neutral-100"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-qatar-neutral-200 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#services" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                  Services
                </a>
                <a href="#about" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                  About
                </a>
                <a href="#contact" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                  Contact
                </a>
                <button className="bg-qatar-primary-600 text-white px-4 py-2 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium w-full">
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-qatar-primary-50 to-qatar-primary-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-qatar-neutral-900 mb-6 leading-tight">
                {heroTitle}
              </h1>
              <p className="text-xl text-qatar-neutral-600 mb-8 leading-relaxed">
                {heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={onCtaClick}
                  className="bg-qatar-primary-600 text-white px-8 py-4 rounded-lg hover:bg-qatar-primary-700 transition-colors font-semibold text-lg inline-flex items-center justify-center"
                >
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-qatar-primary-600 text-qatar-primary-600 px-8 py-4 rounded-lg hover:bg-qatar-primary-50 transition-colors font-semibold text-lg">
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-qatar-neutral-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Secure & Trusted
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  24/7 Available
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Multi-language
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-8 border border-qatar-neutral-200">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-qatar-primary-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-qatar-primary-700 mb-1">50K+</div>
                    <div className="text-sm text-qatar-primary-600">Active Users</div>
                  </div>
                  <div className="bg-qatar-primary-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-qatar-primary-700 mb-1">25+</div>
                    <div className="text-sm text-qatar-primary-600">Services</div>
                  </div>
                  <div className="bg-qatar-primary-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-qatar-primary-700 mb-1">99.9%</div>
                    <div className="text-sm text-qatar-primary-600">Uptime</div>
                  </div>
                  <div className="bg-qatar-primary-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-qatar-primary-700 mb-1">4.9★</div>
                    <div className="text-sm text-qatar-primary-600">Rating</div>
                  </div>
                </div>
                <div className="text-center text-qatar-neutral-600">
                  Trusted by thousands of Qatar residents
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-qatar-neutral-900 mb-4">
              Why Choose Qatar GBA?
            </h2>
            <p className="text-xl text-qatar-neutral-600 max-w-3xl mx-auto">
              Experience the future of government services with our comprehensive digital platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white rounded-lg border border-qatar-neutral-200 p-6 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-qatar-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-qatar-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-qatar-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-qatar-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-qatar-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-qatar-neutral-900 mb-4">
              What Our Citizens Say
            </h2>
            <p className="text-xl text-qatar-neutral-600">
              Real feedback from Qatar residents using our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-sm border border-qatar-neutral-200">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={clsx(
                        "h-5 w-5",
                        i < testimonial.rating ? "text-yellow-400 fill-current" : "text-qatar-neutral-300"
                      )}
                    />
                  ))}
                </div>
                <p className="text-qatar-neutral-700 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-qatar-primary-500 flex items-center justify-center mr-3">
                      <span className="text-white font-medium">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-qatar-neutral-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-qatar-neutral-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-qatar-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-qatar-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Qatar residents already using our digital government services
          </p>
          <button
            onClick={onCtaClick}
            className="bg-white text-qatar-primary-600 px-8 py-4 rounded-lg hover:bg-qatar-primary-50 transition-colors font-semibold text-lg inline-flex items-center"
          >
            Create Account Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-qatar-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-qatar-primary-400 mr-2" />
                <span className="font-bold text-lg">Qatar GBA</span>
              </div>
              <p className="text-qatar-neutral-400 text-sm">
                Your trusted partner for all government digital services in Qatar.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-qatar-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Document Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">License Renewal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Visa Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Registration</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-qatar-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-qatar-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-qatar-neutral-800 mt-8 pt-8 text-center text-sm text-qatar-neutral-400">
            <p>&copy; 2025 Qatar Government Business Authority. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const DEFAULT_FEATURES: Feature[] = [
  {
    id: 'security',
    title: 'Bank-Level Security',
    description: 'Your data is protected with the highest security standards used by financial institutions.',
    icon: Shield
  },
  {
    id: 'accessibility',
    title: 'Accessible to All',
    description: 'Designed for everyone, including users with disabilities, following international accessibility guidelines.',
    icon: Users
  },
  {
    id: 'multilingual',
    title: 'Multilingual Support',
    description: 'Available in Arabic and English, making services accessible to all Qatar residents.',
    icon: Globe
  }
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmed Al-Mansoori',
    role: 'Business Owner',
    content: 'The digital transformation has made renewing my business license so much easier. What used to take days now takes minutes.',
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Expatriate Resident',
    content: 'As an expat, navigating government services was challenging. This platform has made everything clear and accessible.',
    rating: 5
  },
  {
    id: '3',
    name: 'Dr. Khalid Al-Thani',
    role: 'Healthcare Professional',
    content: 'The integration between different government services is seamless. Everything I need is in one place.',
    rating: 5
  }
];

export default LandingLayout;`,
    },
    {
      language: 'nextjs',
      filename: 'landing-page.tsx',
      code: `'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Shield, Users, Globe, CheckCircle, Star, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features: Feature[] = [
    {
      id: 'security',
      title: 'Bank-Level Security',
      description: 'Your data is protected with the highest security standards used by financial institutions.',
      icon: Shield
    },
    {
      id: 'accessibility',
      title: 'Accessible to All',
      description: 'Designed for everyone, including users with disabilities, following international accessibility guidelines.',
      icon: Users
    },
    {
      id: 'multilingual',
      title: 'Multilingual Support',
      description: 'Available in Arabic and English, making services accessible to all Qatar residents.',
      icon: Globe
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Ahmed Al-Mansoori',
      role: 'Business Owner',
      content: 'The digital transformation has made renewing my business license so much easier. What used to take days now takes minutes.',
      rating: 5
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Expatriate Resident',
      content: 'As an expat, navigating government services was challenging. This platform has made everything clear and accessible.',
      rating: 5
    },
    {
      id: '3',
      name: 'Dr. Khalid Al-Thani',
      role: 'Healthcare Professional',
      content: 'The integration between different government services is seamless. Everything I need is in one place.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-qatar-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-qatar-primary-600 mr-3" />
                <span className="text-xl font-bold text-qatar-neutral-900">Qatar GBA</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                Services
              </a>
              <a href="#about" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                Contact
              </a>
              <button
                onClick={() => router.push('/login')}
                className="bg-qatar-primary-600 text-white px-4 py-2 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium"
              >
                Sign In
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-qatar-neutral-600 hover:text-qatar-primary-600 hover:bg-qatar-neutral-100"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-qatar-neutral-200 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#services" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                  Services
                </a>
                <a href="#about" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                  About
                </a>
                <a href="#contact" className="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                  Contact
                </a>
                <button
                  onClick={() => router.push('/login')}
                  className="bg-qatar-primary-600 text-white px-4 py-2 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium w-full"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-qatar-primary-50 to-qatar-primary-100 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-qatar-neutral-900 mb-6 leading-tight">
                Government Services Made Simple
              </h1>
              <p className="text-xl text-qatar-neutral-600 mb-8 leading-relaxed">
                Access all your Qatar government services in one secure, digital platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => router.push('/register')}
                  className="bg-qatar-primary-600 text-white px-8 py-4 rounded-lg hover:bg-qatar-primary-700 transition-colors font-semibold text-lg inline-flex items-center justify-center"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-qatar-primary-600 text-qatar-primary-600 px-8 py-4 rounded-lg hover:bg-qatar-primary-50 transition-colors font-semibold text-lg">
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-qatar-neutral-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Secure & Trusted
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  24/7 Available
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Multi-language
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-8 border border-qatar-neutral-200">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-qatar-primary-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-qatar-primary-700 mb-1">50K+</div>
                    <div className="text-sm text-qatar-primary-600">Active Users</div>
                  </div>
                  <div className="bg-qatar-primary-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-qatar-primary-700 mb-1">25+</div>
                    <div className="text-sm text-qatar-primary-600">Services</div>
                  </div>
                  <div className="bg-qatar-primary-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-qatar-primary-700 mb-1">99.9%</div>
                    <div className="text-sm text-qatar-primary-600">Uptime</div>
                  </div>
                  <div className="bg-qatar-primary-100 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-qatar-primary-700 mb-1">4.9★</div>
                    <div className="text-sm text-qatar-primary-600">Rating</div>
                  </div>
                </div>
                <div className="text-center text-qatar-neutral-600">
                  Trusted by thousands of Qatar residents
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-qatar-neutral-900 mb-4">
              Why Choose Qatar GBA?
            </h2>
            <p className="text-xl text-qatar-neutral-600 max-w-3xl mx-auto">
              Experience the future of government services with our comprehensive digital platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white rounded-lg border border-qatar-neutral-200 p-6 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-qatar-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-qatar-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-qatar-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-qatar-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-qatar-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-qatar-neutral-900 mb-4">
              What Our Citizens Say
            </h2>
            <p className="text-xl text-qatar-neutral-600">
              Real feedback from Qatar residents using our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-sm border border-qatar-neutral-200">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={clsx(
                        "h-5 w-5",
                        i < testimonial.rating ? "text-yellow-400 fill-current" : "text-qatar-neutral-300"
                      )}
                    />
                  ))}
                </div>
                <p className="text-qatar-neutral-700 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-qatar-primary-500 flex items-center justify-center mr-3">
                    <span className="text-white font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-qatar-neutral-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-qatar-neutral-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-qatar-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-qatar-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Qatar residents already using our digital government services
          </p>
          <button
            onClick={() => router.push('/register')}
            className="bg-white text-qatar-primary-600 px-8 py-4 rounded-lg hover:bg-qatar-primary-50 transition-colors font-semibold text-lg inline-flex items-center"
          >
            Create Account Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-qatar-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-qatar-primary-400 mr-2" />
                <span className="font-bold text-lg">Qatar GBA</span>
              </div>
              <p className="text-qatar-neutral-400 text-sm">
                Your trusted partner for all government digital services in Qatar.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-qatar-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Document Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">License Renewal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Visa Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Business Registration</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-qatar-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-qatar-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-qatar-neutral-800 mt-8 pt-8 text-center text-sm text-qatar-neutral-400">
            <p>&copy; 2025 Qatar Government Business Authority. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}`,
    },
    {
      language: 'blazor',
      filename: 'LandingPage.razor',
      code: `@page "/"
@inject NavigationManager Navigation

<div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-qatar-neutral-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                    <div class="flex items-center">
                        <svg class="h-8 w-8 text-qatar-primary-600 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                        </svg>
                        <span class="text-xl font-bold text-qatar-neutral-900">Qatar GBA</span>
                    </div>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center space-x-8">
                    <a href="#services" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                        Services
                    </a>
                    <a href="#about" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                        About
                    </a>
                    <a href="#contact" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                        Contact
                    </a>
                    <button @onclick="NavigateToLogin"
                            class="bg-qatar-primary-600 text-white px-4 py-2 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium">
                        Sign In
                    </button>
                </nav>

                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button @onclick="ToggleMobileMenu"
                            class="p-2 rounded-lg text-qatar-neutral-600 hover:text-qatar-primary-600 hover:bg-qatar-neutral-100"
                            aria-label="Toggle mobile menu">
                        @if (MobileMenuOpen)
                        {
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        }
                        else
                        {
                            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="3" y1="6" x2="21" y2="6"/>
                                <line x1="3" y1="12" x2="21" y2="12"/>
                                <line x1="3" y1="18" x2="21" y2="18"/>
                            </svg>
                        }
                    </button>
                </div>
            </div>

            @if (MobileMenuOpen)
            {
                <!-- Mobile Navigation -->
                <div class="md:hidden border-t border-qatar-neutral-200 py-4">
                    <div class="flex flex-col space-y-4">
                        <a href="#services" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                            Services
                        </a>
                        <a href="#about" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                            About
                        </a>
                        <a href="#contact" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                            Contact
                        </a>
                        <button @onclick="NavigateToLogin"
                                class="bg-qatar-primary-600 text-white px-4 py-2 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium w-full">
                            Sign In
                        </button>
                    </div>
                </div>
            }
        </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-qatar-primary-50 to-qatar-primary-100 py-20 lg:py-28">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 class="text-4xl lg:text-6xl font-bold text-qatar-neutral-900 mb-6 leading-tight">
                        Government Services Made Simple
                    </h1>
                    <p class="text-xl text-qatar-neutral-600 mb-8 leading-relaxed">
                        Access all your Qatar government services in one secure, digital platform.
                    </p>

                    <div class="flex flex-col sm:flex-row gap-4 mb-8">
                        <button @onclick="NavigateToRegister"
                                class="bg-qatar-primary-600 text-white px-8 py-4 rounded-lg hover:bg-qatar-primary-700 transition-colors font-semibold text-lg inline-flex items-center justify-center">
                            Get Started Today
                            <svg class="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"/>
                                <polyline points="12,5 19,12 12,19"/>
                            </svg>
                        </button>
                        <button class="border-2 border-qatar-primary-600 text-qatar-primary-600 px-8 py-4 rounded-lg hover:bg-qatar-primary-50 transition-colors font-semibold text-lg">
                            Learn More
                        </button>
                    </div>

                    <div class="flex items-center space-x-6 text-sm text-qatar-neutral-600">
                        <div class="flex items-center">
                            <svg class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22,4 12,14.01 9,11.01"/>
                            </svg>
                            Secure & Trusted
                        </div>
                        <div class="flex items-center">
                            <svg class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22,4 12,14.01 9,11.01"/>
                            </svg>
                            24/7 Available
                        </div>
                        <div class="flex items-center">
                            <svg class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22,4 12,14.01 9,11.01"/>
                            </svg>
                            Multi-language
                        </div>
                    </div>
                </div>

                <div class="relative">
                    <div class="bg-white rounded-lg shadow-2xl p-8 border border-qatar-neutral-200">
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div class="bg-qatar-primary-100 rounded-lg p-4 text-center">
                                <div class="text-2xl font-bold text-qatar-primary-700 mb-1">50K+</div>
                                <div class="text-sm text-qatar-primary-600">Active Users</div>
                            </div>
                            <div class="bg-qatar-primary-100 rounded-lg p-4 text-center">
                                <div class="text-2xl font-bold text-qatar-primary-700 mb-1">25+</div>
                                <div class="text-sm text-qatar-primary-600">Services</div>
                            </div>
                            <div class="bg-qatar-primary-100 rounded-lg p-4 text-center">
                                <div class="text-2xl font-bold text-qatar-primary-700 mb-1">99.9%</div>
                                <div class="text-sm text-qatar-primary-600">Uptime</div>
                            </div>
                            <div class="bg-qatar-primary-100 rounded-lg p-4 text-center">
                                <div class="text-2xl font-bold text-qatar-primary-700 mb-1">4.9★</div>
                                <div class="text-sm text-qatar-primary-600">Rating</div>
                            </div>
                        </div>
                        <div class="text-center text-qatar-neutral-600">
                            Trusted by thousands of Qatar residents
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-qatar-primary-600">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
            </h2>
            <p class="text-xl text-qatar-primary-100 mb-8 max-w-2xl mx-auto">
                Join thousands of Qatar residents already using our digital government services
            </p>
            <button @onclick="NavigateToRegister"
                    class="bg-white text-qatar-primary-600 px-8 py-4 rounded-lg hover:bg-qatar-primary-50 transition-colors font-semibold text-lg inline-flex items-center">
                Create Account Now
                <svg class="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12,5 19,12 12,19"/>
                </svg>
            </button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-qatar-neutral-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center mb-4">
                        <svg class="h-6 w-6 text-qatar-primary-400 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                        </svg>
                        <span class="font-bold text-lg">Qatar GBA</span>
                    </div>
                    <p class="text-qatar-neutral-400 text-sm">
                        Your trusted partner for all government digital services in Qatar.
                    </p>
                </div>

                <div>
                    <h3 class="font-semibold mb-4">Services</h3>
                    <ul class="space-y-2 text-sm text-qatar-neutral-400">
                        <li><a href="#" class="hover:text-white transition-colors">Document Services</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">License Renewal</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Visa Services</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Business Registration</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-semibold mb-4">Support</h3>
                    <ul class="space-y-2 text-sm text-qatar-neutral-400">
                        <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">System Status</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-semibold mb-4">Legal</h3>
                    <ul class="space-y-2 text-sm text-qatar-neutral-400">
                        <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Accessibility</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Security</a></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-qatar-neutral-800 mt-8 pt-8 text-center text-sm text-qatar-neutral-400">
                <p>&copy; 2025 Qatar Government Business Authority. All rights reserved.</p>
            </div>
        </div>
    </footer>
</div>

@code {
    private bool MobileMenuOpen = false;

    private void ToggleMobileMenu()
    {
        MobileMenuOpen = !MobileMenuOpen;
    }

    private void NavigateToLogin()
    {
        Navigation.NavigateTo("/login");
    }

    private void NavigateToRegister()
    {
        Navigation.NavigateTo("/register");
    }
}`,
    },
    {
      language: 'html',
      filename: 'landing.html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qatar GBA - Government Services</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'qatar-primary': {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            200: '#fbcfe8',
                            300: '#f9a8d4',
                            400: '#f472b6',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d',
                            800: '#9d174d',
                            900: '#831843'
                        },
                        'qatar-neutral': {
                            50: '#f8fafc',
                            100: '#f1f5f9',
                            200: '#e2e8f0',
                            300: '#cbd5e1',
                            400: '#94a3b8',
                            500: '#64748b',
                            600: '#475569',
                            700: '#334155',
                            800: '#1e293b',
                            900: '#0f172a'
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="min-h-screen bg-white">
    <div class="min-h-screen bg-white">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b border-qatar-neutral-200 sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex items-center">
                            <svg class="h-8 w-8 text-qatar-primary-600 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                            </svg>
                            <span class="text-xl font-bold text-qatar-neutral-900">Qatar GBA</span>
                        </div>
                    </div>

                    <!-- Desktop Navigation -->
                    <nav class="hidden md:flex items-center space-x-8">
                        <a href="#services" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                            Services
                        </a>
                        <a href="#about" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                            About
                        </a>
                        <a href="#contact" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium transition-colors">
                            Contact
                        </a>
                        <button onclick="window.location.href='login.html'"
                                class="bg-qatar-primary-600 text-white px-4 py-2 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium">
                            Sign In
                        </button>
                    </nav>

                    <!-- Mobile menu button -->
                    <div class="md:hidden">
                        <button id="mobile-menu-button"
                                class="p-2 rounded-lg text-qatar-neutral-600 hover:text-qatar-primary-600 hover:bg-qatar-neutral-100"
                                aria-label="Toggle mobile menu">
                            <svg id="menu-icon" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="3" y1="6" x2="21" y2="6"/>
                                <line x1="3" y1="12" x2="21" y2="12"/>
                                <line x1="3" y1="18" x2="21" y2="18"/>
                            </svg>
                            <svg id="close-icon" class="h-6 w-6 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Mobile Navigation -->
                <div id="mobile-menu" class="md:hidden border-t border-qatar-neutral-200 py-4 hidden">
                    <div class="flex flex-col space-y-4">
                        <a href="#services" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                            Services
                        </a>
                        <a href="#about" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                            About
                        </a>
                        <a href="#contact" class="text-qatar-neutral-600 hover:text-qatar-primary-600 font-medium">
                            Contact
                        </a>
                        <button onclick="window.location.href='login.html'"
                                class="bg-qatar-primary-600 text-white px-4 py-2 rounded-lg hover:bg-qatar-primary-700 transition-colors font-medium w-full">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="bg-gradient-to-br from-qatar-primary-50 to-qatar-primary-100 py-20 lg:py-28">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 class="text-4xl lg:text-6xl font-bold text-qatar-neutral-900 mb-6 leading-tight">
                            Government Services Made Simple
                        </h1>
                        <p class="text-xl text-qatar-neutral-600 mb-8 leading-relaxed">
                            Access all your Qatar government services in one secure, digital platform.
                        </p>

                        <div class="flex flex-col sm:flex-row gap-4 mb-8">
                            <button onclick="window.location.href='register.html'"
                                    class="bg-qatar-primary-600 text-white px-8 py-4 rounded-lg hover:bg-qatar-primary-700 transition-colors font-semibold text-lg inline-flex items-center justify-center">
                                Get Started Today
                                <svg class="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                    <polyline points="12,5 19,12 12,19"/>
                                </svg>
                            </button>
                            <button class="border-2 border-qatar-primary-600 text-qatar-primary-600 px-8 py-4 rounded-lg hover:bg-qatar-primary-50 transition-colors font-semibold text-lg">
                                Learn More
                            </button>
                        </div>

                        <div class="flex items-center space-x-6 text-sm text-qatar-neutral-600">
                            <div class="flex items-center">
                                <svg class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22,4 12,14.01 9,11.01"/>
                                </svg>
                                Secure & Trusted
                            </div>
                            <div class="flex items-center">
                                <svg class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22,4 12,14.01 9,11.01"/>
                                </svg>
                                24/7 Available
                            </div>
                            <div class="flex items-center">
                                <svg class="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22,4 12,14.01 9,11.01"/>
                                </svg>
                                Multi-language
                            </div>
                        </div>
                    </div>

                    <div class="relative">
                        <div class="bg-white rounded-lg shadow-2xl p-8 border border-qatar-neutral-200">
                            <div class="grid grid-cols-2 gap-4 mb-6">
                                <div class="bg-qatar-primary-100 rounded-lg p-4 text-center">
                                    <div class="text-2xl font-bold text-qatar-primary-700 mb-1">50K+</div>
                                    <div class="text-sm text-qatar-primary-600">Active Users</div>
                                </div>
                                <div class="bg-qatar-primary-100 rounded-lg p-4 text-center">
                                    <div class="text-2xl font-bold text-qatar-primary-700 mb-1">25+</div>
                                    <div class="text-sm text-qatar-primary-600">Services</div>
                                </div>
                                <div class="bg-qatar-primary-100 rounded-lg p-4 text-center">
                                    <div class="text-2xl font-bold text-qatar-primary-700 mb-1">99.9%</div>
                                    <div class="text-sm text-qatar-primary-600">Uptime</div>
                                </div>
                                <div class="bg-qatar-primary-100 rounded-lg p-4 text-center">
                                    <div class="text-2xl font-bold text-qatar-primary-700 mb-1">4.9★</div>
                                    <div class="text-sm text-qatar-primary-600">Rating</div>
                                </div>
                            </div>
                            <div class="text-center text-qatar-neutral-600">
                                Trusted by thousands of Qatar residents
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-qatar-primary-600">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Ready to Get Started?
                </h2>
                <p class="text-xl text-qatar-primary-100 mb-8 max-w-2xl mx-auto">
                    Join thousands of Qatar residents already using our digital government services
                </p>
                <button onclick="window.location.href='register.html'"
                        class="bg-white text-qatar-primary-600 px-8 py-4 rounded-lg hover:bg-qatar-primary-50 transition-colors font-semibold text-lg inline-flex items-center">
                    Create Account Now
                    <svg class="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12,5 19,12 12,19"/>
                    </svg>
                </button>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-qatar-neutral-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div class="flex items-center mb-4">
                            <svg class="h-6 w-6 text-qatar-primary-400 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                            </svg>
                            <span class="font-bold text-lg">Qatar GBA</span>
                        </div>
                        <p class="text-qatar-neutral-400 text-sm">
                            Your trusted partner for all government digital services in Qatar.
                        </p>
                    </div>

                    <div>
                        <h3 class="font-semibold mb-4">Services</h3>
                        <ul class="space-y-2 text-sm text-qatar-neutral-400">
                            <li><a href="#" class="hover:text-white transition-colors">Document Services</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">License Renewal</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Visa Services</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Business Registration</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-semibold mb-4">Support</h3>
                        <ul class="space-y-2 text-sm text-qatar-neutral-400">
                            <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">System Status</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="font-semibold mb-4">Legal</h3>
                        <ul class="space-y-2 text-sm text-qatar-neutral-400">
                            <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Accessibility</a></li>
                            <li><a href="#" class="hover:text-white transition-colors">Security</a></li>
                        </ul>
                    </div>
                </div>

                <div class="border-t border-qatar-neutral-800 mt-8 pt-8 text-center text-sm text-qatar-neutral-400">
                    <p>&copy; 2025 Qatar Government Business Authority. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuIcon = document.getElementById('menu-icon');
            const closeIcon = document.getElementById('close-icon');

            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
                menuIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // Close mobile menu if open
                        mobileMenu.classList.add('hidden');
                        menuIcon.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                    }
                });
            });
        });
    </script>
</body>
</html>`,
    },
    {
      language: 'typescript',
      filename: 'landing-types.ts',
      code: `export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
  featured?: boolean;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  description?: string;
}

export interface LandingLayoutProps {
  brandLogo?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  features?: Feature[];
  testimonials?: Testimonial[];
  statistics?: Statistic[];
  showHeader?: boolean;
  showFooter?: boolean;
  theme?: 'light' | 'dark';
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
  }[];
}

export interface LandingPageConfig {
  branding: {
    name: string;
    logo?: string;
    tagline?: string;
  };
  hero: {
    title: string;
    subtitle: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta?: {
      text: string;
      href: string;
    };
  };
  navigation: NavigationItem[];
  features: Feature[];
  testimonials: Testimonial[];
  statistics: Statistic[];
  footer: {
    sections: FooterSection[];
    copyright: string;
    socialLinks?: {
      platform: string;
      href: string;
      icon: React.ComponentType<{ className?: string }>;
    }[];
  };
}

export const QATAR_GBA_LANDING_CONFIG: LandingPageConfig = {
  branding: {
    name: "Qatar GBA",
    tagline: "Government Services Made Simple"
  },
  hero: {
    title: "Government Services Made Simple",
    subtitle: "Access all your Qatar government services in one secure, digital platform.",
    primaryCta: {
      text: "Get Started Today",
      href: "/register"
    },
    secondaryCta: {
      text: "Learn More",
      href: "/about"
    }
  },
  navigation: [
    { id: "services", label: "Services", href: "#services" },
    { id: "about", label: "About", href: "#about" },
    { id: "contact", label: "Contact", href: "#contact" }
  ],
  features: [],
  testimonials: [],
  statistics: [
    { id: "users", value: "50K+", label: "Active Users" },
    { id: "services", value: "25+", label: "Services" },
    { id: "uptime", value: "99.9%", label: "Uptime" },
    { id: "rating", value: "4.9★", label: "Rating" }
  ],
  footer: {
    sections: [
      {
        title: "Services",
        links: [
          { label: "Document Services", href: "/services/documents" },
          { label: "License Renewal", href: "/services/licenses" },
          { label: "Visa Services", href: "/services/visas" },
          { label: "Business Registration", href: "/services/business" }
        ]
      },
      {
        title: "Support",
        links: [
          { label: "Help Center", href: "/support" },
          { label: "Contact Us", href: "/contact" },
          { label: "FAQ", href: "/faq" },
          { label: "System Status", href: "/status" }
        ]
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Accessibility", href: "/accessibility" },
          { label: "Security", href: "/security" }
        ]
      }
    ],
    copyright: "2025 Qatar Government Business Authority. All rights reserved."
  }
}`,
    },
  ],
};
