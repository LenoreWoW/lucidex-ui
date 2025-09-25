'use client';

import { useEffect, useRef, RefObject, useState } from 'react';
import {
  FocusTrap,
  manageFocusForRouteChange,
  announceToScreenReader,
  KeyCodes,
  KeyboardNavigation
} from '@/lib/accessibility';

/**
 * Hook for managing focus traps in modals and overlays
 */
export function useFocusTrap(
  isActive: boolean,
  containerRef: RefObject<HTMLElement>
) {
  const focusTrapRef = useRef<FocusTrap | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isActive) {
      focusTrapRef.current = new FocusTrap(containerRef.current);
      focusTrapRef.current.activate();
    } else if (focusTrapRef.current) {
      focusTrapRef.current.deactivate();
      focusTrapRef.current = null;
    }

    return () => {
      if (focusTrapRef.current) {
        focusTrapRef.current.deactivate();
      }
    };
  }, [isActive, containerRef]);
}

/**
 * Hook for managing keyboard navigation in lists and menus
 */
export function useKeyboardNavigation(
  elements: HTMLElement[],
  orientation: 'horizontal' | 'vertical' = 'vertical',
  wrap = true
) {
  const navigationRef = useRef<KeyboardNavigation | null>(null);

  useEffect(() => {
    if (elements.length === 0) return;

    navigationRef.current = new KeyboardNavigation(elements, orientation, wrap);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (navigationRef.current) {
        navigationRef.current.handleKeydown(event);
      }
    };

    const handleFocus = (event: FocusEvent) => {
      if (
        navigationRef.current &&
        event.target instanceof HTMLElement &&
        elements.includes(event.target)
      ) {
        navigationRef.current.updateCurrentIndex(event.target);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focus', handleFocus, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focus', handleFocus, true);
    };
  }, [elements, orientation, wrap]);

  return navigationRef.current;
}

/**
 * Hook for handling escape key to close modals/overlays
 */
export function useEscapeKey(callback: () => void, isActive = true) {
  useEffect(() => {
    if (!isActive) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === KeyCodes.ESCAPE) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [callback, isActive]);
}

/**
 * Hook for announcing route changes to screen readers
 */
export function useRouteAnnouncement(pathname: string, title?: string) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title) {
        announceToScreenReader(`Navigated to ${title}`, 'polite');
      }
      manageFocusForRouteChange();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, title]);
}

/**
 * Hook for managing ARIA live regions
 */
export function useLiveRegion() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announceToScreenReader(message, priority);
  };

  return { announce };
}

/**
 * Hook for managing disclosure widgets (dropdowns, accordions)
 */
export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    announceToScreenReader(
      newState ? 'Expanded' : 'Collapsed',
      'polite'
    );
  };

  const open = () => {
    setIsOpen(true);
    announceToScreenReader('Expanded', 'polite');
  };

  const close = () => {
    setIsOpen(false);
    announceToScreenReader('Collapsed', 'polite');
    // Return focus to trigger
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  // Handle escape key
  useEscapeKey(close, isOpen);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return {
    isOpen,
    toggle,
    open,
    close,
    triggerRef,
    contentRef,
    triggerProps: {
      'aria-expanded': isOpen,
      'aria-controls': contentRef.current?.id,
      ref: triggerRef,
    },
    contentProps: {
      ref: contentRef,
      'aria-labelledby': triggerRef.current?.id,
    },
  };
}

/**
 * Hook for managing form validation states
 */
export function useFormValidation() {
  const createFieldAttributes = (
    isInvalid: boolean,
    isRequired = false,
    errorId?: string,
    describedBy?: string
  ) => {
    const attributes: Record<string, any> = {
      'aria-invalid': isInvalid,
    };

    if (isRequired) {
      attributes['aria-required'] = true;
    }

    if (isInvalid && errorId) {
      attributes['aria-describedby'] = describedBy
        ? `${describedBy} ${errorId}`
        : errorId;
    } else if (describedBy) {
      attributes['aria-describedby'] = describedBy;
    }

    return attributes;
  };

  return { createFieldAttributes };
}