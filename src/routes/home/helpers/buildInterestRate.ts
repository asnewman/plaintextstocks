import type { HomeContext } from './createHomeContext';

// Completely self-contained - no function calls
export const buildInterestRate = (ctx: HomeContext): HomeContext => {
  if (!ctx.interestRateData) {
    const errorContent = `

Mortgage Rates:
---------------
• Unable to fetch mortgage rate data at this time
• Please try again later`;

    return {
      ...ctx,
      content: (ctx.content || '') + errorContent
    };
  }

  const { thirtyYearFixed, fifteenYearFixed, fiveOneARM } = ctx.interestRateData;
  
  // Format rates with appropriate precision
  const formatRate = (rate: number): string => `${rate.toFixed(2)}%`;

  const interestRateContent = `

Mortgage Rates:
---------------
30-Year Fixed: ${formatRate(thirtyYearFixed)}
15-Year Fixed: ${formatRate(fifteenYearFixed)}
5/1 ARM: ${formatRate(fiveOneARM)}`;

  return {
    ...ctx,
    content: (ctx.content || '') + interestRateContent
  };
};