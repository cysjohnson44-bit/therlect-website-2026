import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  useDebounce,
  useThrottle,
  usePerformanceMonitor,
  useAutoMemo,
  useVirtualScroll,
  useDeduplicatedRequest,
} from './performanceOptimization';

describe('Performance Optimization Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  describe('useDebounce', () => {
    it('should debounce value changes', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 500 } }
      );

      expect(result.current).toBe('initial');

      act(() => {
        rerender({ value: 'updated', delay: 500 });
      });

      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe('updated');
    });
  });

  describe('useThrottle', () => {
    it('should throttle function calls', () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 1000));

      act(() => {
        result.current();
        result.current();
        result.current();
      });

      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      act(() => {
        result.current();
      });

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe('usePerformanceMonitor', () => {
    it('should warn on slow renders', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      renderHook(() => usePerformanceMonitor('TestComponent'));

      // 模擬慢渲染
      vi.advanceTimersByTime(20);

      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe('useAutoMemo', () => {
    it('should memoize values', () => {
      const factory = vi.fn(() => ({ value: 42 }));
      const { result, rerender } = renderHook(() => useAutoMemo(factory));

      const firstResult = result.current;
      expect(factory).toHaveBeenCalledTimes(1);

      rerender();

      const secondResult = result.current;
      expect(factory).toHaveBeenCalledTimes(1); // 不應該再次調用
      expect(firstResult).toBe(secondResult);
    });
  });

  describe('useVirtualScroll', () => {
    it('should calculate visible range correctly', () => {
      const items = Array.from({ length: 100 }, (_, i) => i);
      const { result } = renderHook(() =>
        useVirtualScroll(items, 50, 500)
      );

      expect(result.current.visibleItems.length).toBeLessThanOrEqual(10);
    });
  });

  describe('useDeduplicatedRequest', () => {
    it('should deduplicate requests', async () => {
      const requestFn = vi.fn(async () => ({ data: 'test' }));
      const { result } = renderHook(() =>
        useDeduplicatedRequest(requestFn, [])
      );

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      expect(requestFn).toHaveBeenCalledTimes(1);
    });

    it('should cache results for 5 minutes', async () => {
      const requestFn = vi.fn(async () => ({ data: 'test' }));
      const { result, rerender } = renderHook(
        ({ deps }) => useDeduplicatedRequest(requestFn, deps),
        { initialProps: { deps: [] } }
      );

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      expect(requestFn).toHaveBeenCalledTimes(1);

      rerender({ deps: [] });

      await act(async () => {
        vi.advanceTimersByTime(1000);
      });

      // 應該使用快取，不再調用
      expect(requestFn).toHaveBeenCalledTimes(1);

      // 超過 5 分鐘後應該重新請求
      rerender({ deps: [] });
      await act(async () => {
        vi.advanceTimersByTime(5 * 60 * 1000 + 1000);
      });

      expect(requestFn).toHaveBeenCalledTimes(2);
    });
  });
});
