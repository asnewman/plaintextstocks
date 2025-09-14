import type { RouteContext } from './createRouteContext';

export const buildChangeLine = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData || !ctx.content) return ctx;

  const stock = ctx.stockData;
  
  // Inline change formatting
  const formatChange = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    return `(${sign}${change.toFixed(2)})`.padStart(10);
  };

  const changeColor = stock.change >= 0 ? 'green' : 'red';
  const changeStyle = `color: ${changeColor};`;
  const content = ctx.content + `CHANGE:    <span style="${changeStyle}">${formatChange(stock.change)}</span>\n`;

  return { ...ctx, content };
};