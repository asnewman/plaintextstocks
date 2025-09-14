import type { RouteContext } from './createRouteContext';
import { pipe } from '../../../shared/transformers/pipe';
import { buildHeader } from './buildHeader';
import { buildCoreMetrics } from './buildCoreMetrics';
import { buildOptionalMetrics } from './buildOptionalMetrics';

// Function composition - each step builds upon the previous
export const assembleContent = (ctx: RouteContext): RouteContext => {
  if (!ctx.stockData) return ctx;

  return pipe(
    buildHeader,
    buildCoreMetrics,
    buildOptionalMetrics
  )(ctx);
};