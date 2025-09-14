import type { RouteContext } from './createRouteContext';
import type { RouteResponse } from '../../../shared/types';

// Completely self-contained - all HTML generation and response building inline
export const generateResponse = (ctx: RouteContext): RouteResponse => {
  // Determine which response to generate
  if (!ctx.isValid) {
    // Invalid ticker response - all inline
    const content = 'ERROR: Invalid ticker format. Use /TICKER (e.g., /AAPL)';
    const title = 'Error - PlaintextStocks';

    // Inline HTML generation
    const renderTime = Date.now() - ctx.startTime;
    const header = `plaintextstocks\n================\n`;
    const body = header + content;

    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
body {
  font-family: 'Courier New', Courier, monospace;
  background: #fff;
  color: #000;
  padding: 20px;
  margin: 0;
  line-height: 1.4;
}
pre { margin: 0; }
</style>
</head>
<body>
<pre>
${body}

────────────────────────────────────────────────────────────────
Generated in ${renderTime}ms | Size: [[SIZE]]KB
</pre>
</body>
</html>`;

    const sizeKB = (new TextEncoder().encode(htmlTemplate).length / 1024).toFixed(1);
    const html = htmlTemplate.replace('[[SIZE]]', sizeKB);
    return { html, status: 400 };
  }

  if (!ctx.stockData && ctx.normalized) {
    // Data fetch error response - all inline
    const content = `ERROR: Unable to fetch data for ${ctx.normalized}`;
    const title = 'Error - PlaintextStocks';

    // Inline HTML generation
    const renderTime = Date.now() - ctx.startTime;
    const header = `plaintextstocks\n================\n`;
    const body = header + content;

    const htmlTemplate2 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
body {
  font-family: 'Courier New', Courier, monospace;
  background: #fff;
  color: #000;
  padding: 20px;
  margin: 0;
  line-height: 1.4;
}
pre { margin: 0; }
</style>
</head>
<body>
<pre>
${body}

────────────────────────────────────────────────────────────────
Generated in ${renderTime}ms | Size: [[SIZE2]]KB
</pre>
</body>
</html>`;

    const sizeKB2 = (new TextEncoder().encode(htmlTemplate2).length / 1024).toFixed(1);
    const html2 = htmlTemplate2.replace('[[SIZE2]]', sizeKB2);
    return { html: html2, status: 404 };
  }

  if (ctx.stockData && ctx.content) {
    // Success response - all inline
    const title = `${ctx.stockData.symbol} - PlaintextStocks`;

    // Inline HTML generation
    const renderTime = Date.now() - ctx.startTime;
    const header = `plaintextstocks\n================\n`;
    const body = header + ctx.content;

    // Build HTML with placeholder for size
    let htmlWithPlaceholder = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
body {
  font-family: 'Courier New', Courier, monospace;
  background: #fff;
  color: #000;
  padding: 20px;
  margin: 0;
  line-height: 1.4;
}
pre { margin: 0; }
</style>
</head>
<body>
<pre>
${body}

────────────────────────────────────────────────────────────────
Generated in ${renderTime}ms | Size: [[SIZE_PLACEHOLDER]]KB
</pre>
</body>
</html>`;

    // Calculate size and replace placeholder
    const sizeInKB = (new TextEncoder().encode(htmlWithPlaceholder).length / 1024).toFixed(1);
    const html = htmlWithPlaceholder.replace('[[SIZE_PLACEHOLDER]]', sizeInKB);

    return { html, status: 200 };
  }

  // Fallback error
  const content = `ERROR: Unable to fetch data for ${ctx.ticker}`;
  const title = 'Error - PlaintextStocks';

  const renderTime = Date.now() - ctx.startTime;
  const header = `plaintextstocks\n================\n`;
  const body = header + content;

  const htmlTemplate4 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
body {
  font-family: 'Courier New', Courier, monospace;
  background: #fff;
  color: #000;
  padding: 20px;
  margin: 0;
  line-height: 1.4;
}
pre { margin: 0; }
</style>
</head>
<body>
<pre>
${body}

────────────────────────────────────────────────────────────────
Generated in ${renderTime}ms | Size: [[SIZE4]]KB
</pre>
</body>
</html>`;

  const sizeKB4 = (new TextEncoder().encode(htmlTemplate4).length / 1024).toFixed(1);
  const html4 = htmlTemplate4.replace('[[SIZE4]]', sizeKB4);
  return { html: html4, status: 404 };
};
