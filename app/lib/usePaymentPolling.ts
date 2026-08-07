'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Shared by checkout (CartClient) and paid event registration (EventsClient)
// — both need to poll a status endpoint after an M-Pesa STK push until the
// customer confirms/cancels on their phone or the prompt times out.
export type PaymentPollingPhase = 'idle' | 'polling' | 'success' | 'failed' | 'timeout';

interface UsePaymentPollingOptions<T> {
  checkFn: () => Promise<T>;
  isSuccess: (result: T) => boolean;
  isFailed: (result: T) => boolean;
  intervalMs?: number;
  timeoutMs?: number;
}

export function usePaymentPolling<T>({
  checkFn,
  isSuccess,
  isFailed,
  intervalMs = 3000,
  timeoutMs = 90000,
}: UsePaymentPollingOptions<T>) {
  const [phase, setPhase] = useState<PaymentPollingPhase>('idle');
  const [lastResult, setLastResult] = useState<T | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  }, []);

  const start = useCallback(() => {
    stop();
    setPhase('polling');

    const tick = async () => {
      try {
        const result = await checkFn();
        setLastResult(result);
        if (isSuccess(result)) {
          stop();
          setPhase('success');
        } else if (isFailed(result)) {
          stop();
          setPhase('failed');
        }
      } catch {
        // A transient network error shouldn't end the poll early — keep
        // trying on the next tick until the timeout is reached.
      }
    };

    tick();
    intervalRef.current = setInterval(tick, intervalMs);
    timeoutRef.current = setTimeout(() => {
      stop();
      setPhase((current) => (current === 'polling' ? 'timeout' : current));
    }, timeoutMs);
  }, [checkFn, isSuccess, isFailed, intervalMs, timeoutMs, stop]);

  const reset = useCallback(() => {
    stop();
    setPhase('idle');
    setLastResult(null);
  }, [stop]);

  useEffect(() => stop, [stop]);

  return { phase, start, reset, lastResult };
}
