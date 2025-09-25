/**
 * Drag & Drop Layout Builder
 * Allows users to create custom layouts by dragging and dropping components
 */

import React from 'react';
import { Component } from '@/types';
import { Template } from '@/types/templates';

export interface DroppableComponent {
  id: string;
  type: 'component' | 'container' | 'layout';
  name: string;
  category: string;
  icon?: string;
  description?: string;
  props?: Record<string, any>;
  children?: DroppableComponent[];
  component?: Component;
  template?: Template;
}

export interface DropZone {
  id: string;
  accepts: string[];
  children: DroppableComponent[];
  constraints?: {
    maxChildren?: number;
    allowNesting?: boolean;
  };
}

export interface BuilderState {
  components: DroppableComponent[];
  dropZones: DropZone[];
  selectedComponent?: string;
  previewMode: boolean;
  gridSize: number;
  snapToGrid: boolean;
}

export interface DragItem {
  id: string;
  type: string;
  component: DroppableComponent;
  sourceZone?: string;
  sourceIndex?: number;
}

export interface DropResult {
  targetZone: string;
  targetIndex: number;
  operation: 'move' | 'copy' | 'insert';
}

// Built-in layout components
export const LAYOUT_COMPONENTS: DroppableComponent[] = [
  {
    id: 'container',
    type: 'container',
    name: 'Container',
    category: 'Layout',
    icon: '📦',
    description: 'Flexible container for grouping components',
    props: {
      padding: 'md',
      gap: 'md',
      direction: 'column',
      align: 'start',
      justify: 'start',
    },
    children: [],
  },
  {
    id: 'grid',
    type: 'container',
    name: 'Grid',
    category: 'Layout',
    icon: '⚏',
    description: 'CSS Grid container with customizable columns',
    props: {
      columns: 2,
      gap: 'md',
      responsive: true,
    },
    children: [],
  },
  {
    id: 'flex',
    type: 'container',
    name: 'Flex',
    category: 'Layout',
    icon: '↔',
    description: 'Flexbox container with alignment options',
    props: {
      direction: 'row',
      wrap: false,
      align: 'center',
      justify: 'start',
      gap: 'md',
    },
    children: [],
  },
  {
    id: 'stack',
    type: 'container',
    name: 'Stack',
    category: 'Layout',
    icon: '⚏',
    description: 'Vertical stack with consistent spacing',
    props: {
      gap: 'md',
      align: 'stretch',
    },
    children: [],
  },
  {
    id: 'card',
    type: 'container',
    name: 'Card',
    category: 'Layout',
    icon: '🃏',
    description: 'Card container with border and shadow',
    props: {
      variant: 'elevated',
      padding: 'lg',
      rounded: 'md',
    },
    children: [],
  },
  {
    id: 'section',
    type: 'container',
    name: 'Section',
    category: 'Layout',
    icon: '📄',
    description: 'Semantic section with optional heading',
    props: {
      heading: '',
      headingLevel: 2,
      spacing: 'lg',
    },
    children: [],
  },
];

export class LayoutBuilder {
  private state: BuilderState;
  private listeners: Set<(state: BuilderState) => void> = new Set();

  constructor(initialState?: Partial<BuilderState>) {
    this.state = {
      components: [],
      dropZones: [
        {
          id: 'canvas',
          accepts: ['component', 'container', 'layout'],
          children: [],
          constraints: {
            allowNesting: true,
          },
        },
      ],
      previewMode: false,
      gridSize: 8,
      snapToGrid: true,
      ...initialState,
    };
  }

  getState(): BuilderState {
    return { ...this.state };
  }

  subscribe(listener: (state: BuilderState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  addComponent(component: DroppableComponent, zoneId: string = 'canvas', index?: number): void {
    const zone = this.state.dropZones.find(z => z.id === zoneId);
    if (!zone) return;

    const newComponent = {
      ...component,
      id: `${component.id}-${Date.now()}`,
      children: component.children ? [...component.children] : [],
    };

    if (index !== undefined) {
      zone.children.splice(index, 0, newComponent);
    } else {
      zone.children.push(newComponent);
    }

    this.state.components = [...this.state.components, newComponent];
    this.emit();
  }

  removeComponent(componentId: string): void {
    // Remove from all drop zones
    this.state.dropZones.forEach(zone => {
      this.removeComponentFromZone(componentId, zone);
    });

    // Remove from components list
    this.state.components = this.state.components.filter(c => c.id !== componentId);
    this.emit();
  }

  private removeComponentFromZone(componentId: string, zone: DropZone): void {
    zone.children = zone.children.filter(c => {
      if (c.id === componentId) return false;
      if (c.children) {
        this.removeComponentFromChildren(componentId, c.children);
      }
      return true;
    });
  }

  private removeComponentFromChildren(componentId: string, children: DroppableComponent[]): void {
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      if (child.id === componentId) {
        children.splice(i, 1);
      } else if (child.children) {
        this.removeComponentFromChildren(componentId, child.children);
      }
    }
  }

  moveComponent(
    componentId: string,
    sourceZone: string,
    sourceIndex: number,
    targetZone: string,
    targetIndex: number
  ): void {
    const source = this.state.dropZones.find(z => z.id === sourceZone);
    const target = this.state.dropZones.find(z => z.id === targetZone);

    if (!source || !target) return;

    const component = source.children.splice(sourceIndex, 1)[0];
    if (!component) return;

    target.children.splice(targetIndex, 0, component);
    this.emit();
  }

  updateComponentProps(componentId: string, props: Record<string, any>): void {
    const component = this.findComponent(componentId);
    if (component) {
      component.props = { ...component.props, ...props };
      this.emit();
    }
  }

  private findComponent(componentId: string): DroppableComponent | undefined {
    for (const zone of this.state.dropZones) {
      const found = this.findComponentInChildren(componentId, zone.children);
      if (found) return found;
    }
    return this.state.components.find(c => c.id === componentId);
  }

  private findComponentInChildren(componentId: string, children: DroppableComponent[]): DroppableComponent | undefined {
    for (const child of children) {
      if (child.id === componentId) return child;
      if (child.children) {
        const found = this.findComponentInChildren(componentId, child.children);
        if (found) return found;
      }
    }
    return undefined;
  }

  selectComponent(componentId?: string): void {
    this.state.selectedComponent = componentId;
    this.emit();
  }

  setPreviewMode(previewMode: boolean): void {
    this.state.previewMode = previewMode;
    this.emit();
  }

  setGridSize(gridSize: number): void {
    this.state.gridSize = Math.max(4, Math.min(32, gridSize));
    this.emit();
  }

  setSnapToGrid(snapToGrid: boolean): void {
    this.state.snapToGrid = snapToGrid;
    this.emit();
  }

  exportLayout(): Record<string, any> {
    return {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      metadata: {
        title: 'Custom Layout',
        description: 'Layout created with Lucidex UI Builder',
        framework: 'react',
      },
      layout: {
        dropZones: this.state.dropZones,
        components: this.state.components,
      },
      settings: {
        gridSize: this.state.gridSize,
        snapToGrid: this.state.snapToGrid,
      },
    };
  }

  importLayout(layoutData: Record<string, any>): void {
    try {
      if (layoutData.layout) {
        this.state.dropZones = layoutData.layout.dropZones || [];
        this.state.components = layoutData.layout.components || [];
      }
      if (layoutData.settings) {
        this.state.gridSize = layoutData.settings.gridSize || 8;
        this.state.snapToGrid = layoutData.settings.snapToGrid ?? true;
      }
      this.emit();
    } catch (error) {
      console.error('Failed to import layout:', error);
      throw new Error('Invalid layout data');
    }
  }

  generateCode(framework: 'react' | 'nextjs' = 'react'): string {
    const imports = new Set(['React']);
    const componentCode = this.generateComponentCode(this.state.dropZones[0], imports, 0);

    const importStatements = Array.from(imports).join(', ');

    return `import { ${importStatements} } from 'react';
import { cn } from '@/lib/utils';

export function CustomLayout() {
  return (
${componentCode}
  );
}

export default CustomLayout;`;
  }

  private generateComponentCode(zone: DropZone | DroppableComponent, imports: Set<string>, depth: number): string {
    const indent = '  '.repeat(depth + 2);
    const childIndent = '  '.repeat(depth + 3);

    if ('accepts' in zone) {
      // This is a DropZone
      const childrenCode = zone.children
        .map(child => this.generateComponentCode(child, imports, depth + 1))
        .join('\n');

      return `${indent}<div className="drop-zone">
${childrenCode}
${indent}</div>`;
    } else {
      // This is a DroppableComponent
      const component = zone;
      const className = this.generateClassName(component);
      const props = this.generatePropsString(component);

      let childrenCode = '';
      if (component.children && component.children.length > 0) {
        childrenCode = component.children
          .map(child => this.generateComponentCode(child, imports, depth + 1))
          .join('\n');
      }

      const hasChildren = childrenCode.length > 0;
      const tag = this.getHtmlTag(component);

      return hasChildren
        ? `${indent}<${tag}${props} className={cn('${className}')}>
${childrenCode}
${indent}</${tag}>`
        : `${indent}<${tag}${props} className={cn('${className}')} />`;
    }
  }

  private generateClassName(component: DroppableComponent): string {
    const baseClasses = [];

    switch (component.type) {
      case 'container':
        baseClasses.push('container');
        if (component.props?.padding) baseClasses.push(`p-${component.props.padding}`);
        if (component.props?.gap) baseClasses.push(`gap-${component.props.gap}`);
        break;
      default:
        baseClasses.push(component.name.toLowerCase().replace(/\s+/g, '-'));
    }

    return baseClasses.join(' ');
  }

  private generatePropsString(component: DroppableComponent): string {
    const props = [];

    if (component.props) {
      Object.entries(component.props).forEach(([key, value]) => {
        if (key === 'className' || key === 'children') return;

        if (typeof value === 'string') {
          props.push(`${key}="${value}"`);
        } else if (typeof value === 'boolean') {
          if (value) props.push(key);
        } else {
          props.push(`${key}={${JSON.stringify(value)}}`);
        }
      });
    }

    return props.length > 0 ? ` ${props.join(' ')}` : '';
  }

  private getHtmlTag(component: DroppableComponent): string {
    switch (component.id) {
      case 'container':
      case 'grid':
      case 'flex':
      case 'stack':
        return 'div';
      case 'card':
        return 'div';
      case 'section':
        return 'section';
      default:
        return 'div';
    }
  }

  clear(): void {
    this.state.components = [];
    this.state.dropZones = [
      {
        id: 'canvas',
        accepts: ['component', 'container', 'layout'],
        children: [],
        constraints: { allowNesting: true },
      },
    ];
    this.state.selectedComponent = undefined;
    this.emit();
  }
}

// Hook for React components to use the drag-drop builder
export function useDragDropBuilder(initialState?: Partial<BuilderState>) {
  const [builder] = React.useState(() => new LayoutBuilder(initialState));
  const [state, setState] = React.useState(() => builder.getState());

  React.useEffect(() => {
    const unsubscribe = builder.subscribe(setState);
    return unsubscribe;
  }, [builder]);

  return {
    builder,
    state,
    addComponent: builder.addComponent.bind(builder),
    removeComponent: builder.removeComponent.bind(builder),
    moveComponent: builder.moveComponent.bind(builder),
    updateComponentProps: builder.updateComponentProps.bind(builder),
    selectComponent: builder.selectComponent.bind(builder),
    setPreviewMode: builder.setPreviewMode.bind(builder),
    setGridSize: builder.setGridSize.bind(builder),
    setSnapToGrid: builder.setSnapToGrid.bind(builder),
    exportLayout: builder.exportLayout.bind(builder),
    importLayout: builder.importLayout.bind(builder),
    generateCode: builder.generateCode.bind(builder),
    clear: builder.clear.bind(builder),
  };
}

// Utility functions for drag and drop
export function canDrop(item: DragItem, target: DropZone): boolean {
  if (!target.accepts.includes(item.type)) return false;

  if (target.constraints?.maxChildren && target.children.length >= target.constraints.maxChildren) {
    return false;
  }

  return true;
}

export function getDropPreview(item: DragItem, target: DropZone, index: number): DroppableComponent {
  return {
    ...item.component,
    id: `preview-${Date.now()}`,
  };
}