'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  onScroll?: (scrollTop: number) => void;
  getItemKey?: (item: T, index: number) => string | number;
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className,
  onScroll,
  getItemKey = (_, index) => index,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
    onScroll?.(newScrollTop);
  }, [onScroll]);

  const visibleRange = useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleEnd = Math.min(
      visibleStart + Math.ceil(containerHeight / itemHeight),
      items.length - 1
    );

    const startIndex = Math.max(0, visibleStart - overscan);
    const endIndex = Math.min(items.length - 1, visibleEnd + overscan);

    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange.startIndex, visibleRange.endIndex]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, localIndex) => {
            const globalIndex = visibleRange.startIndex + localIndex;
            return (
              <div
                key={getItemKey(item, globalIndex)}
                style={{
                  height: itemHeight,
                  overflow: 'hidden',
                }}
              >
                {renderItem(item, globalIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Grid virtualization for components and templates
interface VirtualizedGridProps<T> {
  items: T[];
  itemWidth: number;
  itemHeight: number;
  containerWidth: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  gap?: number;
  overscan?: number;
  className?: string;
  getItemKey?: (item: T, index: number) => string | number;
}

export function VirtualizedGrid<T>({
  items,
  itemWidth,
  itemHeight,
  containerWidth,
  containerHeight,
  renderItem,
  gap = 16,
  overscan = 2,
  className,
  getItemKey = (_, index) => index,
}: VirtualizedGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const dimensions = useMemo(() => {
    const columnsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap));
    const totalRows = Math.ceil(items.length / columnsPerRow);
    const rowHeight = itemHeight + gap;

    return {
      columnsPerRow,
      totalRows,
      rowHeight,
      totalHeight: totalRows * rowHeight - gap, // Remove last gap
    };
  }, [containerWidth, itemWidth, itemHeight, gap, items.length]);

  const visibleRange = useMemo(() => {
    const visibleStartRow = Math.floor(scrollTop / dimensions.rowHeight);
    const visibleEndRow = Math.min(
      visibleStartRow + Math.ceil(containerHeight / dimensions.rowHeight),
      dimensions.totalRows - 1
    );

    const startRow = Math.max(0, visibleStartRow - overscan);
    const endRow = Math.min(dimensions.totalRows - 1, visibleEndRow + overscan);

    return { startRow, endRow };
  }, [scrollTop, dimensions, containerHeight, overscan]);

  const visibleItems = useMemo(() => {
    const startIndex = visibleRange.startRow * dimensions.columnsPerRow;
    const endIndex = Math.min(
      (visibleRange.endRow + 1) * dimensions.columnsPerRow - 1,
      items.length - 1
    );

    return items.slice(startIndex, endIndex + 1).map((item, localIndex) => ({
      item,
      globalIndex: startIndex + localIndex,
      row: Math.floor((startIndex + localIndex) / dimensions.columnsPerRow),
      column: (startIndex + localIndex) % dimensions.columnsPerRow,
    }));
  }, [items, visibleRange, dimensions.columnsPerRow]);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: dimensions.totalHeight, position: 'relative' }}>
        {visibleItems.map(({ item, globalIndex, row, column }) => (
          <div
            key={getItemKey(item, globalIndex)}
            style={{
              position: 'absolute',
              top: row * dimensions.rowHeight,
              left: column * (itemWidth + gap),
              width: itemWidth,
              height: itemHeight,
            }}
          >
            {renderItem(item, globalIndex)}
          </div>
        ))}
      </div>
    </div>
  );
}

// Hook for managing virtualization state
export function useVirtualization(itemCount: number, containerHeight: number, itemHeight: number) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const visibleEnd = Math.min(visibleStart + visibleCount, itemCount - 1);

    return {
      start: visibleStart,
      end: visibleEnd,
      count: visibleCount,
    };
  }, [scrollTop, itemHeight, containerHeight, itemCount]);

  return {
    scrollTop,
    setScrollTop,
    visibleRange,
    totalHeight: itemCount * itemHeight,
  };
}