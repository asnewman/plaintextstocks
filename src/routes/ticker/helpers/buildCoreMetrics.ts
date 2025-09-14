import type { RouteContext } from './createRouteContext';
import { pipe } from '../../../shared/transformers/pipe';
import { buildPriceLine } from './buildPriceLine';
import { buildChangeLine } from './buildChangeLine';
import { buildPercentChangeLine } from './buildPercentChangeLine';
import { buildVolumeLine } from './buildVolumeLine';

// Function composition - each line builder adds its content
export const buildCoreMetrics = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData || !ctx.content) return ctx;

  return pipe(
    buildPriceLine,
    buildChangeLine,
    buildPercentChangeLine,
    buildVolumeLine
  )(ctx);
};