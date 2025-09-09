import type { RouteResponse } from '../shared/types';
import { generateHTMLPage, type PageMetrics } from '../shared/layout';

export function handleHomeRoute(): RouteResponse {
  const startTime = Date.now();
  
  const content = `Enter a ticker symbol in the URL to view stock data.

Examples:
  /AAPL  - Apple Inc.
  /MSFT  - Microsoft Corporation
  /GOOGL - Alphabet Inc.
  /AMZN  - Amazon.com Inc.
  /TSLA  - Tesla Inc.
  /META  - Meta Platforms Inc.
  /NVDA  - NVIDIA Corporation

Source: Yahoo Finance (delayed quotes)`;

  const metrics: PageMetrics = { startTime };

  return {
    html: generateHTMLPage('PlaintextStocks', content, true, metrics),
    status: 200
  };
}