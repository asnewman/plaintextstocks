import type { HomeContext, InterestRateData } from './createHomeContext';

// Scrape mortgage rate data from Mortgage News Daily only
export const fetchInterestRateData = async (ctx: HomeContext): Promise<HomeContext> => {
  console.log("fetching mortgage interest rate data from Mortgage News Daily");

  try {
    const response = await fetch('https://www.mortgagenewsdaily.com/mortgage-rates', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache'
      },
      method: 'GET'
    });

    if (!response.ok) {
      const errorMessage = `Mortgage News Daily returned ${response.status}: ${response.statusText}`;
      console.error(errorMessage);
      return { 
        ...ctx, 
        interestRateData: null,
        error: ctx.error ? `${ctx.error}; ${errorMessage}` : errorMessage
      };
    }

    const html = await response.text();
    
    // Parse rates from the header navbar section
    const thirtyYearMatch = html.match(/<div class="product">30YR Fixed Rate<\/div>\s*<div class="price">(\d+\.\d{2})%<\/div>/i);
    const fifteenYearMatch = html.match(/<div class="product">15YR Fixed Rate<\/div>\s*<div class="price">(\d+\.\d{2})%<\/div>/i);
    
    // Also try alternative parsing patterns in case the structure varies
    const thirtyYearAlt = html.match(/30YR Fixed Rate[^>]*?(\d+\.\d{2})%/i);
    const fifteenYearAlt = html.match(/15YR Fixed Rate[^>]*?(\d+\.\d{2})%/i);
    
    const thirtyYearRate = thirtyYearMatch?.[1] || thirtyYearAlt?.[1];
    const fifteenYearRate = fifteenYearMatch?.[1] || fifteenYearAlt?.[1];
    
    // Validate that we got at least the 30-year rate (most important)
    if (!thirtyYearRate) {
      const errorMessage = 'Failed to parse 30-year fixed rate from Mortgage News Daily';
      console.error(errorMessage);
      return { 
        ...ctx, 
        interestRateData: null,
        error: ctx.error ? `${ctx.error}; ${errorMessage}` : errorMessage
      };
    }
    
    const parsedThirtyYear = parseFloat(thirtyYearRate);
    const parsedFifteenYear = fifteenYearRate ? parseFloat(fifteenYearRate) : null;
    
    // Validate rates are reasonable (between 1% and 20%)
    if (parsedThirtyYear < 1 || parsedThirtyYear > 20) {
      const errorMessage = `30-year rate ${parsedThirtyYear}% is outside reasonable range`;
      console.error(errorMessage);
      return { 
        ...ctx, 
        interestRateData: null,
        error: ctx.error ? `${ctx.error}; ${errorMessage}` : errorMessage
      };
    }
    
    if (parsedFifteenYear && (parsedFifteenYear < 1 || parsedFifteenYear > 20)) {
      const errorMessage = `15-year rate ${parsedFifteenYear}% is outside reasonable range`;
      console.error(errorMessage);
      return { 
        ...ctx, 
        interestRateData: null,
        error: ctx.error ? `${ctx.error}; ${errorMessage}` : errorMessage
      };
    }

    const interestRateData: InterestRateData = {
      thirtyYearFixed: parsedThirtyYear,
      fifteenYearFixed: parsedFifteenYear || parsedThirtyYear - 0.5, // Estimate if not found
      fiveOneARM: parsedThirtyYear - 0.75, // Estimate ARM rate as typically lower
      lastUpdated: new Date(),
    };

    console.log('Successfully scraped mortgage rates from Mortgage News Daily:', interestRateData);
    return { ...ctx, interestRateData };
    
  } catch (error) {
    const errorMessage = `Failed to fetch mortgage rates from Mortgage News Daily: ${(error as Error).message}`;
    console.error(errorMessage);
    return { 
      ...ctx, 
      interestRateData: null,
      error: ctx.error ? `${ctx.error}; ${errorMessage}` : errorMessage
    };
  }
};