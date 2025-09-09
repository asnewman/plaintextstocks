import { handleHomeRoute } from '../routes/home';
import { handleTickerRoute } from '../routes/ticker';
import { handle404Route } from '../routes/404';

const PORT = process.env.PORT || 3456;

const server = Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // Home route
    if (pathname === '/') {
      const { html, status } = handleHomeRoute();
      return new Response(html, {
        status,
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // Ticker route - matches /XXXXX pattern
    const tickerMatch = pathname.match(/^\/([A-Za-z]{1,5})$/);
    if (tickerMatch) {
      const ticker = tickerMatch[1];
      const { html, status } = await handleTickerRoute(ticker);
      return new Response(html, {
        status,
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // 404 for any other routes
    const { html, status } = handle404Route();
    return new Response(html, {
      status,
      headers: { 'Content-Type': 'text/html' }
    });
  }
});

console.log(`PlaintextStocks server running at http://localhost:${PORT}/`);
console.log(`Try http://localhost:${PORT}/AAPL for Apple stock data`);