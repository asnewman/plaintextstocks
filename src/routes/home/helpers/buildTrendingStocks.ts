import type { HomeContext } from './createHomeContext';

// Completely self-contained - no function calls
export const buildTrendingStocks = (ctx: HomeContext): HomeContext => {
  const trendingStocksContent = `

Trending Stocks:
----------------
• [TO BE IMPLEMENTED] - Top gainers
• [TO BE IMPLEMENTED] - Most active
• [TO BE IMPLEMENTED] - Top losers
• [TO BE IMPLEMENTED] - Recently searched`;

  return {
    ...ctx,
    content: (ctx.content || '') + trendingStocksContent
  };
};