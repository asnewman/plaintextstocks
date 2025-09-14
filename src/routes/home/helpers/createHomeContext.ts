export interface MarketData {
  sp500: {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
  };
  nasdaq: {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
  };
  dow: {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
  };
  marketStatus: 'OPEN' | 'CLOSED' | 'PRE_MARKET' | 'AFTER_HOURS';
  lastUpdated: Date;
}

export interface InterestRateData {
  thirtyYearFixed: number;
  fifteenYearFixed: number;
  fiveOneARM: number;
  lastUpdated: Date;
}

export interface HomeContext {
  startTime: number;
  marketData?: MarketData | null;
  interestRateData?: InterestRateData | null;
  content?: string;
  error?: string;
}