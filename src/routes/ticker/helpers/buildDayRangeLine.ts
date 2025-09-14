import type { RouteContext } from './createRouteContext';

export const buildDayRangeLine = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData || !ctx.content) return ctx;

  const stock = ctx.stockData;
  let content = ctx.content;

  if (stock.dayLow !== undefined && stock.dayHigh !== undefined) {
    content += `\nDAY RANGE: ${stock.dayLow.toFixed(2)} - ${stock.dayHigh.toFixed(2)}`;
  }

  return { ...ctx, content };
};