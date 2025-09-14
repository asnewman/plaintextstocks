import type { RouteContext } from './createRouteContext';
import type { RouteResponse } from '../../../shared/types';
import { generateHtml } from '../../../shared/html/generateHtml';

// Completely self-contained - uses shared HTML generator
export const generateResponse = (ctx: RouteContext): RouteResponse => {
  // Determine which response to generate
  if (!ctx.isValid) {
    // Invalid ticker response
    const content = 'ERROR: Invalid ticker format. Use /TICKER (e.g., /AAPL)';
    const title = 'Error - PlaintextStocks';
    const renderTime = Date.now() - ctx.startTime;
    
    const html = generateHtml({ title, content, renderTime });
    return { html, status: 400 };
  }

  if (!ctx.stockData && ctx.normalized) {
    // Data fetch error response
    const content = `ERROR: Unable to fetch data for ${ctx.normalized}`;
    const title = 'Error - PlaintextStocks';
    const renderTime = Date.now() - ctx.startTime;
    
    const html = generateHtml({ title, content, renderTime });
    return { html, status: 404 };
  }

  if (ctx.stockData && ctx.content) {
    // Success response
    const title = `${ctx.stockData.symbol} - PlaintextStocks`;
    const renderTime = Date.now() - ctx.startTime;
    
    const html = generateHtml({ title, content: ctx.content, renderTime });
    return { html, status: 200 };
  }

  // Fallback error
  const content = `ERROR: Unable to fetch data for ${ctx.ticker}`;
  const title = 'Error - PlaintextStocks';
  const renderTime = Date.now() - ctx.startTime;
  
  const html = generateHtml({ title, content, renderTime });
  return { html, status: 404 };
};