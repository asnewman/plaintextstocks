import type { RouteContext } from './createRouteContext';

// Completely self-contained - no function calls
export const initializeContext = (ticker: string) => (_: any): RouteContext => ({
  ticker,
  startTime: Date.now(),
  isValid: false
});
