export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  dayLow?: number;
  dayHigh?: number;
  marketCap?: number;
  pe?: number;
  fiftyTwoWeekLow?: number;
  fiftyTwoWeekHigh?: number;
  lastUpdated: Date;
}

export interface RouteResponse {
  html: string;
  status?: number;
}
