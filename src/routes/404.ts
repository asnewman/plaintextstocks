import type { RouteResponse } from '../shared/types';
import { generateHTMLPage, type PageMetrics } from '../shared/layout';

export function handle404Route(): RouteResponse {
  const startTime = Date.now();
  
  const content = `ERROR: Page not found`;

  const metrics: PageMetrics = { startTime };

  return {
    html: generateHTMLPage('404 - PlaintextStocks', content, true, metrics),
    status: 404
  };
}