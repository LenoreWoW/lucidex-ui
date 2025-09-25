'use client';

import React, { useState, useEffect } from 'react';
import {
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Info,
  Keyboard,
  Contrast,
  Volume2,
  Settings,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  performAccessibilityAudit,
  announceToScreenReader,
  getContrastRatio,
  isWCAGCompliant
} from '@/lib/accessibility';

interface AccessibilityCheckerProps {
  className?: string;
}

interface AccessibilityIssue {
  element: HTMLElement;
  issue: string;
  severity: 'error' | 'warning';
}

export function AccessibilityChecker({ className }: AccessibilityCheckerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'audit' | 'contrast' | 'keyboard' | 'screen-reader'>('audit');
  const [auditResults, setAuditResults] = useState<{
    issues: AccessibilityIssue[];
    summary: { errors: number; warnings: number };
  } | null>(null);
  const [isHighlightingIssues, setIsHighlightingIssues] = useState(false);

  // Run accessibility audit
  const runAudit = () => {
    const results = performAccessibilityAudit();
    setAuditResults(results);
    announceToScreenReader(`Accessibility audit completed. Found ${results.summary.errors} errors and ${results.summary.warnings} warnings.`);
  };

  // Highlight elements with issues
  const toggleHighlighting = () => {
    const newHighlighting = !isHighlightingIssues;
    setIsHighlightingIssues(newHighlighting);

    if (newHighlighting && auditResults) {
      auditResults.issues.forEach(({ element, severity }) => {
        element.style.outline = severity === 'error' ? '3px solid #ef4444' : '3px solid #f59e0b';
        element.style.outlineOffset = '2px';
        element.setAttribute('data-a11y-issue', 'true');
      });
    } else {
      // Remove highlights
      document.querySelectorAll('[data-a11y-issue]').forEach(element => {
        (element as HTMLElement).style.outline = '';
        (element as HTMLElement).style.outlineOffset = '';
        element.removeAttribute('data-a11y-issue');
      });
    }

    announceToScreenReader(
      newHighlighting ? 'Issue highlighting enabled' : 'Issue highlighting disabled'
    );
  };

  // Close checker and cleanup
  const closeChecker = () => {
    setIsOpen(false);
    if (isHighlightingIssues) {
      toggleHighlighting();
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (isHighlightingIssues) {
        document.querySelectorAll('[data-a11y-issue]').forEach(element => {
          (element as HTMLElement).style.outline = '';
          (element as HTMLElement).style.outlineOffset = '';
          element.removeAttribute('data-a11y-issue');
        });
      }
    };
  }, [isHighlightingIssues]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-4 right-4 z-50 rounded-full p-3',
          'bg-qgba-gold text-white shadow-lg',
          'hover:bg-qgba-gold/90 transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-qgba-gold focus:ring-offset-2',
          className
        )}
        title="Open Accessibility Checker"
        aria-label="Open accessibility checker panel"
      >
        <Eye className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={cn(
        'w-96 max-h-[600px] bg-white dark:bg-gray-900',
        'border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl',
        'flex flex-col overflow-hidden'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-qgba-gold" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Accessibility Checker
            </h3>
          </div>
          <button
            onClick={closeChecker}
            className="rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close accessibility checker"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700" role="tablist">
          {[
            { id: 'audit', label: 'Audit', icon: AlertTriangle },
            { id: 'contrast', label: 'Contrast', icon: Contrast },
            { id: 'keyboard', label: 'Keyboard', icon: Keyboard },
            { id: 'screen-reader', label: 'SR', icon: Volume2 },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={`panel-${id}`}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={cn(
                'flex-1 flex items-center justify-center space-x-1 py-2 px-3 text-sm font-medium',
                'border-b-2 transition-colors',
                activeTab === id
                  ? 'border-qgba-gold text-qgba-gold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:block">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className="flex-1 overflow-auto p-4">
          {/* Audit Panel */}
          {activeTab === 'audit' && (
            <div role="tabpanel" id="panel-audit" aria-labelledby="tab-audit">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={runAudit}
                    className="flex items-center space-x-2 rounded-md bg-qgba-gold px-3 py-2 text-sm font-medium text-white hover:bg-qgba-gold/90"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Run Audit</span>
                  </button>

                  {auditResults && (
                    <button
                      onClick={toggleHighlighting}
                      className={cn(
                        'flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium',
                        isHighlightingIssues
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      )}
                    >
                      {isHighlightingIssues ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          <span>Hide</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          <span>Highlight</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {auditResults && (
                  <div className="space-y-3">
                    {/* Summary */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center space-x-2 rounded-md bg-red-50 p-2 dark:bg-red-900/20">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span>{auditResults.summary.errors} Errors</span>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md bg-yellow-50 p-2 dark:bg-yellow-900/20">
                        <Info className="h-4 w-4 text-yellow-600" />
                        <span>{auditResults.summary.warnings} Warnings</span>
                      </div>
                    </div>

                    {/* Issues List */}
                    <div className="max-h-60 space-y-2 overflow-auto">
                      {auditResults.issues.map((issue, index) => (
                        <div
                          key={index}
                          className={cn(
                            'rounded-md p-2 text-sm',
                            issue.severity === 'error'
                              ? 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                              : 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                          )}
                        >
                          <div className="flex items-start space-x-2">
                            {issue.severity === 'error' ? (
                              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            )}
                            <div>
                              <p className="font-medium">{issue.issue}</p>
                              <p className="text-xs opacity-75 mt-1">
                                {issue.element.tagName.toLowerCase()}
                                {issue.element.id && `#${issue.element.id}`}
                                {issue.element.className && `.${issue.element.className.split(' ')[0]}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contrast Panel */}
          {activeTab === 'contrast' && (
            <div role="tabpanel" id="panel-contrast" aria-labelledby="tab-contrast">
              <ContrastChecker />
            </div>
          )}

          {/* Keyboard Panel */}
          {activeTab === 'keyboard' && (
            <div role="tabpanel" id="panel-keyboard" aria-labelledby="tab-keyboard">
              <KeyboardTester />
            </div>
          )}

          {/* Screen Reader Panel */}
          {activeTab === 'screen-reader' && (
            <div role="tabpanel" id="panel-screen-reader" aria-labelledby="tab-screen-reader">
              <ScreenReaderTester />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Contrast Checker Component
function ContrastChecker() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [ratio, setRatio] = useState<number | null>(null);

  useEffect(() => {
    const calculatedRatio = getContrastRatio(foreground, background);
    setRatio(calculatedRatio);
  }, [foreground, background]);

  const isAACompliant = ratio && isWCAGCompliant(foreground, background, 'AA');
  const isAAACompliant = ratio && isWCAGCompliant(foreground, background, 'AAA');

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 dark:text-white">Color Contrast Checker</h4>

      <div className="space-y-3">
        <div>
          <label htmlFor="foreground-color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Foreground Color
          </label>
          <input
            id="foreground-color"
            type="color"
            value={foreground}
            onChange={(e) => setForeground(e.target.value)}
            className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="background-color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Background Color
          </label>
          <input
            id="background-color"
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Preview */}
        <div
          className="p-4 rounded-md border text-center"
          style={{ backgroundColor: background, color: foreground }}
        >
          Sample Text Preview
        </div>

        {/* Results */}
        {ratio && (
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Contrast Ratio:</strong> {ratio.toFixed(2)}:1
            </p>

            <div className="space-y-1">
              <div className={cn(
                'flex items-center space-x-2 text-sm',
                isAACompliant ? 'text-green-600' : 'text-red-600'
              )}>
                {isAACompliant ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />}
                <span>WCAG AA {isAACompliant ? 'Pass' : 'Fail'}</span>
              </div>

              <div className={cn(
                'flex items-center space-x-2 text-sm',
                isAAACompliant ? 'text-green-600' : 'text-red-600'
              )}>
                {isAAACompliant ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />}
                <span>WCAG AAA {isAAACompliant ? 'Pass' : 'Fail'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Keyboard Tester Component
function KeyboardTester() {
  const [isTracking, setIsTracking] = useState(false);
  const [keyEvents, setKeyEvents] = useState<string[]>([]);

  useEffect(() => {
    if (!isTracking) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const keyInfo = `${event.key} (${event.code})`;
      setKeyEvents(prev => [...prev.slice(-9), keyInfo]);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isTracking]);

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 dark:text-white">Keyboard Navigation Tester</h4>

      <button
        onClick={() => {
          setIsTracking(!isTracking);
          if (!isTracking) setKeyEvents([]);
        }}
        className={cn(
          'w-full rounded-md px-3 py-2 text-sm font-medium',
          isTracking
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-qgba-gold text-white hover:bg-qgba-gold/90'
        )}
      >
        {isTracking ? 'Stop Tracking' : 'Start Keyboard Tracking'}
      </button>

      {isTracking && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Press keys to see them tracked below:
          </p>
          <div className="h-32 overflow-auto rounded-md bg-gray-50 p-2 text-sm dark:bg-gray-800">
            {keyEvents.map((key, index) => (
              <div key={index} className="font-mono">
                {key}
              </div>
            ))}
            {keyEvents.length === 0 && (
              <div className="text-gray-400">No key presses detected...</div>
            )}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-medium mb-1">Test these keyboard interactions:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Tab through all interactive elements</li>
          <li>Use Enter/Space to activate buttons</li>
          <li>Use arrow keys in menus and lists</li>
          <li>Use Escape to close modals</li>
          <li>Use Home/End to navigate to start/end</li>
        </ul>
      </div>
    </div>
  );
}

// Screen Reader Tester Component
function ScreenReaderTester() {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite');

  const handleAnnounce = () => {
    if (message.trim()) {
      announceToScreenReader(message, priority);
      setMessage('');
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900 dark:text-white">Screen Reader Tester</h4>

      <div className="space-y-3">
        <div>
          <label htmlFor="sr-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message to Announce
          </label>
          <textarea
            id="sr-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message to announce to screen readers..."
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 text-sm"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="sr-priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority Level
          </label>
          <select
            id="sr-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'polite' | 'assertive')}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 text-sm"
          >
            <option value="polite">Polite (non-interrupting)</option>
            <option value="assertive">Assertive (interrupting)</option>
          </select>
        </div>

        <button
          onClick={handleAnnounce}
          disabled={!message.trim()}
          className="w-full rounded-md bg-qgba-gold px-3 py-2 text-sm font-medium text-white hover:bg-qgba-gold/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Announce to Screen Reader
        </button>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p className="font-medium mb-1">Screen Reader Testing Tips:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Use NVDA, JAWS, or VoiceOver to test</li>
          <li>Check that all content is readable</li>
          <li>Verify proper heading structure</li>
          <li>Test form labels and error messages</li>
          <li>Ensure dynamic content announces properly</li>
        </ul>
      </div>
    </div>
  );
}