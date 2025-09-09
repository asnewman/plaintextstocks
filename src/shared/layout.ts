export interface PageMetrics {
  startTime: number;
  dataSize?: number;
}

export function generateHTMLPage(
  title: string, 
  content: string, 
  includeHeader: boolean = true,
  metrics?: PageMetrics
): string {
  const header = includeHeader ? `plaintextstocks
================
` : '';

  // Calculate the HTML size (will be calculated after generation)
  let footer = '';
  if (metrics) {
    const renderTime = Date.now() - metrics.startTime;
    footer = `
────────────────────────────────────────────────────────────────
Generated in ${renderTime}ms | Size: [[SIZE_PLACEHOLDER]]KB`;
  }

  const html = `<!DOCTYPE html>
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
${header}${content}${footer}
</pre>
</body>
</html>`;

  // Calculate actual size and replace placeholder
  if (metrics) {
    const sizeInKB = (new TextEncoder().encode(html).length / 1024).toFixed(1);
    return html.replace('[[SIZE_PLACEHOLDER]]', sizeInKB);
  }
  
  return html;
}
