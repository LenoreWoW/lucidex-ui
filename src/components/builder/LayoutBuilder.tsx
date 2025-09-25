'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  useDragDropBuilder,
  LAYOUT_COMPONENTS,
  type DroppableComponent,
  type DragItem,
  canDrop,
} from '@/lib/drag-drop-builder';
import {
  Play,
  Square,
  Code,
  Download,
  Upload,
  Trash2,
  Grid3X3,
  Eye,
  Settings,
  Plus,
  Move,
  Copy,
  MoreHorizontal,
} from 'lucide-react';

export interface LayoutBuilderProps {
  className?: string;
  onSave?: (layout: Record<string, any>) => void;
  onExport?: (code: string) => void;
}

export function LayoutBuilder({ className, onSave, onExport }: LayoutBuilderProps) {
  const {
    state,
    addComponent,
    removeComponent,
    moveComponent,
    selectComponent,
    setPreviewMode,
    setGridSize,
    setSnapToGrid,
    exportLayout,
    importLayout,
    generateCode,
    clear,
  } = useDragDropBuilder();

  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleDragStart = (e: React.DragEvent, component: DroppableComponent) => {
    const dragItem: DragItem = {
      id: component.id,
      type: component.type,
      component,
    };
    setDraggedItem(dragItem);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', JSON.stringify(dragItem));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent, zoneId: string = 'canvas') => {
    e.preventDefault();

    if (!draggedItem) return;

    const zone = state.dropZones.find(z => z.id === zoneId);
    if (!zone || !canDrop(draggedItem, zone)) return;

    addComponent(draggedItem.component, zoneId);
    setDraggedItem(null);
  };

  const handleExportLayout = () => {
    const layout = exportLayout();
    onSave?.(layout);

    // Also download as JSON
    const blob = new Blob([JSON.stringify(layout, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-layout.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCode = () => {
    const code = generateCode('react');
    onExport?.(code);

    // Also copy to clipboard
    navigator.clipboard.writeText(code);
  };

  const handleImportLayout = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const layout = JSON.parse(e.target?.result as string);
        importLayout(layout);
      } catch (error) {
        console.error('Failed to import layout:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={cn('flex h-screen bg-background', className)}>
      {/* Component Palette */}
      <div className="w-64 border-r bg-muted/30 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Components</h2>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="rounded p-1 hover:bg-accent"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>

        {showSettings && (
          <div className="mb-4 rounded-lg border bg-background p-3">
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium">Grid Size</label>
              <input
                type="range"
                min="4"
                max="32"
                step="4"
                value={state.gridSize}
                onChange={(e) => setGridSize(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground">{state.gridSize}px</div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="snap-to-grid"
                checked={state.snapToGrid}
                onChange={(e) => setSnapToGrid(e.target.checked)}
                className="h-3 w-3"
              />
              <label htmlFor="snap-to-grid" className="text-xs">
                Snap to grid
              </label>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {LAYOUT_COMPONENTS.map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component)}
              className="flex cursor-move items-center space-x-3 rounded-lg border bg-background p-3 hover:border-primary"
            >
              <span className="text-lg">{component.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="font-medium">{component.name}</div>
                <div className="text-xs text-muted-foreground">
                  {component.description}
                </div>
              </div>
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex flex-1 flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode(!state.previewMode)}
              className={cn(
                'flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors',
                state.previewMode
                  ? 'bg-primary text-primary-foreground'
                  : 'border hover:bg-accent'
              )}
            >
              {state.previewMode ? <Eye className="h-4 w-4" /> : <Square className="h-4 w-4" />}
              <span>{state.previewMode ? 'Preview' : 'Design'}</span>
            </button>

            <div className="h-6 w-px bg-border" />

            <button
              onClick={() => setSnapToGrid(!state.snapToGrid)}
              className={cn(
                'rounded-md p-2 transition-colors',
                state.snapToGrid ? 'bg-accent' : 'hover:bg-accent'
              )}
              title="Toggle snap to grid"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept=".json"
              onChange={handleImportLayout}
              className="hidden"
              id="import-layout"
            />
            <label
              htmlFor="import-layout"
              className="flex items-center space-x-2 rounded-md border px-3 py-2 text-sm hover:bg-accent cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </label>

            <button
              onClick={handleExportLayout}
              className="flex items-center space-x-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>

            <button
              onClick={handleExportCode}
              className="flex items-center space-x-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"
            >
              <Code className="h-4 w-4" />
              <span>Code</span>
            </button>

            <div className="h-6 w-px bg-border" />

            <button
              onClick={clear}
              className="flex items-center space-x-2 rounded-md border border-destructive px-3 py-2 text-sm text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto p-4">
          <div
            className={cn(
              'min-h-full rounded-lg border-2 border-dashed border-muted-foreground/25 bg-background transition-colors',
              draggedItem && 'border-primary bg-primary/5'
            )}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'canvas')}
            style={{
              backgroundImage: state.snapToGrid
                ? `radial-gradient(circle, hsl(var(--muted-foreground)) 1px, transparent 1px)`
                : undefined,
              backgroundSize: state.snapToGrid ? `${state.gridSize}px ${state.gridSize}px` : undefined,
            }}
          >
            {state.dropZones[0]?.children.length === 0 ? (
              <div className="flex h-96 items-center justify-center text-center">
                <div>
                  <div className="mb-2 text-2xl">🎨</div>
                  <div className="mb-1 font-medium">Start Building</div>
                  <div className="text-sm text-muted-foreground">
                    Drag components from the sidebar to create your layout
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                {state.dropZones[0]?.children.map((component, index) => (
                  <ComponentRenderer
                    key={component.id}
                    component={component}
                    index={index}
                    isSelected={state.selectedComponent === component.id}
                    previewMode={state.previewMode}
                    onSelect={() => selectComponent(component.id)}
                    onRemove={() => removeComponent(component.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      {state.selectedComponent && (
        <ComponentPropertiesPanel
          component={state.components.find(c => c.id === state.selectedComponent)!}
          onClose={() => selectComponent()}
        />
      )}
    </div>
  );
}

interface ComponentRendererProps {
  component: DroppableComponent;
  index: number;
  isSelected: boolean;
  previewMode: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

function ComponentRenderer({
  component,
  index,
  isSelected,
  previewMode,
  onSelect,
  onRemove,
}: ComponentRendererProps) {
  const getComponentClasses = () => {
    const baseClasses = ['relative', 'rounded-md', 'transition-all'];

    if (!previewMode) {
      baseClasses.push('border', 'hover:border-primary/50');
      if (isSelected) {
        baseClasses.push('border-primary', 'ring-2', 'ring-primary/20');
      } else {
        baseClasses.push('border-border');
      }
    }

    // Apply component-specific styles
    switch (component.id) {
      case 'container':
        baseClasses.push('p-4', 'bg-background');
        if (component.props?.direction === 'row') {
          baseClasses.push('flex', 'flex-row');
        } else {
          baseClasses.push('flex', 'flex-col');
        }
        if (component.props?.gap) baseClasses.push(`gap-${component.props.gap}`);
        break;

      case 'grid':
        baseClasses.push('grid', 'p-4');
        const columns = component.props?.columns || 2;
        baseClasses.push(`grid-cols-${columns}`);
        if (component.props?.gap) baseClasses.push(`gap-${component.props.gap}`);
        break;

      case 'flex':
        baseClasses.push('flex', 'p-4');
        if (component.props?.direction) baseClasses.push(`flex-${component.props.direction}`);
        if (component.props?.gap) baseClasses.push(`gap-${component.props.gap}`);
        break;

      case 'stack':
        baseClasses.push('flex', 'flex-col', 'p-4');
        if (component.props?.gap) baseClasses.push(`gap-${component.props.gap}`);
        break;

      case 'card':
        baseClasses.push('bg-card', 'border', 'shadow-sm', 'p-6', 'rounded-lg');
        break;

      case 'section':
        baseClasses.push('py-8');
        break;
    }

    return baseClasses.join(' ');
  };

  return (
    <div className={getComponentClasses()} onClick={onSelect}>
      {!previewMode && (
        <div className="absolute -top-2 left-2 flex items-center space-x-1">
          <span className="rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            {component.name}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="rounded bg-destructive p-0.5 text-destructive-foreground hover:bg-destructive/90"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="min-h-16">
        {component.id === 'section' && component.props?.heading && (
          <h2 className="mb-4 text-xl font-semibold">{component.props.heading}</h2>
        )}

        {component.children && component.children.length > 0 ? (
          component.children.map((child, childIndex) => (
            <ComponentRenderer
              key={child.id}
              component={child}
              index={childIndex}
              isSelected={false}
              previewMode={previewMode}
              onSelect={() => {}}
              onRemove={() => {}}
            />
          ))
        ) : (
          <div className="flex h-16 items-center justify-center text-sm text-muted-foreground">
            {previewMode ? null : 'Drop components here'}
          </div>
        )}
      </div>
    </div>
  );
}

interface ComponentPropertiesPanelProps {
  component: DroppableComponent;
  onClose: () => void;
}

function ComponentPropertiesPanel({ component, onClose }: ComponentPropertiesPanelProps) {
  return (
    <div className="w-64 border-l bg-muted/30 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Properties</h3>
        <button onClick={onClose} className="rounded p-1 hover:bg-accent">
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <div className="text-sm text-muted-foreground">{component.name}</div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Type</label>
          <div className="text-sm text-muted-foreground">{component.type}</div>
        </div>

        {component.props && Object.keys(component.props).length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium">Properties</label>
            <div className="space-y-2">
              {Object.entries(component.props).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm">{key}</span>
                  <span className="text-sm text-muted-foreground">
                    {typeof value === 'string' ? value : JSON.stringify(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}