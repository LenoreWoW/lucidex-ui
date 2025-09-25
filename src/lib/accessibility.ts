/**
 * Accessibility utilities for the Lucidex UI Explorer
 * Provides focus management, ARIA helpers, and accessibility testing utilities
 */

import { RefObject } from 'react';

// ===== FOCUS MANAGEMENT UTILITIES =====

/**
 * Trap focus within a container element (useful for modals and overlays)
 */
export class FocusTrap {
  private container: HTMLElement;
  private previousActiveElement: Element | null = null;
  private focusableElements: HTMLElement[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
  }

  /**
   * Get all focusable elements within the container
   */
  private getFocusableElements(): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([tabindex="-1"])',
      'select:not([disabled]):not([tabindex="-1"])',
      'textarea:not([disabled]):not([tabindex="-1"])',
      'button:not([disabled]):not([tabindex="-1"])',
      'iframe',
      'object',
      'embed',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]',
    ].join(', ');

    return Array.from(
      this.container.querySelectorAll(focusableSelectors)
    ).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement &&
        !element.hasAttribute('disabled') &&
        !element.getAttribute('aria-hidden') &&
        element.offsetParent !== null
    );
  }

  /**
   * Activate focus trap
   */
  activate(): void {
    this.previousActiveElement = document.activeElement;
    this.focusableElements = this.getFocusableElements();

    // Focus the first focusable element
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }

    // Add event listener for tab key
    document.addEventListener('keydown', this.handleKeydown);
  }

  /**
   * Deactivate focus trap and restore previous focus
   */
  deactivate(): void {
    document.removeEventListener('keydown', this.handleKeydown);

    if (this.previousActiveElement instanceof HTMLElement) {
      this.previousActiveElement.focus();
    }
  }

  /**
   * Handle keydown events for focus trapping
   */
  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return;

    const currentIndex = this.focusableElements.indexOf(
      document.activeElement as HTMLElement
    );

    if (event.shiftKey) {
      // Shift + Tab (backwards)
      if (currentIndex <= 0) {
        event.preventDefault();
        this.focusableElements[this.focusableElements.length - 1]?.focus();
      }
    } else {
      // Tab (forwards)
      if (currentIndex >= this.focusableElements.length - 1) {
        event.preventDefault();
        this.focusableElements[0]?.focus();
      }
    }
  };
}

/**
 * Custom hook for managing focus trap
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  isActive: boolean
) {
  const focusTrap = containerRef.current
    ? new FocusTrap(containerRef.current)
    : null;

  if (isActive && focusTrap) {
    focusTrap.activate();
    return () => focusTrap.deactivate();
  } else if (focusTrap) {
    focusTrap.deactivate();
  }

  return () => {};
}

/**
 * Manage focus for route changes and SPA navigation
 */
export function manageFocusForRouteChange(
  targetSelector = 'h1, [role="heading"][aria-level="1"]'
): void {
  const target = document.querySelector(targetSelector) as HTMLElement;
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus();
    // Remove tabindex after focus to prevent it from being focusable via tab
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), {
      once: true,
    });
  }
}

// ===== ARIA HELPER FUNCTIONS =====

/**
 * Generate unique IDs for ARIA relationships
 */
let idCounter = 0;
export function generateId(prefix = 'polaris-ui'): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * Create ARIA label attributes
 */
export function createAriaLabel(label: string, description?: string) {
  if (description) {
    const descriptionId = generateId('description');
    return {
      'aria-label': label,
      'aria-describedby': descriptionId,
      descriptionId,
    };
  }
  return {
    'aria-label': label,
  };
}

/**
 * Create ARIA attributes for expandable elements
 */
export function createExpandableAttributes(
  isExpanded: boolean,
  controlsId?: string
) {
  const attributes: Record<string, string | boolean> = {
    'aria-expanded': isExpanded,
  };

  if (controlsId) {
    attributes['aria-controls'] = controlsId;
  }

  return attributes;
}

/**
 * Create ARIA attributes for form validation
 */
export function createValidationAttributes(
  isInvalid: boolean,
  errorId?: string,
  isRequired = false
) {
  const attributes: Record<string, string | boolean> = {
    'aria-invalid': isInvalid,
  };

  if (isRequired) {
    attributes['aria-required'] = true;
  }

  if (isInvalid && errorId) {
    attributes['aria-describedby'] = errorId;
  }

  return attributes;
}

// ===== COLOR CONTRAST UTILITIES =====

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(
  color1: string,
  color2: string
): number | null {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return null;

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG contrast requirements
 */
export function isWCAGCompliant(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background);
  if (!ratio) return false;

  const requirements = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 },
  };

  return ratio >= requirements[level][size];
}

// ===== SCREEN READER UTILITIES =====

/**
 * Announce text to screen readers using live regions
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove the announcement element after a brief delay
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Create a live region element for dynamic content updates
 */
export function createLiveRegion(
  priority: 'polite' | 'assertive' = 'polite',
  atomic = true
): HTMLElement {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', priority);
  liveRegion.setAttribute('aria-atomic', atomic.toString());
  liveRegion.setAttribute('class', 'sr-only');
  return liveRegion;
}

// ===== KEYBOARD NAVIGATION UTILITIES =====

/**
 * Key codes for common keyboard interactions
 */
export const KeyCodes = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  TAB: 'Tab',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

/**
 * Handle keyboard navigation for lists and menus
 */
export class KeyboardNavigation {
  private elements: HTMLElement[];
  private currentIndex: number;
  private orientation: 'horizontal' | 'vertical';
  private wrap: boolean;

  constructor(
    elements: HTMLElement[],
    orientation: 'horizontal' | 'vertical' = 'vertical',
    wrap = true
  ) {
    this.elements = elements;
    this.currentIndex = 0;
    this.orientation = orientation;
    this.wrap = wrap;
  }

  /**
   * Handle keydown events for keyboard navigation
   */
  handleKeydown = (event: KeyboardEvent): void => {
    const { key } = event;
    let handled = false;

    switch (key) {
      case KeyCodes.ARROW_UP:
        if (this.orientation === 'vertical') {
          this.movePrevious();
          handled = true;
        }
        break;
      case KeyCodes.ARROW_DOWN:
        if (this.orientation === 'vertical') {
          this.moveNext();
          handled = true;
        }
        break;
      case KeyCodes.ARROW_LEFT:
        if (this.orientation === 'horizontal') {
          this.movePrevious();
          handled = true;
        }
        break;
      case KeyCodes.ARROW_RIGHT:
        if (this.orientation === 'horizontal') {
          this.moveNext();
          handled = true;
        }
        break;
      case KeyCodes.HOME:
        this.moveToFirst();
        handled = true;
        break;
      case KeyCodes.END:
        this.moveToLast();
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  private moveNext(): void {
    if (this.currentIndex < this.elements.length - 1) {
      this.currentIndex++;
    } else if (this.wrap) {
      this.currentIndex = 0;
    }
    this.focus();
  }

  private movePrevious(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else if (this.wrap) {
      this.currentIndex = this.elements.length - 1;
    }
    this.focus();
  }

  private moveToFirst(): void {
    this.currentIndex = 0;
    this.focus();
  }

  private moveToLast(): void {
    this.currentIndex = this.elements.length - 1;
    this.focus();
  }

  private focus(): void {
    this.elements[this.currentIndex]?.focus();
  }

  /**
   * Update the current index based on focused element
   */
  updateCurrentIndex(activeElement: HTMLElement): void {
    const index = this.elements.indexOf(activeElement);
    if (index !== -1) {
      this.currentIndex = index;
    }
  }
}

// ===== ACCESSIBILITY TESTING UTILITIES =====

/**
 * Check if element has proper ARIA attributes
 */
export function validateAriaAttributes(element: HTMLElement): string[] {
  const issues: string[] = [];

  // Check for missing labels on interactive elements
  const interactiveElements = ['button', 'input', 'select', 'textarea', 'a'];
  if (interactiveElements.includes(element.tagName.toLowerCase())) {
    const hasLabel =
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      (element.tagName.toLowerCase() === 'input' && element.closest('label')) ||
      (element.tagName.toLowerCase() === 'button' &&
        element.textContent?.trim());

    if (!hasLabel) {
      issues.push('Interactive element missing accessible name');
    }
  }

  // Check for invalid ARIA attributes
  const ariaAttributes = Array.from(element.attributes)
    .filter(attr => attr.name.startsWith('aria-'))
    .map(attr => attr.name);

  // Add more ARIA validation rules as needed

  return issues;
}

/**
 * Scan document for common accessibility issues
 */
export function performAccessibilityAudit(): {
  issues: Array<{
    element: HTMLElement;
    issue: string;
    severity: 'error' | 'warning';
  }>;
  summary: { errors: number; warnings: number };
} {
  const issues: Array<{
    element: HTMLElement;
    issue: string;
    severity: 'error' | 'warning';
  }> = [];

  // Check for missing alt text on images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.getAttribute('alt') && !img.getAttribute('aria-label')) {
      issues.push({
        element: img as HTMLElement,
        issue: 'Image missing alt text',
        severity: 'error',
      });
    }
  });

  // Check for proper heading hierarchy
  const headings = document.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, [role="heading"]'
  );
  let currentLevel = 0;
  headings.forEach(heading => {
    const level = heading.tagName.startsWith('H')
      ? parseInt(heading.tagName.substring(1))
      : parseInt(heading.getAttribute('aria-level') || '1');

    if (level > currentLevel + 1) {
      issues.push({
        element: heading as HTMLElement,
        issue: `Heading level skipped (from h${currentLevel} to h${level})`,
        severity: 'warning',
      });
    }
    currentLevel = level;
  });

  // Check for color contrast (simplified check for elements with inline styles)
  const elementsWithStyle = document.querySelectorAll('[style*="color"]');
  elementsWithStyle.forEach(element => {
    const style = window.getComputedStyle(element);
    const color = style.color;
    const backgroundColor = style.backgroundColor;

    // This is a simplified check - in practice, you'd want more robust color parsing
    if (color && backgroundColor) {
      // Add contrast checking logic here if needed
    }
  });

  const summary = {
    errors: issues.filter(issue => issue.severity === 'error').length,
    warnings: issues.filter(issue => issue.severity === 'warning').length,
  };

  return { issues, summary };
}

// ===== UTILITY TYPES =====

export interface AccessibilityOptions {
  announceChanges?: boolean;
  manageHistory?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
}

export interface AccessibilityState {
  isModalOpen: boolean;
  announceMessages: string[];
  focusHistory: HTMLElement[];
}
