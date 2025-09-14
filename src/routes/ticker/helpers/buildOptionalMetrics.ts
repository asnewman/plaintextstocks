import type { RouteContext } from './createRouteContext';
import { pipe } from '../../../shared/transformers/pipe';
import { buildDayRangeLine } from './buildDayRangeLine';
import { buildMarketCapLine } from './buildMarketCapLine';
import { buildPELine } from './buildPELine';
import { buildFiftyTwoWeekRangeLine } from './buildFiftyTwoWeekRangeLine';

// Function composition - each optional metric builder adds its content if data exists
export const buildOptionalMetrics = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData || !ctx.content) return ctx;

  return pipe(
    buildDayRangeLine,
    buildMarketCapLine,
    buildPELine,
    buildFiftyTwoWeekRangeLine
  )(ctx);
};