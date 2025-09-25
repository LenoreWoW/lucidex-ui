'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Box,
  Palette,
  Layout,
  MousePointer,
  FileText,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavMenuProps {
  onComponentSelect: (component: string) => void;
  selectedComponent: string | null;
}

interface ComponentGroup {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  components: ComponentItem[];
}

interface ComponentItem {
  id: string;
  name: string;
  description: string;
  status?: 'stable' | 'beta' | 'experimental';
}

export function NavMenu({
  onComponentSelect,
  selectedComponent,
}: NavMenuProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['layout', 'components'])
  );

  const componentGroups: ComponentGroup[] = [
    {
      id: 'layout',
      label: 'Layout',
      icon: Layout,
      components: [
        {
          id: 'container',
          name: 'Container',
          description: 'Page container with max-width',
        },
        { id: 'grid', name: 'Grid', description: 'Responsive grid system' },
        {
          id: 'stack',
          name: 'Stack',
          description: 'Vertical spacing component',
        },
        { id: 'flex', name: 'Flex', description: 'Flexbox layout utilities' },
      ],
    },
    {
      id: 'components',
      label: 'Components',
      icon: Box,
      components: [
        {
          id: 'button',
          name: 'Button',
          description: 'Interactive button element',
          status: 'stable',
        },
        {
          id: 'card',
          name: 'Card',
          description: 'Content container with shadow',
          status: 'stable',
        },
        {
          id: 'badge',
          name: 'Badge',
          description: 'Status and label indicator',
          status: 'stable',
        },
        {
          id: 'avatar',
          name: 'Avatar',
          description: 'User profile image',
          status: 'beta',
        },
        {
          id: 'alert',
          name: 'Alert',
          description: 'Contextual feedback messages',
          status: 'stable',
        },
      ],
    },
    {
      id: 'forms',
      label: 'Form Controls',
      icon: FileText,
      components: [
        {
          id: 'input',
          name: 'Input',
          description: 'Text input field',
          status: 'stable',
        },
        {
          id: 'textarea',
          name: 'Textarea',
          description: 'Multi-line text input',
          status: 'stable',
        },
        {
          id: 'select',
          name: 'Select',
          description: 'Dropdown selection',
          status: 'beta',
        },
        {
          id: 'checkbox',
          name: 'Checkbox',
          description: 'Boolean input control',
          status: 'stable',
        },
        {
          id: 'radio',
          name: 'Radio',
          description: 'Single selection control',
          status: 'stable',
        },
        {
          id: 'switch',
          name: 'Switch',
          description: 'Toggle switch control',
          status: 'beta',
        },
      ],
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: Zap,
      components: [
        {
          id: 'toast',
          name: 'Toast',
          description: 'Temporary notification',
          status: 'beta',
        },
        {
          id: 'modal',
          name: 'Modal',
          description: 'Dialog overlay',
          status: 'stable',
        },
        {
          id: 'tooltip',
          name: 'Tooltip',
          description: 'Contextual information popup',
          status: 'stable',
        },
        {
          id: 'popover',
          name: 'Popover',
          description: 'Rich content overlay',
          status: 'beta',
        },
        {
          id: 'progress',
          name: 'Progress',
          description: 'Task completion indicator',
          status: 'stable',
        },
      ],
    },
    {
      id: 'navigation',
      label: 'Navigation',
      icon: MousePointer,
      components: [
        {
          id: 'breadcrumb',
          name: 'Breadcrumb',
          description: 'Hierarchical navigation',
          status: 'stable',
        },
        {
          id: 'pagination',
          name: 'Pagination',
          description: 'Page navigation controls',
          status: 'stable',
        },
        {
          id: 'tabs',
          name: 'Tabs',
          description: 'Tabbed content navigation',
          status: 'stable',
        },
        {
          id: 'menu',
          name: 'Menu',
          description: 'Dropdown menu component',
          status: 'beta',
        },
      ],
    },
    {
      id: 'data',
      label: 'Data Display',
      icon: Palette,
      components: [
        {
          id: 'table',
          name: 'Table',
          description: 'Structured data display',
          status: 'experimental',
        },
        {
          id: 'list',
          name: 'List',
          description: 'Item collection display',
          status: 'stable',
        },
        {
          id: 'accordion',
          name: 'Accordion',
          description: 'Collapsible content sections',
          status: 'beta',
        },
      ],
    },
  ];

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;

    const statusConfig = {
      stable: {
        color:
          'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
        label: 'Stable',
      },
      beta: {
        color:
          'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20',
        label: 'Beta',
      },
      experimental: {
        color:
          'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20',
        label: 'Exp',
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    return (
      <span
        className={cn(
          'rounded-full px-1.5 py-0.5 text-[10px] font-medium',
          config.color
        )}
      >
        {config.label}
      </span>
    );
  };

  return (
    <nav className="space-y-1 p-2">
      {componentGroups.map(group => {
        const isExpanded = expandedGroups.has(group.id);
        const Icon = group.icon;

        return (
          <div key={group.id} className="space-y-1">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-md px-2 py-2',
                'text-sm font-medium text-foreground',
                'transition-colors duration-200 hover:bg-accent',
                'group'
              )}
            >
              <div className="flex items-center space-x-2">
                <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                <span>{group.label}</span>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-muted-foreground transition-transform" />
              ) : (
                <ChevronRight className="h-3 w-3 text-muted-foreground transition-transform" />
              )}
            </button>

            {/* Group Components */}
            {isExpanded && (
              <div className="ml-4 space-y-0.5 border-l border-border pl-4">
                {group.components.map(component => (
                  <button
                    key={component.id}
                    onClick={() => onComponentSelect(component.name)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-md px-2 py-2 text-left',
                      'group transition-all duration-200',
                      selectedComponent === component.name
                        ? 'bg-qgba-gold text-white shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="truncate text-sm font-medium">
                          {component.name}
                        </span>
                        {getStatusBadge(component.status)}
                      </div>
                      <p
                        className={cn(
                          'mt-0.5 truncate text-xs',
                          selectedComponent === component.name
                            ? 'text-white/80'
                            : 'text-muted-foreground'
                        )}
                      >
                        {component.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Stats Footer */}
      <div className="mt-4 border-t border-border pt-4">
        <div className="space-y-1 px-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Total Components</span>
            <span className="font-medium">
              {componentGroups.reduce(
                (total, group) => total + group.components.length,
                0
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Categories</span>
            <span className="font-medium">{componentGroups.length}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
