import type { StockData } from '../../../shared/types';

export interface RouteContext {
  ticker: string;
  startTime: number;
  isValid?: boolean;
  normalized?: string;
  stockData?: StockData | null;
  content?: string;
  error?: string;
}