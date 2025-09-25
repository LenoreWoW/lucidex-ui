import { Template } from '@/types/templates';

export const dashboardLayoutTemplate: Template = {
  id: 'dashboard-layout-01',
  name: 'Qatar GBA Dashboard Layout',
  description:
    'A comprehensive dashboard layout with sidebar navigation, header, and main content area following Qatar GBA design principles',
  category: 'dashboard',
  tags: [
    'dashboard',
    'layout',
    'sidebar',
    'navigation',
    'qatar-gba',
    'responsive',
  ],
  preview:
    'A modern dashboard with sidebar navigation, top header, and grid-based content area',
  responsive: true,
  accessible: true,
  qatarGBACompliant: true,
  metadata: {
    version: '1.0.0',
    lastUpdated: '2025-09-25',
    complexity: 'intermediate',
    estimatedImplementationTime: '2-3 hours',
    usageNotes:
      'Perfect for admin panels, analytics dashboards, and data management interfaces',
    designTokensUsed: [
      'qatar-primary',
      'qatar-neutral',
      'spacing-scale',
      'typography-system',
    ],
    dependencies: ['lucide-react', 'clsx'],
  },
  codeSnippets: [
    {
      language: 'react',
      filename: 'DashboardLayout.tsx',
      code: `import React from 'react';
import { LayoutGrid, Bell, Search, User, Menu, Home, BarChart3, Settings, Users } from 'lucide-react';
import { clsx } from 'clsx';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarCollapsed = false,
  onSidebarToggle
}) => {
  return (
    <div className="min-h-screen bg-qatar-neutral-50">
      {/* Sidebar */}
      <aside className={clsx(
        "fixed left-0 top-0 z-40 h-screen transition-transform duration-300 ease-in-out",
        "bg-qatar-primary-900 text-white shadow-xl",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="p-4 border-b border-qatar-primary-800">
          <div className="flex items-center">
            <LayoutGrid className="h-8 w-8 text-qatar-primary-200" />
            {!sidebarCollapsed && (
              <span className="ml-3 text-xl font-bold text-white">Qatar GBA</span>
            )}
          </div>
        </div>

        <nav className="mt-6">
          <ul className="space-y-2 px-3">
            {[
              { icon: Home, label: 'Dashboard', active: true },
              { icon: BarChart3, label: 'Analytics' },
              { icon: Users, label: 'Users' },
              { icon: Settings, label: 'Settings' }
            ].map(({ icon: Icon, label, active }) => (
              <li key={label}>
                <a
                  href="#"
                  className={clsx(
                    "flex items-center px-3 py-2 rounded-lg transition-colors duration-200",
                    active
                      ? "bg-qatar-primary-700 text-white"
                      : "text-qatar-primary-200 hover:bg-qatar-primary-800 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {!sidebarCollapsed && (
                    <span className="ml-3 font-medium">{label}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={clsx(
        "transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        {/* Header */}
        <header className="bg-white border-b border-qatar-neutral-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={onSidebarToggle}
                className="p-2 rounded-lg hover:bg-qatar-neutral-100 transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5 text-qatar-neutral-600" />
              </button>
              <h1 className="ml-4 text-2xl font-bold text-qatar-neutral-900">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-qatar-neutral-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-qatar-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 text-qatar-neutral-600 hover:text-qatar-primary-600 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-qatar-error rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-qatar-neutral-900">John Doe</div>
                  <div className="text-xs text-qatar-neutral-500">Administrator</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-qatar-primary-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;`,
    },
    {
      language: 'nextjs',
      filename: 'dashboard-layout.tsx',
      code: `'use client';

import { useState } from 'react';
import { LayoutGrid, Bell, Search, User, Menu, Home, BarChart3, Settings, Users } from 'lucide-react';
import { clsx } from 'clsx';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-qatar-neutral-50">
      {/* Sidebar */}
      <aside className={clsx(
        "fixed left-0 top-0 z-40 h-screen transition-transform duration-300 ease-in-out",
        "bg-qatar-primary-900 text-white shadow-xl",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="p-4 border-b border-qatar-primary-800">
          <div className="flex items-center">
            <LayoutGrid className="h-8 w-8 text-qatar-primary-200" />
            {!sidebarCollapsed && (
              <span className="ml-3 text-xl font-bold text-white">Qatar GBA</span>
            )}
          </div>
        </div>

        <nav className="mt-6">
          <ul className="space-y-2 px-3">
            {[
              { icon: Home, label: 'Dashboard', active: true },
              { icon: BarChart3, label: 'Analytics' },
              { icon: Users, label: 'Users' },
              { icon: Settings, label: 'Settings' }
            ].map(({ icon: Icon, label, active }) => (
              <li key={label}>
                <button
                  className={clsx(
                    "w-full flex items-center px-3 py-2 rounded-lg transition-colors duration-200 text-left",
                    active
                      ? "bg-qatar-primary-700 text-white"
                      : "text-qatar-primary-200 hover:bg-qatar-primary-800 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {!sidebarCollapsed && (
                    <span className="ml-3 font-medium">{label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={clsx(
        "transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        {/* Header */}
        <header className="bg-white border-b border-qatar-neutral-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-qatar-neutral-100 transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5 text-qatar-neutral-600" />
              </button>
              <h1 className="ml-4 text-2xl font-bold text-qatar-neutral-900">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-qatar-neutral-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-qatar-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 text-qatar-neutral-600 hover:text-qatar-primary-600 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-qatar-neutral-900">John Doe</div>
                  <div className="text-xs text-qatar-neutral-500">Administrator</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-qatar-primary-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}`,
    },
    {
      language: 'blazor',
      filename: 'DashboardLayout.razor',
      code: `@using Microsoft.AspNetCore.Components
@inject IJSRuntime JSRuntime

<div class="min-h-screen bg-qatar-neutral-50">
    <!-- Sidebar -->
    <aside class="@SidebarClasses">
        <div class="p-4 border-b border-qatar-primary-800">
            <div class="flex items-center">
                <div class="h-8 w-8 text-qatar-primary-200">
                    <!-- Layout Grid Icon -->
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
                    </svg>
                </div>
                @if (!SidebarCollapsed)
                {
                    <span class="ml-3 text-xl font-bold text-white">Qatar GBA</span>
                }
            </div>
        </div>

        <nav class="mt-6">
            <ul class="space-y-2 px-3">
                @foreach (var item in NavigationItems)
                {
                    <li>
                        <button @onclick="() => NavigateTo(item.Route)"
                                class="@GetNavItemClasses(item.IsActive)">
                            <div class="h-5 w-5">
                                @((MarkupString)item.IconSvg)
                            </div>
                            @if (!SidebarCollapsed)
                            {
                                <span class="ml-3 font-medium">@item.Label</span>
                            }
                        </button>
                    </li>
                }
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <div class="@MainContentClasses">
        <!-- Header -->
        <header class="bg-white border-b border-qatar-neutral-200 shadow-sm">
            <div class="flex items-center justify-between px-6 py-4">
                <div class="flex items-center">
                    <button @onclick="ToggleSidebar"
                            class="p-2 rounded-lg hover:bg-qatar-neutral-100 transition-colors"
                            aria-label="Toggle sidebar">
                        <!-- Menu Icon -->
                        <svg class="h-5 w-5 text-qatar-neutral-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <h1 class="ml-4 text-2xl font-bold text-qatar-neutral-900">
                        Dashboard
                    </h1>
                </div>

                <div class="flex items-center space-x-4">
                    <div class="relative">
                        <!-- Search Icon -->
                        <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-qatar-neutral-400"
                             viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                            <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <input type="search" placeholder="Search..."
                               class="w-64 pl-10 pr-4 py-2 border border-qatar-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent" />
                    </div>
                    <button class="p-2 text-qatar-neutral-600 hover:text-qatar-primary-600 transition-colors relative">
                        <!-- Bell Icon -->
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                        </svg>
                        <span class="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                    </button>
                    <div class="flex items-center space-x-3">
                        <div class="text-right">
                            <div class="text-sm font-medium text-qatar-neutral-900">@UserName</div>
                            <div class="text-xs text-qatar-neutral-500">@UserRole</div>
                        </div>
                        <div class="h-10 w-10 rounded-full bg-qatar-primary-500 flex items-center justify-center">
                            <!-- User Icon -->
                            <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content Area -->
        <main class="p-6">
            @ChildContent
        </main>
    </div>
</div>

@code {
    [Parameter] public RenderFragment? ChildContent { get; set; }
    [Parameter] public string UserName { get; set; } = "John Doe";
    [Parameter] public string UserRole { get; set; } = "Administrator";

    private bool SidebarCollapsed { get; set; } = false;

    private List<NavigationItem> NavigationItems = new()
    {
        new() { Label = "Dashboard", Route = "/dashboard", IsActive = true, IconSvg = "<path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/>" },
        new() { Label = "Analytics", Route = "/analytics", IconSvg = "<path d='M18 20V10M12 20V4M6 20v-6'/>" },
        new() { Label = "Users", Route = "/users", IconSvg = "<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/><circle cx='12' cy='7' r='4'/>" },
        new() { Label = "Settings", Route = "/settings", IconSvg = "<circle cx='12' cy='12' r='3'/><path d='m12 1 3 6 6 3-6 3-3 6-3-6-6-3 6-3z'/>" }
    };

    private string SidebarClasses =>
        $"fixed left-0 top-0 z-40 h-screen transition-transform duration-300 ease-in-out bg-qatar-primary-900 text-white shadow-xl {(SidebarCollapsed ? "w-16" : "w-64")}";

    private string MainContentClasses =>
        $"transition-all duration-300 ease-in-out {(SidebarCollapsed ? "ml-16" : "ml-64")}";

    private string GetNavItemClasses(bool isActive) =>
        $"w-full flex items-center px-3 py-2 rounded-lg transition-colors duration-200 text-left {(isActive ? "bg-qatar-primary-700 text-white" : "text-qatar-primary-200 hover:bg-qatar-primary-800 hover:text-white")}";

    private void ToggleSidebar()
    {
        SidebarCollapsed = !SidebarCollapsed;
    }

    private void NavigateTo(string route)
    {
        // Update active state
        foreach (var item in NavigationItems)
        {
            item.IsActive = item.Route == route;
        }
    }

    public class NavigationItem
    {
        public string Label { get; set; } = string.Empty;
        public string Route { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string IconSvg { get; set; } = string.Empty;
    }
}`,
    },
    {
      language: 'html',
      filename: 'dashboard-layout.html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qatar GBA Dashboard</title>
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
<body class="min-h-screen bg-qatar-neutral-50">
    <div class="dashboard-container">
        <!-- Sidebar -->
        <aside id="sidebar" class="fixed left-0 top-0 z-40 h-screen w-64 transition-transform duration-300 ease-in-out bg-qatar-primary-900 text-white shadow-xl">
            <div class="p-4 border-b border-qatar-primary-800">
                <div class="flex items-center">
                    <svg class="h-8 w-8 text-qatar-primary-200" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
                    </svg>
                    <span id="sidebar-title" class="ml-3 text-xl font-bold text-white">Qatar GBA</span>
                </div>
            </div>

            <nav class="mt-6">
                <ul class="space-y-2 px-3">
                    <li>
                        <a href="#" class="flex items-center px-3 py-2 rounded-lg bg-qatar-primary-700 text-white">
                            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            </svg>
                            <span class="sidebar-text ml-3 font-medium">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center px-3 py-2 rounded-lg text-qatar-primary-200 hover:bg-qatar-primary-800 hover:text-white transition-colors duration-200">
                            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 20V10M12 20V4M6 20v-6"/>
                            </svg>
                            <span class="sidebar-text ml-3 font-medium">Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center px-3 py-2 rounded-lg text-qatar-primary-200 hover:bg-qatar-primary-800 hover:text-white transition-colors duration-200">
                            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            <span class="sidebar-text ml-3 font-medium">Users</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center px-3 py-2 rounded-lg text-qatar-primary-200 hover:bg-qatar-primary-800 hover:text-white transition-colors duration-200">
                            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="m12 1 3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                            </svg>
                            <span class="sidebar-text ml-3 font-medium">Settings</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content -->
        <div id="main-content" class="ml-64 transition-all duration-300 ease-in-out">
            <!-- Header -->
            <header class="bg-white border-b border-qatar-neutral-200 shadow-sm">
                <div class="flex items-center justify-between px-6 py-4">
                    <div class="flex items-center">
                        <button id="sidebar-toggle" class="p-2 rounded-lg hover:bg-qatar-neutral-100 transition-colors" aria-label="Toggle sidebar">
                            <svg class="h-5 w-5 text-qatar-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="3" y1="6" x2="21" y2="6"/>
                                <line x1="3" y1="12" x2="21" y2="12"/>
                                <line x1="3" y1="18" x2="21" y2="18"/>
                            </svg>
                        </button>
                        <h1 class="ml-4 text-2xl font-bold text-qatar-neutral-900">Dashboard</h1>
                    </div>

                    <div class="flex items-center space-x-4">
                        <div class="relative">
                            <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-qatar-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.35-4.35"/>
                            </svg>
                            <input type="search" placeholder="Search..." class="w-64 pl-10 pr-4 py-2 border border-qatar-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent">
                        </div>
                        <button class="p-2 text-qatar-neutral-600 hover:text-qatar-primary-600 transition-colors relative">
                            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                            </svg>
                            <span class="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                        </button>
                        <div class="flex items-center space-x-3">
                            <div class="text-right">
                                <div class="text-sm font-medium text-qatar-neutral-900">John Doe</div>
                                <div class="text-xs text-qatar-neutral-500">Administrator</div>
                            </div>
                            <div class="h-10 w-10 rounded-full bg-qatar-primary-500 flex items-center justify-center">
                                <svg class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Content Area -->
            <main class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow-sm border border-qatar-neutral-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-qatar-neutral-600">Total Users</p>
                                <p class="text-2xl font-bold text-qatar-neutral-900">1,234</p>
                            </div>
                            <div class="h-12 w-12 bg-qatar-primary-100 rounded-lg flex items-center justify-center">
                                <svg class="h-6 w-6 text-qatar-primary-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <!-- More cards... -->
                </div>

                <div class="bg-white rounded-lg shadow-sm border border-qatar-neutral-200 p-6">
                    <h2 class="text-lg font-semibold text-qatar-neutral-900 mb-4">Recent Activity</h2>
                    <div class="space-y-4">
                        <div class="flex items-center space-x-4">
                            <div class="h-10 w-10 bg-qatar-primary-100 rounded-full flex items-center justify-center">
                                <span class="text-sm font-medium text-qatar-primary-600">JD</span>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-qatar-neutral-900">John Doe updated user profile</p>
                                <p class="text-xs text-qatar-neutral-500">2 minutes ago</p>
                            </div>
                        </div>
                        <!-- More activity items... -->
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const sidebarToggle = document.getElementById('sidebar-toggle');
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('main-content');
            const sidebarTexts = document.querySelectorAll('.sidebar-text');
            const sidebarTitle = document.getElementById('sidebar-title');

            let sidebarCollapsed = false;

            sidebarToggle.addEventListener('click', function() {
                sidebarCollapsed = !sidebarCollapsed;

                if (sidebarCollapsed) {
                    sidebar.classList.remove('w-64');
                    sidebar.classList.add('w-16');
                    mainContent.classList.remove('ml-64');
                    mainContent.classList.add('ml-16');
                    sidebarTitle.style.display = 'none';
                    sidebarTexts.forEach(text => text.style.display = 'none');
                } else {
                    sidebar.classList.remove('w-16');
                    sidebar.classList.add('w-64');
                    mainContent.classList.remove('ml-16');
                    mainContent.classList.add('ml-64');
                    sidebarTitle.style.display = 'block';
                    sidebarTexts.forEach(text => text.style.display = 'block');
                }
            });
        });
    </script>
</body>
</html>`,
    },
    {
      language: 'typescript',
      filename: 'dashboard-layout-types.ts',
      code: `export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  user?: UserInfo;
  navigationItems?: NavigationItem[];
}

export interface UserInfo {
  name: string;
  role: string;
  avatar?: string;
  email?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  active?: boolean;
  badge?: string | number;
  children?: NavigationItem[];
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  action: string;
  timestamp: Date;
  type: 'user' | 'system' | 'admin';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'warning' | 'error' | 'success';
}

// Qatar GBA Design System Types
export interface QatarGBATheme {
  colors: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  typography: {
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    fontWeights: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
}`,
    },
  ],
};
