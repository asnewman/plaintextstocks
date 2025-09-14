import type { RouteContext } from './createRouteContext';
import type { StockData } from '../../../shared/types';

// Completely self-contained - includes all fetching logic inline
export const fetchStockData = async (ctx: RouteContext): Promise<RouteContext> => {
  console.log("fetching stock data");
  if (!ctx.isValid || !ctx.normalized) return ctx;

  try {
    // Fetch chart data from Yahoo Finance
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ctx.normalized}`);

    if (!response.ok) {
      console.error('Failed to fetch stock data:', response.status, response.statusText);
      return { ...ctx, stockData: null };
    }

    const data: any = await response.json();
    const result = data.chart?.result?.[0];

    if (!result) {
      console.error('No chart result found in response');
      return { ...ctx, stockData: null };
    }

    const meta = result.meta || {};

    // Extract data from meta object
    const stockData: StockData = {
      symbol: meta.symbol || ctx.normalized,
      price: meta.regularMarketPrice || 0,
      change: meta.regularMarketPrice ? (meta.regularMarketPrice - meta.previousClose) : 0,
      changePercent: meta.regularMarketPrice && meta.previousClose
        ? ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100)
        : 0,
      volume: meta.regularMarketVolume || 0,
      dayLow: meta.regularMarketDayLow,
      dayHigh: meta.regularMarketDayHigh,
      marketCap: undefined, // Not available in chart endpoint meta
      pe: undefined, // Not available in chart endpoint meta
      fiftyTwoWeekLow: meta.fiftyTwoWeekLow,
      fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh,
      lastUpdated: new Date(),
    };

    return { ...ctx, stockData };
  } catch (error) {
    console.error(`Failed to fetch stock data for ${ctx.normalized}:`, error);
    return { ...ctx, stockData: null };
  }
};
