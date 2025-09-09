import type { StockData } from '../shared/types';

interface YahooQuote {
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketVolume: number;
  regularMarketDayLow: number;
  regularMarketDayHigh: number;
  marketCap: number;
  trailingPE: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
}

export async function fetchStockData(symbol: string): Promise<StockData | null> {
  try {
    // Yahoo Finance provides a simple query API that returns JSON
    // This endpoint doesn't require authentication
    const upperSymbol = symbol.toUpperCase();
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(upperSymbol)}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.error(`Failed to fetch data for ${upperSymbol}: ${response.status}`);
      return null;
    }

    const data = await response.json() as any;

    if (!data.chart?.result?.[0]) {
      console.error(`No data found for ${upperSymbol}`);
      return null;
    }

    const result = data.chart.result[0];
    const quote = result.meta;

    // Extract the data we need
    const stockData: StockData = {
      symbol: quote.symbol,
      price: quote.regularMarketPrice,
      change: quote.regularMarketPrice - quote.previousClose,
      changePercent: ((quote.regularMarketPrice - quote.previousClose) / quote.previousClose) * 100,
      volume: quote.regularMarketVolume || 0,
      dayLow: quote.regularMarketDayLow,
      dayHigh: quote.regularMarketDayHigh,
      marketCap: quote.marketCap,
      pe: quote.peRatio,
      fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
      fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
      lastUpdated: new Date()
    };

    return stockData;
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    return null;
  }
}


