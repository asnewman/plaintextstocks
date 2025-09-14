import type { HomeContext, MarketData } from './createHomeContext';

// Completely self-contained - includes all fetching logic inline
export const fetchMarketData = async (ctx: HomeContext): Promise<HomeContext> => {
  console.log("fetching market data");

  try {
    // Fetch data for major indices from Yahoo Finance
    const symbols = ['^GSPC', '^IXIC', '^DJI']; // S&P 500, NASDAQ, Dow Jones
    const fetchPromises = symbols.map(symbol => 
      fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`)
        .then(response => {
          if (!response.ok) {
            console.error(`Failed to fetch ${symbol}:`, response.status, response.statusText);
            return null;
          }
          return response.json();
        })
        .catch(error => {
          console.error(`Error fetching ${symbol}:`, error);
          return null;
        })
    );

    const results = await Promise.all(fetchPromises);
    
    // Check if we got valid results for all indices
    const validResults = results.filter((result: any) => result && result.chart?.result?.[0]);
    
    if (validResults.length < 3) {
      console.error('Failed to fetch complete market data');
      return { ...ctx, marketData: null };
    }

    // Extract data for each index
    const [sp500Result, nasdaqResult, dowResult] = results as any[];
    
    const sp500Meta = sp500Result?.chart?.result?.[0]?.meta || {};
    const nasdaqMeta = nasdaqResult?.chart?.result?.[0]?.meta || {};
    const dowMeta = dowResult?.chart?.result?.[0]?.meta || {};

    // Determine market status based on current time and market hours
    // This is a simplified version - could be enhanced with actual market calendar
    const now = new Date();
    const easternTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).format(now);
    
    const timeParts = easternTime.split(':');
    const hour = parseInt(timeParts[0] || '0', 10);
    const minute = parseInt(timeParts[1] || '0', 10);
    const currentMinutes = hour * 60 + minute;
    const marketOpen = 9 * 60 + 30; // 9:30 AM
    const marketClose = 16 * 60; // 4:00 PM
    
    let marketStatus: MarketData['marketStatus'] = 'CLOSED';
    if (currentMinutes >= marketOpen && currentMinutes < marketClose) {
      marketStatus = 'OPEN';
    } else if (currentMinutes >= 4 * 60 && currentMinutes < marketOpen) {
      marketStatus = 'PRE_MARKET';
    } else if (currentMinutes >= marketClose && currentMinutes < 20 * 60) {
      marketStatus = 'AFTER_HOURS';
    }

    const marketData: MarketData = {
      sp500: {
        symbol: 'S&P 500',
        price: sp500Meta.regularMarketPrice || 0,
        change: sp500Meta.regularMarketPrice ? (sp500Meta.regularMarketPrice - sp500Meta.previousClose) : 0,
        changePercent: sp500Meta.regularMarketPrice && sp500Meta.previousClose
          ? ((sp500Meta.regularMarketPrice - sp500Meta.previousClose) / sp500Meta.previousClose * 100)
          : 0,
      },
      nasdaq: {
        symbol: 'NASDAQ',
        price: nasdaqMeta.regularMarketPrice || 0,
        change: nasdaqMeta.regularMarketPrice ? (nasdaqMeta.regularMarketPrice - nasdaqMeta.previousClose) : 0,
        changePercent: nasdaqMeta.regularMarketPrice && nasdaqMeta.previousClose
          ? ((nasdaqMeta.regularMarketPrice - nasdaqMeta.previousClose) / nasdaqMeta.previousClose * 100)
          : 0,
      },
      dow: {
        symbol: 'Dow Jones',
        price: dowMeta.regularMarketPrice || 0,
        change: dowMeta.regularMarketPrice ? (dowMeta.regularMarketPrice - dowMeta.previousClose) : 0,
        changePercent: dowMeta.regularMarketPrice && dowMeta.previousClose
          ? ((dowMeta.regularMarketPrice - dowMeta.previousClose) / dowMeta.previousClose * 100)
          : 0,
      },
      marketStatus,
      lastUpdated: new Date(),
    };

    return { ...ctx, marketData };
  } catch (error) {
    console.error('Failed to fetch market data:', error);
    return { ...ctx, marketData: null };
  }
};