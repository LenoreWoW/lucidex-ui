'use client';

import { useState, useCallback } from 'react';

interface CopyState {
  isCopied: boolean;
  error: string | null;
}

interface UseCopyToClipboardReturn extends CopyState {
  copy: (text: string) => Promise<boolean>;
  copyToClipboard: (text: string, message?: string) => Promise<boolean>;
  reset: () => void;
}

export function useCopyToClipboard(timeout = 2000): UseCopyToClipboardReturn {
  const [state, setState] = useState<CopyState>({
    isCopied: false,
    error: null,
  });

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        setState({
          isCopied: false,
          error: 'Clipboard not supported',
        });
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setState({ isCopied: true, error: null });

        // Reset the copied state after timeout
        setTimeout(() => {
          setState(prev => ({ ...prev, isCopied: false }));
        }, timeout);

        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Copy failed';
        setState({
          isCopied: false,
          error: errorMessage,
        });
        return false;
      }
    },
    [timeout]
  );

  const copyToClipboard = useCallback(
    async (text: string, message?: string): Promise<boolean> => {
      const success = await copy(text);
      if (success && message) {
        // In a real app, you'd want to show a toast notification here
        console.log(message);
      }
      return success;
    },
    [copy]
  );

  const reset = useCallback(() => {
    setState({ isCopied: false, error: null });
  }, []);

  return {
    ...state,
    copy,
    copyToClipboard,
    reset,
  };
}

// Alternative hook for managing multiple copy states
export function useMultipleCopyStates(): {
  copyStates: Record<string, boolean>;
  copy: (text: string, key: string) => Promise<boolean>;
  isCopied: (key: string) => boolean;
  reset: (key?: string) => void;
} {
  const [copyStates, setCopyStates] = useState<Record<string, boolean>>({});

  const copy = useCallback(
    async (text: string, key: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopyStates(prev => ({ ...prev, [key]: true }));

        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopyStates(prev => ({ ...prev, [key]: false }));
        }, 2000);

        return true;
      } catch (err) {
        console.error('Failed to copy text:', err);
        return false;
      }
    },
    []
  );

  const isCopied = useCallback(
    (key: string): boolean => {
      return copyStates[key] || false;
    },
    [copyStates]
  );

  const reset = useCallback((key?: string) => {
    if (key) {
      setCopyStates(prev => ({ ...prev, [key]: false }));
    } else {
      setCopyStates({});
    }
  }, []);

  return {
    copyStates,
    copy,
    isCopied,
    reset,
  };
}
