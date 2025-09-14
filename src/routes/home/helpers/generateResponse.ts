import type { HomeContext } from './createHomeContext';
import type { RouteResponse } from '../../../shared/types';
import { generateHtml } from '../../../shared/html/generateHtml';

// Completely self-contained - uses shared HTML generator
export const generateResponse = (ctx: HomeContext): RouteResponse => {
  if (ctx.error) {
    // Error response
    const content = `ERROR: ${ctx.error}`;
    const title = 'Error - PlaintextStocks';
    const renderTime = Date.now() - ctx.startTime;
    
    const html = generateHtml({ title, content, renderTime });
    return { html, status: 500 };
  }

  if (ctx.content) {
    // Success response
    const title = 'PlaintextStocks - Simple Stock Information';
    const renderTime = Date.now() - ctx.startTime;
    
    const html = generateHtml({ title, content: ctx.content, renderTime });
    return { html, status: 200 };
  }

  // Fallback error
  const content = `ERROR: Unable to generate home page`;
  const title = 'Error - PlaintextStocks';
  const renderTime = Date.now() - ctx.startTime;
  
  const html = generateHtml({ title, content, renderTime });
  return { html, status: 500 };
};