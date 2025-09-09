import type { RouteResponse } from '../shared/types';
import { generateHTMLPage } from '../shared/layout';

export function handleHomeRoute(): RouteResponse {
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

  return {
    html: generateHTMLPage('PlaintextStocks', content),
    status: 200
  };
}