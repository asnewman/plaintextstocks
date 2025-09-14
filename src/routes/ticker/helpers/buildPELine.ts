import type { RouteContext } from './createRouteContext';

export const buildPELine = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData || !ctx.content) return ctx;

  const stock = ctx.stockData;
  let content = ctx.content;

  if (stock.pe !== undefined) {
    content += `\nP/E:       ${stock.pe.toFixed(2)}`;
  }

  return { ...ctx, content };
};