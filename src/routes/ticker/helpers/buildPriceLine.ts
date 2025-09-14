import type { RouteContext } from './createRouteContext';

export const buildPriceLine = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData || !ctx.content) return ctx;

  const stock = ctx.stockData;
  
  // Inline price formatting
  const formatPrice = (price: number): string => price.toFixed(2).padStart(10);

  const content = ctx.content + `PRICE:     ${formatPrice(stock.price)}\n`;

  return { ...ctx, content };
};