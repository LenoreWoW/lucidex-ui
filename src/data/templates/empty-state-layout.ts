import { Template } from '@/types/templates';

export const emptyStateLayoutTemplate: Template = {
  id: 'empty-state-layout-01',
  name: 'Qatar GBA Empty State',
  description:
    'Clean and informative empty state layouts for various scenarios with clear call-to-actions',
  category: 'empty-state',
  tags: [
    'empty-state',
    'no-data',
    'illustration',
    'qatar-gba',
    'responsive',
    'helpful',
  ],
  preview:
    'Professional empty states with illustrations and helpful guidance for users',
  responsive: true,
  accessible: true,
  qatarGBACompliant: true,
  metadata: {
    version: '1.0.0',
    lastUpdated: '2025-09-25',
    complexity: 'simple',
    estimatedImplementationTime: '1 hour',
    usageNotes:
      'Perfect for data tables, search results, user dashboards, and content areas',
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
      filename: 'EmptyStateLayout.tsx',
      code: `import React from 'react';
import {
  FileText,
  Search,
  Users,
  Plus,
  RefreshCw,
  Upload,
  Inbox,
  Database,
  Filter,
  ArrowRight
} from 'lucide-react';
import { clsx } from 'clsx';

export type EmptyStateVariant =
  | 'no-data'
  | 'no-search-results'
  | 'no-content'
  | 'no-files'
  | 'no-users'
  | 'error'
  | 'loading';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ComponentType<{ className?: string }>;
}

interface EmptyStateLayoutProps {
  variant: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  illustration?: string;
  actions?: EmptyStateAction[];
  showAnimation?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EmptyStateLayout: React.FC<EmptyStateLayoutProps> = ({
  variant,
  title,
  description,
  icon: CustomIcon,
  illustration,
  actions = [],
  showAnimation = true,
  size = 'md',
  className
}) => {
  const config = getEmptyStateConfig(variant);
  const Icon = CustomIcon || config.icon;
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;

  const sizeClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16'
  };

  const iconSizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20'
  };

  return (
    <div className={clsx(
      'flex flex-col items-center justify-center text-center',
      sizeClasses[size],
      className
    )}>
      {/* Illustration or Icon */}
      <div className="mb-6">
        {illustration ? (
          <img
            src={illustration}
            alt={finalTitle}
            className="h-48 w-48 mx-auto object-contain"
          />
        ) : (
          <div className={clsx(
            'rounded-full bg-qatar-neutral-100 flex items-center justify-center mx-auto',
            iconSizeClasses[size],
            showAnimation && 'animate-pulse'
          )}>
            <Icon className={clsx(
              'text-qatar-neutral-400',
              size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'
            )} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto mb-8">
        <h3 className={clsx(
          'font-semibold text-qatar-neutral-900 mb-2',
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
        )}>
          {finalTitle}
        </h3>
        <p className="text-qatar-neutral-600 leading-relaxed">
          {finalDescription}
        </p>
      </div>

      {/* Actions */}
      {actions.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={clsx(
                'px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center',
                action.variant === 'secondary'
                  ? 'border-2 border-qatar-primary-600 text-qatar-primary-600 hover:bg-qatar-primary-50'
                  : 'bg-qatar-primary-600 text-white hover:bg-qatar-primary-700'
              )}
            >
              {action.icon && (
                <action.icon className="h-5 w-5 mr-2" />
              )}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Pre-configured empty state variants
const getEmptyStateConfig = (variant: EmptyStateVariant) => {
  const configs = {
    'no-data': {
      icon: Database,
      title: 'No Data Available',
      description: 'There is no data to display at the moment. Try refreshing or check back later.'
    },
    'no-search-results': {
      icon: Search,
      title: 'No Results Found',
      description: 'We couldn\'t find anything matching your search. Try adjusting your search terms or filters.'
    },
    'no-content': {
      icon: FileText,
      title: 'No Content Yet',
      description: 'This area is empty. Start by creating your first item to see it appear here.'
    },
    'no-files': {
      icon: Inbox,
      title: 'No Files Uploaded',
      description: 'Upload your first document to get started. Drag and drop files or click to browse.'
    },
    'no-users': {
      icon: Users,
      title: 'No Users Found',
      description: 'There are no users in this list yet. Invite team members to collaborate.'
    },
    'error': {
      icon: RefreshCw,
      title: 'Something Went Wrong',
      description: 'We encountered an error loading this content. Please try again or contact support if the problem persists.'
    },
    'loading': {
      icon: RefreshCw,
      title: 'Loading...',
      description: 'Please wait while we load your content.'
    }
  };

  return configs[variant];
};

// Common empty state variants as separate components
export const NoDataEmptyState: React.FC<Omit<EmptyStateLayoutProps, 'variant'>> = (props) => (
  <EmptyStateLayout variant="no-data" {...props} />
);

export const NoSearchResultsEmptyState: React.FC<Omit<EmptyStateLayoutProps, 'variant'> & { searchQuery?: string }> = ({
  searchQuery,
  ...props
}) => (
  <EmptyStateLayout
    variant="no-search-results"
    description={searchQuery ? \`No results found for "\${searchQuery}". Try different keywords or clear your filters.\` : undefined}
    {...props}
  />
);

export const NoContentEmptyState: React.FC<Omit<EmptyStateLayoutProps, 'variant'>> = (props) => (
  <EmptyStateLayout variant="no-content" {...props} />
);

export const NoFilesEmptyState: React.FC<Omit<EmptyStateLayoutProps, 'variant'>> = (props) => (
  <EmptyStateLayout
    variant="no-files"
    actions={[
      {
        label: 'Upload Files',
        onClick: props.actions?.[0]?.onClick || (() => {}),
        icon: Upload
      }
    ]}
    {...props}
  />
);

export const NoUsersEmptyState: React.FC<Omit<EmptyStateLayoutProps, 'variant'>> = (props) => (
  <EmptyStateLayout
    variant="no-users"
    actions={[
      {
        label: 'Invite Users',
        onClick: props.actions?.[0]?.onClick || (() => {}),
        icon: Plus
      }
    ]}
    {...props}
  />
);

export const ErrorEmptyState: React.FC<Omit<EmptyStateLayoutProps, 'variant'>> = (props) => (
  <EmptyStateLayout
    variant="error"
    actions={[
      {
        label: 'Try Again',
        onClick: props.actions?.[0]?.onClick || (() => {}),
        icon: RefreshCw
      }
    ]}
    {...props}
  />
);

export default EmptyStateLayout;`,
    },
    {
      language: 'nextjs',
      filename: 'empty-state.tsx',
      code: `'use client';

import {
  FileText,
  Search,
  Users,
  Plus,
  RefreshCw,
  Upload,
  Inbox,
  Database,
  Filter,
  ArrowRight
} from 'lucide-react';
import { clsx } from 'clsx';

export type EmptyStateVariant =
  | 'no-data'
  | 'no-search-results'
  | 'no-content'
  | 'no-files'
  | 'no-users'
  | 'error'
  | 'loading';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ComponentType<{ className?: string }>;
}

interface EmptyStateProps {
  variant: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  illustration?: string;
  actions?: EmptyStateAction[];
  showAnimation?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getEmptyStateConfig = (variant: EmptyStateVariant) => {
  const configs = {
    'no-data': {
      icon: Database,
      title: 'No Data Available',
      description: 'There is no data to display at the moment. Try refreshing or check back later.'
    },
    'no-search-results': {
      icon: Search,
      title: 'No Results Found',
      description: 'We couldn\'t find anything matching your search. Try adjusting your search terms or filters.'
    },
    'no-content': {
      icon: FileText,
      title: 'No Content Yet',
      description: 'This area is empty. Start by creating your first item to see it appear here.'
    },
    'no-files': {
      icon: Inbox,
      title: 'No Files Uploaded',
      description: 'Upload your first document to get started. Drag and drop files or click to browse.'
    },
    'no-users': {
      icon: Users,
      title: 'No Users Found',
      description: 'There are no users in this list yet. Invite team members to collaborate.'
    },
    'error': {
      icon: RefreshCw,
      title: 'Something Went Wrong',
      description: 'We encountered an error loading this content. Please try again or contact support if the problem persists.'
    },
    'loading': {
      icon: RefreshCw,
      title: 'Loading...',
      description: 'Please wait while we load your content.'
    }
  };

  return configs[variant];
};

export default function EmptyState({
  variant,
  title,
  description,
  icon: CustomIcon,
  illustration,
  actions = [],
  showAnimation = true,
  size = 'md',
  className
}: EmptyStateProps) {
  const config = getEmptyStateConfig(variant);
  const Icon = CustomIcon || config.icon;
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;

  const sizeClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16'
  };

  const iconSizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20'
  };

  return (
    <div className={clsx(
      'flex flex-col items-center justify-center text-center',
      sizeClasses[size],
      className
    )}>
      {/* Illustration or Icon */}
      <div className="mb-6">
        {illustration ? (
          <img
            src={illustration}
            alt={finalTitle}
            className="h-48 w-48 mx-auto object-contain"
          />
        ) : (
          <div className={clsx(
            'rounded-full bg-qatar-neutral-100 flex items-center justify-center mx-auto',
            iconSizeClasses[size],
            showAnimation && 'animate-pulse'
          )}>
            <Icon className={clsx(
              'text-qatar-neutral-400',
              size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'
            )} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto mb-8">
        <h3 className={clsx(
          'font-semibold text-qatar-neutral-900 mb-2',
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
        )}>
          {finalTitle}
        </h3>
        <p className="text-qatar-neutral-600 leading-relaxed">
          {finalDescription}
        </p>
      </div>

      {/* Actions */}
      {actions.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={clsx(
                'px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center',
                action.variant === 'secondary'
                  ? 'border-2 border-qatar-primary-600 text-qatar-primary-600 hover:bg-qatar-primary-50'
                  : 'bg-qatar-primary-600 text-white hover:bg-qatar-primary-700'
              )}
            >
              {action.icon && (
                <action.icon className="h-5 w-5 mr-2" />
              )}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Common empty state variants
export function NoDataEmptyState(props: Omit<EmptyStateProps, 'variant'>) {
  return <EmptyState variant="no-data" {...props} />;
}

export function NoSearchResultsEmptyState(props: Omit<EmptyStateProps, 'variant'> & { searchQuery?: string }) {
  const { searchQuery, ...restProps } = props;
  return (
    <EmptyState
      variant="no-search-results"
      description={searchQuery ? \`No results found for "\${searchQuery}". Try different keywords or clear your filters.\` : undefined}
      {...restProps}
    />
  );
}

export function NoContentEmptyState(props: Omit<EmptyStateProps, 'variant'>) {
  return <EmptyState variant="no-content" {...props} />;
}

export function NoFilesEmptyState(props: Omit<EmptyStateProps, 'variant'>) {
  return (
    <EmptyState
      variant="no-files"
      actions={[
        {
          label: 'Upload Files',
          onClick: props.actions?.[0]?.onClick || (() => {}),
          icon: Upload
        }
      ]}
      {...props}
    />
  );
}

export function NoUsersEmptyState(props: Omit<EmptyStateProps, 'variant'>) {
  return (
    <EmptyState
      variant="no-users"
      actions={[
        {
          label: 'Invite Users',
          onClick: props.actions?.[0]?.onClick || (() => {}),
          icon: Plus
        }
      ]}
      {...props}
    />
  );
}

export function ErrorEmptyState(props: Omit<EmptyStateProps, 'variant'>) {
  return (
    <EmptyState
      variant="error"
      actions={[
        {
          label: 'Try Again',
          onClick: props.actions?.[0]?.onClick || (() => {}),
          icon: RefreshCw
        }
      ]}
      {...props}
    />
  );
}`,
    },
    {
      language: 'blazor',
      filename: 'EmptyState.razor',
      code: `@using Microsoft.AspNetCore.Components

<div class="@ContainerClasses">
    <!-- Illustration or Icon -->
    <div class="mb-6">
        @if (!string.IsNullOrEmpty(Illustration))
        {
            <img src="@Illustration"
                 alt="@FinalTitle"
                 class="h-48 w-48 mx-auto object-contain" />
        }
        else
        {
            <div class="@IconContainerClasses">
                <div class="@IconClasses">
                    @GetIconSvg()
                </div>
            </div>
        }
    </div>

    <!-- Content -->
    <div class="max-w-md mx-auto mb-8">
        <h3 class="@TitleClasses">
            @FinalTitle
        </h3>
        <p class="text-qatar-neutral-600 leading-relaxed">
            @FinalDescription
        </p>
    </div>

    <!-- Actions -->
    @if (Actions?.Any() == true)
    {
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
            @foreach (var action in Actions)
            {
                <button @onclick="action.OnClick"
                        class="@GetActionButtonClasses(action.Variant)">
                    @if (!string.IsNullOrEmpty(action.IconSvg))
                    {
                        <div class="h-5 w-5 mr-2">
                            @((MarkupString)action.IconSvg)
                        </div>
                    }
                    @action.Label
                </button>
            }
        </div>
    }
</div>

@code {
    [Parameter] public EmptyStateVariant Variant { get; set; }
    [Parameter] public string? Title { get; set; }
    [Parameter] public string? Description { get; set; }
    [Parameter] public string? IconSvg { get; set; }
    [Parameter] public string? Illustration { get; set; }
    [Parameter] public List<EmptyStateAction>? Actions { get; set; }
    [Parameter] public bool ShowAnimation { get; set; } = true;
    [Parameter] public EmptyStateSize Size { get; set; } = EmptyStateSize.Medium;
    [Parameter] public string? ClassName { get; set; }

    public enum EmptyStateVariant
    {
        NoData,
        NoSearchResults,
        NoContent,
        NoFiles,
        NoUsers,
        Error,
        Loading
    }

    public enum EmptyStateSize
    {
        Small,
        Medium,
        Large
    }

    public class EmptyStateAction
    {
        public string Label { get; set; } = string.Empty;
        public Action OnClick { get; set; } = () => { };
        public string Variant { get; set; } = "primary"; // "primary" or "secondary"
        public string? IconSvg { get; set; }
    }

    private string ContainerClasses =>
        $"flex flex-col items-center justify-center text-center {GetSizeClasses()} {ClassName}";

    private string IconContainerClasses =>
        $"rounded-full bg-qatar-neutral-100 flex items-center justify-center mx-auto {GetIconSizeClasses()} {(ShowAnimation ? "animate-pulse" : "")}";

    private string IconClasses =>
        $"text-qatar-neutral-400 {GetIconInnerSizeClasses()}";

    private string TitleClasses =>
        $"font-semibold text-qatar-neutral-900 mb-2 {GetTitleSizeClasses()}";

    private string FinalTitle => Title ?? GetDefaultConfig().Title;
    private string FinalDescription => Description ?? GetDefaultConfig().Description;

    private string GetSizeClasses() => Size switch
    {
        EmptyStateSize.Small => "py-8",
        EmptyStateSize.Medium => "py-12",
        EmptyStateSize.Large => "py-16",
        _ => "py-12"
    };

    private string GetIconSizeClasses() => Size switch
    {
        EmptyStateSize.Small => "h-12 w-12",
        EmptyStateSize.Medium => "h-16 w-16",
        EmptyStateSize.Large => "h-20 w-20",
        _ => "h-16 w-16"
    };

    private string GetIconInnerSizeClasses() => Size switch
    {
        EmptyStateSize.Small => "h-6 w-6",
        EmptyStateSize.Medium => "h-8 w-8",
        EmptyStateSize.Large => "h-10 w-10",
        _ => "h-8 w-8"
    };

    private string GetTitleSizeClasses() => Size switch
    {
        EmptyStateSize.Small => "text-lg",
        EmptyStateSize.Medium => "text-xl",
        EmptyStateSize.Large => "text-2xl",
        _ => "text-xl"
    };

    private string GetActionButtonClasses(string variant) => variant == "secondary"
        ? "px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center border-2 border-qatar-primary-600 text-qatar-primary-600 hover:bg-qatar-primary-50"
        : "px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center bg-qatar-primary-600 text-white hover:bg-qatar-primary-700";

    private (string Title, string Description, string IconSvg) GetDefaultConfig() => Variant switch
    {
        EmptyStateVariant.NoData => (
            "No Data Available",
            "There is no data to display at the moment. Try refreshing or check back later.",
            "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><circle cx=\"9\" cy=\"9\" r=\"1\"/><path d=\"m21 21-4.35-4.35\"/>"
        ),
        EmptyStateVariant.NoSearchResults => (
            "No Results Found",
            "We couldn't find anything matching your search. Try adjusting your search terms or filters.",
            "<circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.35-4.35\"/>"
        ),
        EmptyStateVariant.NoContent => (
            "No Content Yet",
            "This area is empty. Start by creating your first item to see it appear here.",
            "<path d=\"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z\"/><polyline points=\"14,2 14,8 20,8\"/>"
        ),
        EmptyStateVariant.NoFiles => (
            "No Files Uploaded",
            "Upload your first document to get started. Drag and drop files or click to browse.",
            "<polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"/>"
        ),
        EmptyStateVariant.NoUsers => (
            "No Users Found",
            "There are no users in this list yet. Invite team members to collaborate.",
            "<path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/>"
        ),
        EmptyStateVariant.Error => (
            "Something Went Wrong",
            "We encountered an error loading this content. Please try again or contact support if the problem persists.",
            "<polyline points=\"23 4 23 10 17 10\"/><polyline points=\"1 20 1 14 7 14\"/><path d=\"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15\"/>"
        ),
        EmptyStateVariant.Loading => (
            "Loading...",
            "Please wait while we load your content.",
            "<polyline points=\"23 4 23 10 17 10\"/><polyline points=\"1 20 1 14 7 14\"/><path d=\"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15\"/>"
        ),
        _ => ("Empty", "No content to display.", "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/>")
    };

    private MarkupString GetIconSvg()
    {
        var iconSvg = IconSvg ?? GetDefaultConfig().IconSvg;
        return new MarkupString($"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">{iconSvg}</svg>");
    }
}

<!-- Usage Examples as separate components -->

<!-- NoDataEmptyState -->
<div>
    @* <NoDataEmptyState /> *@
    <EmptyState Variant="EmptyStateVariant.NoData" />
</div>

<!-- NoSearchResultsEmptyState -->
<div>
    @* <NoSearchResultsEmptyState SearchQuery="@searchQuery" /> *@
    <EmptyState Variant="EmptyStateVariant.NoSearchResults"
               Description="@GetSearchResultsDescription()" />
</div>

<!-- NoFilesEmptyState -->
<div>
    <EmptyState Variant="EmptyStateVariant.NoFiles"
               Actions="@GetUploadActions()" />
</div>

@code {
    private string searchQuery = "";

    private string GetSearchResultsDescription()
    {
        return string.IsNullOrEmpty(searchQuery)
            ? "We couldn't find anything matching your search. Try adjusting your search terms or filters."
            : $"No results found for \"{searchQuery}\". Try different keywords or clear your filters.";
    }

    private List<EmptyStateAction> GetUploadActions() => new()
    {
        new()
        {
            Label = "Upload Files",
            OnClick = HandleUpload,
            IconSvg = "<path d=\"m21 15-6-6-6 6\"/><path d=\"M12 3v12\"/>"
        }
    };

    private void HandleUpload()
    {
        // Handle file upload
    }
}`,
    },
    {
      language: 'html',
      filename: 'empty-state.html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Empty State Components - Qatar GBA</title>
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
<body class="min-h-screen bg-qatar-neutral-50 p-8">
    <div class="max-w-4xl mx-auto">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-qatar-neutral-900 mb-2">Empty State Examples</h1>
            <p class="text-qatar-neutral-600">Various empty state layouts for different scenarios</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- No Data Empty State -->
            <div class="bg-white rounded-lg border border-qatar-neutral-200 p-6">
                <h2 class="text-lg font-semibold text-qatar-neutral-900 mb-4">No Data</h2>
                <div class="empty-state" data-variant="no-data">
                    <!-- Generated by JavaScript -->
                </div>
            </div>

            <!-- No Search Results Empty State -->
            <div class="bg-white rounded-lg border border-qatar-neutral-200 p-6">
                <h2 class="text-lg font-semibold text-qatar-neutral-900 mb-4">No Search Results</h2>
                <div class="empty-state" data-variant="no-search-results" data-search-query="documents">
                    <!-- Generated by JavaScript -->
                </div>
            </div>

            <!-- No Content Empty State -->
            <div class="bg-white rounded-lg border border-qatar-neutral-200 p-6">
                <h2 class="text-lg font-semibold text-qatar-neutral-900 mb-4">No Content</h2>
                <div class="empty-state" data-variant="no-content">
                    <!-- Generated by JavaScript -->
                </div>
            </div>

            <!-- No Files Empty State -->
            <div class="bg-white rounded-lg border border-qatar-neutral-200 p-6">
                <h2 class="text-lg font-semibold text-qatar-neutral-900 mb-4">No Files</h2>
                <div class="empty-state" data-variant="no-files">
                    <!-- Generated by JavaScript -->
                </div>
            </div>

            <!-- No Users Empty State -->
            <div class="bg-white rounded-lg border border-qatar-neutral-200 p-6">
                <h2 class="text-lg font-semibold text-qatar-neutral-900 mb-4">No Users</h2>
                <div class="empty-state" data-variant="no-users">
                    <!-- Generated by JavaScript -->
                </div>
            </div>

            <!-- Error Empty State -->
            <div class="bg-white rounded-lg border border-qatar-neutral-200 p-6">
                <h2 class="text-lg font-semibold text-qatar-neutral-900 mb-4">Error State</h2>
                <div class="empty-state" data-variant="error">
                    <!-- Generated by JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <script>
        // Empty state configurations
        const emptyStateConfigs = {
            'no-data': {
                icon: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="9" cy="9" r="1"/><path d="m21 21-4.35-4.35"/>',
                title: 'No Data Available',
                description: 'There is no data to display at the moment. Try refreshing or check back later.',
                actions: [
                    { label: 'Refresh', variant: 'primary', icon: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>' }
                ]
            },
            'no-search-results': {
                icon: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
                title: 'No Results Found',
                description: 'We couldn\\'t find anything matching your search. Try adjusting your search terms or filters.',
                actions: [
                    { label: 'Clear Filters', variant: 'secondary', icon: '<path d="M22 3H7l-4 4v11l4 4h15l4-4V7l-4-4z"/><path d="m16 12-6 6-6-6"/>' }
                ]
            },
            'no-content': {
                icon: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/>',
                title: 'No Content Yet',
                description: 'This area is empty. Start by creating your first item to see it appear here.',
                actions: [
                    { label: 'Create Content', variant: 'primary', icon: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' }
                ]
            },
            'no-files': {
                icon: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
                title: 'No Files Uploaded',
                description: 'Upload your first document to get started. Drag and drop files or click to browse.',
                actions: [
                    { label: 'Upload Files', variant: 'primary', icon: '<path d="m21 15-6-6-6 6"/><path d="M12 3v12"/>' }
                ]
            },
            'no-users': {
                icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
                title: 'No Users Found',
                description: 'There are no users in this list yet. Invite team members to collaborate.',
                actions: [
                    { label: 'Invite Users', variant: 'primary', icon: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' }
                ]
            },
            'error': {
                icon: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
                title: 'Something Went Wrong',
                description: 'We encountered an error loading this content. Please try again or contact support if the problem persists.',
                actions: [
                    { label: 'Try Again', variant: 'primary', icon: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>' }
                ]
            }
        };

        function createEmptyState(container, variant, searchQuery = null) {
            const config = emptyStateConfigs[variant];
            if (!config) return;

            let description = config.description;
            if (variant === 'no-search-results' && searchQuery) {
                description = \`No results found for "\${searchQuery}". Try different keywords or clear your filters.\`;
            }

            const html = \`
                <div class="flex flex-col items-center justify-center text-center py-12">
                    <!-- Icon -->
                    <div class="mb-6">
                        <div class="h-16 w-16 rounded-full bg-qatar-neutral-100 flex items-center justify-center mx-auto animate-pulse">
                            <svg class="h-8 w-8 text-qatar-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                \${config.icon}
                            </svg>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="max-w-md mx-auto mb-8">
                        <h3 class="text-xl font-semibold text-qatar-neutral-900 mb-2">
                            \${config.title}
                        </h3>
                        <p class="text-qatar-neutral-600 leading-relaxed">
                            \${description}
                        </p>
                    </div>

                    <!-- Actions -->
                    \${config.actions ? \`
                        <div class="flex flex-col sm:flex-row gap-3 justify-center">
                            \${config.actions.map(action => \`
                                <button class="\${action.variant === 'secondary'
                                    ? 'border-2 border-qatar-primary-600 text-qatar-primary-600 hover:bg-qatar-primary-50'
                                    : 'bg-qatar-primary-600 text-white hover:bg-qatar-primary-700'} px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
                                        onclick="handleAction('\${variant}', '\${action.label}')">
                                    \${action.icon ? \`
                                        <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            \${action.icon}
                                        </svg>
                                    \` : ''}
                                    \${action.label}
                                </button>
                            \`).join('')}
                        </div>
                    \` : ''}
                </div>
            \`;

            container.innerHTML = html;
        }

        function handleAction(variant, action) {
            console.log(\`Action clicked: \${action} for variant: \${variant}\`);
            alert(\`\${action} clicked for \${variant} empty state!\`);
        }

        // Initialize all empty states
        document.addEventListener('DOMContentLoaded', function() {
            const emptyStates = document.querySelectorAll('.empty-state');

            emptyStates.forEach(container => {
                const variant = container.getAttribute('data-variant');
                const searchQuery = container.getAttribute('data-search-query');
                createEmptyState(container, variant, searchQuery);
            });
        });
    </script>
</body>
</html>`,
    },
    {
      language: 'typescript',
      filename: 'empty-state-types.ts',
      code: `export type EmptyStateVariant =
  | 'no-data'
  | 'no-search-results'
  | 'no-content'
  | 'no-files'
  | 'no-users'
  | 'error'
  | 'loading'
  | 'maintenance'
  | 'offline'
  | 'unauthorized'
  | 'forbidden';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  loading?: boolean;
}

export interface EmptyStateLayoutProps {
  variant: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  illustration?: string;
  actions?: EmptyStateAction[];
  showAnimation?: boolean;
  size?: EmptyStateSize;
  className?: string;
  testId?: string;
}

export interface EmptyStateConfig {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  defaultActions?: Omit<EmptyStateAction, 'onClick'>[];
}

export interface EmptyStateTheme {
  containerClass: string;
  iconContainerClass: string;
  iconClass: string;
  titleClass: string;
  descriptionClass: string;
  actionsContainerClass: string;
  primaryButtonClass: string;
  secondaryButtonClass: string;
}

export const QATAR_GBA_EMPTY_STATE_THEME: EmptyStateTheme = {
  containerClass: 'flex flex-col items-center justify-center text-center',
  iconContainerClass: 'rounded-full bg-qatar-neutral-100 flex items-center justify-center mx-auto',
  iconClass: 'text-qatar-neutral-400',
  titleClass: 'font-semibold text-qatar-neutral-900',
  descriptionClass: 'text-qatar-neutral-600 leading-relaxed',
  actionsContainerClass: 'flex flex-col sm:flex-row gap-3 justify-center',
  primaryButtonClass: 'bg-qatar-primary-600 text-white hover:bg-qatar-primary-700 px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center',
  secondaryButtonClass: 'border-2 border-qatar-primary-600 text-qatar-primary-600 hover:bg-qatar-primary-50 px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center'
};

export interface EmptyStateProps {
  variant: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  illustration?: string;
  actions?: EmptyStateAction[];
  showAnimation?: boolean;
  size?: EmptyStateSize;
  className?: string;
  theme?: Partial<EmptyStateTheme>;
}

// Specific empty state component props
export interface NoSearchResultsEmptyStateProps extends Omit<EmptyStateLayoutProps, 'variant'> {
  searchQuery?: string;
  totalResults?: number;
  appliedFilters?: string[];
  onClearFilters?: () => void;
  onNewSearch?: (query: string) => void;
}

export interface NoFilesEmptyStateProps extends Omit<EmptyStateLayoutProps, 'variant'> {
  acceptedFileTypes?: string[];
  maxFileSize?: string;
  multiple?: boolean;
  onUpload?: (files: File[]) => void;
}

export interface NoUsersEmptyStateProps extends Omit<EmptyStateLayoutProps, 'variant'> {
  userType?: 'team_members' | 'customers' | 'admins';
  onInvite?: () => void;
  onImport?: () => void;
}

export interface ErrorEmptyStateProps extends Omit<EmptyStateLayoutProps, 'variant'> {
  errorCode?: string;
  errorMessage?: string;
  supportEmail?: string;
  supportPhone?: string;
  onRetry?: () => void;
  onContactSupport?: () => void;
}

// Analytics and tracking
export interface EmptyStateAnalytics {
  variant: EmptyStateVariant;
  actionClicked?: string;
  sessionId?: string;
  userId?: string;
  timestamp: Date;
  context?: Record<string, any>;
}

export interface EmptyStateTracker {
  trackView: (variant: EmptyStateVariant, context?: Record<string, any>) => void;
  trackAction: (variant: EmptyStateVariant, action: string, context?: Record<string, any>) => void;
}

// Factory functions for common empty states
export const createNoDataEmptyState = (
  onRefresh?: () => void,
  customTitle?: string,
  customDescription?: string
): EmptyStateLayoutProps => ({
  variant: 'no-data',
  title: customTitle,
  description: customDescription,
  actions: onRefresh ? [{
    label: 'Refresh',
    onClick: onRefresh,
    variant: 'primary'
  }] : undefined
});

export const createNoSearchResultsEmptyState = (
  searchQuery: string,
  onClearFilters?: () => void,
  onNewSearch?: () => void
): EmptyStateLayoutProps => ({
  variant: 'no-search-results',
  description: \`No results found for "\${searchQuery}". Try different keywords or clear your filters.\`,
  actions: [
    ...(onClearFilters ? [{
      label: 'Clear Filters',
      onClick: onClearFilters,
      variant: 'secondary' as const
    }] : []),
    ...(onNewSearch ? [{
      label: 'New Search',
      onClick: onNewSearch,
      variant: 'primary' as const
    }] : [])
  ]
});

export const createErrorEmptyState = (
  onRetry?: () => void,
  errorMessage?: string
): EmptyStateLayoutProps => ({
  variant: 'error',
  description: errorMessage,
  actions: onRetry ? [{
    label: 'Try Again',
    onClick: onRetry,
    variant: 'primary'
  }] : undefined
});`,
    },
  ],
};
