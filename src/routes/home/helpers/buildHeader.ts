import type { HomeContext } from './createHomeContext';

// Completely self-contained - no function calls
export const buildHeader = (ctx: HomeContext): HomeContext => {
  const headerContent = `Welcome to PlaintextStocks

Your simple, fast, text-based stock information service.`;

  return {
    ...ctx,
    content: (ctx.content || '') + headerContent
  };
};
