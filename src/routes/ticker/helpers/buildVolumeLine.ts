import type { RouteContext } from './createRouteContext';

export const buildVolumeLine = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData || !ctx.content) return ctx;

  const stock = ctx.stockData;
  
  // Inline volume formatting
  const formatVolume = (volume: number): string => {
    if (volume >= 1_000_000_000) {
      return `${(volume / 1_000_000_000).toFixed(1)}B`.padStart(10);
    } else if (volume >= 1_000_000) {
      return `${(volume / 1_000_000).toFixed(1)}M`.padStart(10);
    } else if (volume >= 1_000) {
      return `${(volume / 1_000).toFixed(1)}K`.padStart(10);
    }
    return volume.toString().padStart(10);
  };

  const content = ctx.content + `VOLUME:    ${formatVolume(stock.volume)}`;

  return { ...ctx, content };
};