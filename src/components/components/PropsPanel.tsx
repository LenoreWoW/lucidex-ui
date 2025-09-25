'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ComponentProp } from '@/types';
import {
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Copy,
  Check,
  Eye,
  EyeOff,
  Info,
  Code2,
} from 'lucide-react';

export interface PropValue {
  [key: string]: any;
}

export interface PropsPanelProps {
  componentName: string;
  props: ComponentProp[];
  values: PropValue;
  onChange: (values: PropValue) => void;
  className?: string;
  showAdvanced?: boolean;
  showCode?: boolean;
}

interface PropControlProps {
  prop: ComponentProp;
  value: any;
  onChange: (value: any) => void;
}

function PropControl({ prop, value, onChange }: PropControlProps) {
  const [showDescription, setShowDescription] = useState(false);

  const renderControl = () => {
    switch (prop.type.toLowerCase()) {
      case 'string':
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder={prop.default || `Enter ${prop.name}`}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        );

      case 'number':
      case 'integer':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={e => onChange(parseFloat(e.target.value) || 0)}
            placeholder={prop.default || '0'}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <button
              type="button"
              role="switch"
              aria-checked={!!value}
              onClick={() => onChange(!value)}
              className={cn(
                'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
                value ? 'bg-primary' : 'bg-input'
              )}
            >
              <span
                className={cn(
                  'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform',
                  value ? 'translate-x-5' : 'translate-x-0'
                )}
              />
            </button>
            <span className="text-sm text-muted-foreground">
              {value ? 'true' : 'false'}
            </span>
          </div>
        );

      case 'select':
      case 'enum':
        const options = prop.examples || ['option1', 'option2', 'option3'];
        return (
          <select
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select {prop.name}</option>
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={e => onChange(e.target.value)}
              className="h-10 w-16 cursor-pointer rounded-md border border-input bg-background disabled:cursor-not-allowed disabled:opacity-50"
            />
            <input
              type="text"
              value={value || ''}
              onChange={e => onChange(e.target.value)}
              placeholder="#000000"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        );

      case 'array':
        return (
          <textarea
            value={
              Array.isArray(value)
                ? JSON.stringify(value, null, 2)
                : value || '[]'
            }
            onChange={e => {
              try {
                const parsed = JSON.parse(e.target.value);
                onChange(parsed);
              } catch {
                onChange(e.target.value);
              }
            }}
            placeholder={prop.default || '[]'}
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        );

      case 'object':
        return (
          <textarea
            value={
              typeof value === 'object' && value !== null
                ? JSON.stringify(value, null, 2)
                : value || '{}'
            }
            onChange={e => {
              try {
                const parsed = JSON.parse(e.target.value);
                onChange(parsed);
              } catch {
                onChange(e.target.value);
              }
            }}
            placeholder={prop.default || '{}'}
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        );

      case 'function':
        return (
          <div className="flex items-center justify-center rounded-md border border-dashed border-input bg-muted/50 px-3 py-8 text-sm text-muted-foreground">
            <div className="text-center">
              <Code2 className="mx-auto mb-2 h-6 w-6" />
              <p>Function prop</p>
              <p className="text-xs">Interactive editing not supported</p>
            </div>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder={prop.default || `Enter ${prop.name}`}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {prop.name}
            {prop.required && <span className="ml-1 text-destructive">*</span>}
          </label>
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {prop.type}
          </span>
          {prop.description && (
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Info className="h-3 w-3" />
            </button>
          )}
        </div>
        {prop.default && (
          <button
            onClick={() => onChange(prop.default)}
            className="text-xs text-muted-foreground hover:text-foreground"
            title="Reset to default"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        )}
      </div>

      {showDescription && prop.description && (
        <p className="rounded-md bg-muted/50 p-2 text-xs text-muted-foreground">
          {prop.description}
        </p>
      )}

      {renderControl()}

      {prop.examples && prop.examples.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {prop.examples.slice(0, 3).map(example => (
            <button
              key={example}
              onClick={() => onChange(example)}
              className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
            >
              {example}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function PropsPanel({
  componentName,
  props,
  values,
  onChange,
  className,
  showAdvanced = false,
  showCode = true,
}: PropsPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['basic'])
  );
  const [showAllProps, setShowAllProps] = useState(false);
  const [copied, setCopied] = useState(false);

  const { basicProps, advancedProps, requiredProps } = useMemo(() => {
    const required = props.filter(prop => prop.required);
    // const optional = props.filter(prop => !prop.required); // Removed unused variable
    const basic = props.filter(prop =>
      ['string', 'number', 'boolean', 'select', 'color'].includes(
        prop.type.toLowerCase()
      )
    );
    const advanced = props.filter(prop =>
      ['array', 'object', 'function'].includes(prop.type.toLowerCase())
    );

    return {
      basicProps: basic,
      advancedProps: advanced,
      requiredProps: required,
    };
  }, [props]);

  const generatePropsCode = useCallback(() => {
    const propsEntries = Object.entries(values).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ''
    );

    if (propsEntries.length === 0) return `<${componentName} />`;

    const propsString = propsEntries
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : `${key}={false}`;
        } else if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else {
          return `${key}={${JSON.stringify(value)}}`;
        }
      })
      .join('\n  ');

    return `<${componentName}\n  ${propsString}\n/>`;
  }, [componentName, values]);

  const handleCopyCode = useCallback(async () => {
    const code = generatePropsCode();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  }, [generatePropsCode]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const resetAllProps = () => {
    const defaultValues: PropValue = {};
    props.forEach(prop => {
      if (prop.default !== undefined) {
        defaultValues[prop.name] = prop.default;
      }
    });
    onChange(defaultValues);
  };

  return (
    <div className={cn('props-panel flex h-full flex-col bg-card', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="font-semibold text-foreground">Props Panel</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAllProps(!showAllProps)}
            className="text-xs text-muted-foreground hover:text-foreground"
            title={showAllProps ? 'Hide advanced props' : 'Show all props'}
          >
            {showAllProps ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={resetAllProps}
            className="text-xs text-muted-foreground hover:text-foreground"
            title="Reset all props"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Props Summary */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{componentName}</span>
          <span>
            {props.length} props ({requiredProps.length} required)
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {Object.keys(values).length} configured
          </span>
          {requiredProps.length > 0 && (
            <span className="inline-flex items-center rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
              {requiredProps.length} required
            </span>
          )}
        </div>
      </div>

      {/* Props Sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Required Props */}
        {requiredProps.length > 0 && (
          <div className="border-b border-border">
            <button
              onClick={() => toggleSection('required')}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50"
            >
              <span className="font-medium">Required Props</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">
                  {requiredProps.length}
                </span>
                {expandedSections.has('required') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </button>
            {expandedSections.has('required') && (
              <div className="space-y-4 p-4 pt-0">
                {requiredProps.map(prop => (
                  <PropControl
                    key={prop.name}
                    prop={prop}
                    value={values[prop.name]}
                    onChange={value =>
                      onChange({ ...values, [prop.name]: value })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Basic Props */}
        {basicProps.length > 0 && (
          <div className="border-b border-border">
            <button
              onClick={() => toggleSection('basic')}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50"
            >
              <span className="font-medium">Basic Props</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">
                  {basicProps.filter(p => !p.required).length}
                </span>
                {expandedSections.has('basic') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </button>
            {expandedSections.has('basic') && (
              <div className="space-y-4 p-4 pt-0">
                {basicProps
                  .filter(p => !p.required)
                  .map(prop => (
                    <PropControl
                      key={prop.name}
                      prop={prop}
                      value={values[prop.name]}
                      onChange={value =>
                        onChange({ ...values, [prop.name]: value })
                      }
                    />
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Advanced Props */}
        {(showAdvanced || showAllProps) && advancedProps.length > 0 && (
          <div className="border-b border-border">
            <button
              onClick={() => toggleSection('advanced')}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50"
            >
              <span className="font-medium">Advanced Props</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">
                  {advancedProps.filter(p => !p.required).length}
                </span>
                {expandedSections.has('advanced') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </button>
            {expandedSections.has('advanced') && (
              <div className="space-y-4 p-4 pt-0">
                {advancedProps
                  .filter(p => !p.required)
                  .map(prop => (
                    <PropControl
                      key={prop.name}
                      prop={prop}
                      value={values[prop.name]}
                      onChange={value =>
                        onChange({ ...values, [prop.name]: value })
                      }
                    />
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Code Preview */}
        {showCode && (
          <div className="border-b border-border">
            <button
              onClick={() => toggleSection('code')}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50"
            >
              <span className="font-medium">Generated Code</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleCopyCode();
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                {expandedSections.has('code') ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </button>
            {expandedSections.has('code') && (
              <div className="p-4 pt-0">
                <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
                  <code>{generatePropsCode()}</code>
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
