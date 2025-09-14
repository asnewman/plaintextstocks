import type { RouteContext } from './createRouteContext';

// Completely self-contained - validation and normalization in one function
export const validateAndNormalize = (ctx: RouteContext): RouteContext => {
  // Inline validation logic
  const isValid = /^[A-Za-z]{1,5}$/.test(ctx.ticker);

  // Inline normalization logic
  const normalized = isValid ? ctx.ticker.toUpperCase() : undefined;

  return {
    ...ctx,
    isValid,
    normalized
  };
};
