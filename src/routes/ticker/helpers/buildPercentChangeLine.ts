import type { RouteContext } from './createRouteContext';

export const buildPercentChangeLine = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData || !ctx.content) return ctx;

  const stock = ctx.stockData;
  
  // Inline percent formatting
  const formatPercent = (percent: number): string => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`.padStart(10);
  };

  const changeColor = stock.change >= 0 ? 'green' : 'red';
  const changeStyle = `color: ${changeColor};`;
  const content = ctx.content + `% CHANGE:  <span style="${changeStyle}">${formatPercent(stock.changePercent)}</span>\n`;

  return { ...ctx, content };
};