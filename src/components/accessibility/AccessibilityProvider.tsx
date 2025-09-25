'use client';

import React, { useEffect, createContext, useContext, useState } from 'react';
import { initializeKeyboardDetection } from '@/lib/keyboardDetection';
import { announceToScreenReader } from '@/lib/accessibility';

interface AccessibilityContextType {
  announceMessage: (message: string, priority?: 'polite' | 'assertive') => void;
  isHighContrastMode: boolean;
  isReducedMotionMode: boolean;
  isKeyboardNavigation: boolean;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [isHighContrastMode, setIsHighContrastMode] = useState(false);
  const [isReducedMotionMode, setIsReducedMotionMode] = useState(false);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);

  useEffect(() => {
    // Initialize keyboard detection
    initializeKeyboardDetection();

    // Check for prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotionMode(reducedMotionQuery.matches);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotionMode(e.matches);
      if (e.matches) {
        announceToScreenReader('Reduced motion mode enabled');
      }
    };

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    // Check for prefers-contrast
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrastMode(highContrastQuery.matches);

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setIsHighContrastMode(e.matches);
      if (e.matches) {
        announceToScreenReader('High contrast mode enabled');
      }
    };

    highContrastQuery.addEventListener('change', handleHighContrastChange);

    // Monitor keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      const navigationKeys = ['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (navigationKeys.includes(event.key)) {
        setIsKeyboardNavigation(true);
      }
    };

    const handleMouseMove = () => {
      setIsKeyboardNavigation(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Apply body classes based on preferences
  useEffect(() => {
    const bodyClasses: string[] = [];

    if (isHighContrastMode) {
      bodyClasses.push('high-contrast');
    }

    if (isReducedMotionMode) {
      bodyClasses.push('reduced-motion');
    }

    if (isKeyboardNavigation) {
      bodyClasses.push('keyboard-navigation');
    }

    // Apply classes
    bodyClasses.forEach(className => {
      document.body.classList.add(className);
    });

    // Cleanup function to remove classes
    return () => {
      bodyClasses.forEach(className => {
        document.body.classList.remove(className);
      });
    };
  }, [isHighContrastMode, isReducedMotionMode, isKeyboardNavigation]);

  const announceMessage = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announceToScreenReader(message, priority);
  };

  const toggleHighContrast = () => {
    const newMode = !isHighContrastMode;
    setIsHighContrastMode(newMode);

    // Apply high contrast styles
    if (newMode) {
      document.documentElement.style.setProperty('--high-contrast', '1');
      announceMessage('High contrast mode enabled');
    } else {
      document.documentElement.style.removeProperty('--high-contrast');
      announceMessage('High contrast mode disabled');
    }
  };

  const contextValue: AccessibilityContextType = {
    announceMessage,
    isHighContrastMode,
    isReducedMotionMode,
    isKeyboardNavigation,
    toggleHighContrast,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}