interface HtmlOptions {
  title: string;
  content: string;
  renderTime: number;
  status?: number;
}

export const generateHtml = (options: HtmlOptions): string => {
  const { title, content, renderTime } = options;
  
  const header = `plaintextstocks\n================\n`;
  const body = header + content;

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

  return html;
};