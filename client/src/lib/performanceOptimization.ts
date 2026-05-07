/**
 * React 組件性能優化工具
 */

import { useMemo, useCallback, useRef, useEffect } from 'react';

/**
 * 防抖鉤子 - 延遲執行函數
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 節流鉤子 - 限制函數執行頻率
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());

  return useCallback(
    (...args: any[]) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, delay]
  ) as T;
}

/**
 * 性能監控鉤子 - 測量組件渲染時間
 */
export function usePerformanceMonitor(componentName: string) {
  const startTime = useRef(Date.now());

  useEffect(() => {
    const renderTime = Date.now() - startTime.current;
    if (renderTime > 16) { // 超過一幀時間（60fps）
      console.warn(`⚠️ ${componentName} 渲染耗時: ${renderTime}ms`);
    }
  }, [componentName]);
}

/**
 * 優化的 useMemo - 自動依賴追蹤
 */
export function useAutoMemo<T>(factory: () => T, deps: React.DependencyList = []): T {
  return useMemo(factory, deps);
}

/**
 * 虛擬滾動鉤子 - 優化長列表性能
 */
export function useVirtualScroll(
  items: any[],
  itemHeight: number,
  containerHeight: number
) {
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 10 });

  const handleScroll = useThrottle((scrollTop: number) => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.ceil((scrollTop + containerHeight) / itemHeight);
    setVisibleRange({ start, end: Math.min(end, items.length) });
  }, 100);

  return {
    visibleRange,
    visibleItems: items.slice(visibleRange.start, visibleRange.end),
    handleScroll,
  };
}

/**
 * 請求去重鉤子 - 避免重複的 API 請求
 */
export function useDeduplicatedRequest<T>(
  requestFn: () => Promise<T>,
  deps: React.DependencyList
) {
  const cacheRef = useRef<{ data: T; timestamp: number } | null>(null);
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  useEffect(() => {
    const now = Date.now();
    const cacheExpiry = 5 * 60 * 1000; // 5 分鐘快取

    if (cacheRef.current && now - cacheRef.current.timestamp < cacheExpiry) {
      setData(cacheRef.current.data);
      return;
    }

    setLoading(true);
    requestFn()
      .then((result) => {
        cacheRef.current = { data: result, timestamp: now };
        setData(result);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, deps);

  return { data, loading, error };
}

// 導入 React
import React from 'react';
