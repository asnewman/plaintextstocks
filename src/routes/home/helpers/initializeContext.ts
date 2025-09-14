import type { HomeContext } from './createHomeContext';

// Completely self-contained - no function calls
export const initializeContext = () => (_: any): HomeContext => ({
  startTime: Date.now()
});