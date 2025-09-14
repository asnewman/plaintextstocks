import type { RouteContext } from './createRouteContext';

export const buildHeader = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData) return ctx;

  const stock = ctx.stockData;
  
  // Inline timestamp formatting
  const formatTimestamp = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/New_York',
      hour12: false
    };
    return date.toLocaleString('en-US', options) + ' ET';
  };

  const content = `${stock.symbol}\nLast Updated: ${formatTimestamp(stock.lastUpdated)}\n\n`;

  return { ...ctx, content };
};