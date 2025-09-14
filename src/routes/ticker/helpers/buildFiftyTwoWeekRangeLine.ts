import type { RouteContext } from './createRouteContext';

export const buildFiftyTwoWeekRangeLine = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData || !ctx.content) return ctx;

  const stock = ctx.stockData;
  let content = ctx.content;

  if (stock.fiftyTwoWeekLow !== undefined && stock.fiftyTwoWeekHigh !== undefined) {
    content += `\n52W RANGE: ${stock.fiftyTwoWeekLow.toFixed(2)} - ${stock.fiftyTwoWeekHigh.toFixed(2)}`;
  }

  return { ...ctx, content };
};