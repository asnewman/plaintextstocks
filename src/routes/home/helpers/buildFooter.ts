import type { HomeContext } from './createHomeContext';

// Completely self-contained - no function calls
export const buildFooter = (ctx: HomeContext): HomeContext => {
  const footerContent = `


About:
------
PlaintextStocks provides fast, lightweight stock information in plain text format.
No ads, no tracking, no JavaScript - just the data you need.

Built for speed and simplicity.`;

  return {
    ...ctx,
    content: (ctx.content || '') + footerContent
  };
};