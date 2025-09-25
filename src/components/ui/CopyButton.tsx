'use client';

import React from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface CopyButtonProps {
  text: string;
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onCopySuccess?: () => void;
  onCopyError?: (error: string) => void;
  children?: React.ReactNode;
}

export function CopyButton({
  text,
  className,
  variant = 'default',
  size = 'md',
  showText = true,
  onCopySuccess,
  onCopyError,
  children,
}: CopyButtonProps) {
  const { isCopied, error, copy } = useCopyToClipboard();

  const handleCopy = async () => {
    const success = await copy(text);
    if (success) {
      onCopySuccess?.();
    } else if (error) {
      onCopyError?.(error);
    }
  };

  const sizeClasses = {
    sm: 'h-7 px-2 text-xs',
    md: 'h-8 px-2.5 text-xs',
    lg: 'h-9 px-3 text-sm',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  const variantClasses = {
    default: cn(
      'bg-accent text-muted-foreground hover:bg-accent/80 hover:text-foreground',
      'border border-transparent',
      isCopied &&
        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    ),
    ghost: cn(
      'text-muted-foreground hover:bg-accent hover:text-foreground',
      'border border-transparent',
      isCopied && 'text-green-600 dark:text-green-400'
    ),
    outline: cn(
      'border border-border bg-transparent text-muted-foreground',
      'hover:bg-accent hover:text-foreground',
      isCopied &&
        'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400'
    ),
  };

  return (
    <div className="group relative">
      <button
        onClick={handleCopy}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 rounded-md font-medium',
          'transition-all duration-200 focus-visible:outline-none focus-visible:ring-1',
          'focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        title={isCopied ? 'Copied!' : 'Copy to clipboard'}
        disabled={!text}
      >
        {isCopied ? (
          <Check className={cn(iconSizes[size], 'text-current')} />
        ) : (
          <Copy className={cn(iconSizes[size], 'text-current')} />
        )}

        {showText && (
          <span className="select-none">
            {children || (isCopied ? 'Copied!' : 'Copy')}
          </span>
        )}
      </button>

      {/* Tooltip */}
      <div
        className={cn(
          'absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform',
          'rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground',
          'border border-border shadow-md',
          'pointer-events-none opacity-0 transition-opacity duration-200',
          'group-hover:opacity-100 group-focus:opacity-100',
          'z-50 whitespace-nowrap'
        )}
        role="tooltip"
      >
        {isCopied ? 'Copied!' : 'Copy to clipboard'}
        <div
          className={cn(
            'absolute left-1/2 top-full -translate-x-1/2 transform',
            'border-4 border-transparent border-t-popover'
          )}
        />
      </div>

      {error && (
        <div
          className={cn(
            'absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform',
            'rounded-md bg-destructive px-2 py-1 text-xs text-destructive-foreground',
            'border border-destructive/20 shadow-md',
            'opacity-100 transition-opacity duration-200',
            'z-50 whitespace-nowrap'
          )}
        >
          {error}
          <div
            className={cn(
              'absolute left-1/2 top-full -translate-x-1/2 transform',
              'border-4 border-transparent border-t-destructive'
            )}
          />
        </div>
      )}
    </div>
  );
}

// Simplified version for inline use
export function CopyIcon({
  text,
  className,
  size = 'md',
  onCopySuccess,
  onCopyError,
}: {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onCopySuccess?: () => void;
  onCopyError?: (error: string) => void;
}) {
  return (
    <CopyButton
      text={text}
      {...(className && { className })}
      size={size}
      variant="ghost"
      showText={false}
      {...(onCopySuccess && { onCopySuccess })}
      {...(onCopyError && { onCopyError })}
    />
  );
}
