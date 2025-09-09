import type { RouteResponse } from '../shared/types';
import { generateHTMLPage } from '../shared/layout';

export function handle404Route(): RouteResponse {
  const content = `ERROR: Page not found`;

  return {
    html: generateHTMLPage('404 - PlaintextStocks', content),
    status: 404
  };
}