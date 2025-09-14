import type { RouteContext } from './createRouteContext';

export const buildMarketCapLine = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData || !ctx.content) return ctx;

  const stock = ctx.stockData;
  let content = ctx.content;

  if (stock.marketCap !== undefined) {
    // Inline market cap formatting
    const formatMarketCap = (marketCap: number): string => {
      if (marketCap >= 1_000_000_000_000) {
        return `${(marketCap / 1_000_000_000_000).toFixed(2)}T`.padStart(10);
      } else if (marketCap >= 1_000_000_000) {
        return `${(marketCap / 1_000_000_000).toFixed(2)}B`.padStart(10);
      } else if (marketCap >= 1_000_000) {
        return `${(marketCap / 1_000_000).toFixed(2)}M`.padStart(10);
      }
      return marketCap.toString().padStart(10);
    };

    content += `\nMKT CAP:   ${formatMarketCap(stock.marketCap)}`;
  }

  return { ...ctx, content };
};