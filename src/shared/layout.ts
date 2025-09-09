export function generateHTMLPage(title: string, content: string, includeHeader: boolean = true): string {
  const header = includeHeader ? `plaintextstocks.com
================
` : '';

  return `<!DOCTYPE html>
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
${header}${content}
</pre>
</body>
</html>`;
}
