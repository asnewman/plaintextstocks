import type { HomeContext } from './createHomeContext';

// Completely self-contained - no function calls
export const buildTickerSearch = (ctx: HomeContext): HomeContext => {
  const tickerSearchContent = `

<form onsubmit="event.preventDefault(); window.location.href='/' + document.getElementById('tickerInput').value.toUpperCase();"><input
  type="text"
  id="tickerInput"
  placeholder="Enter ticker (e.g. AAPL)"
  maxlength="5"
  pattern="[A-Za-z]{1,5}"
  required
/><button type="submit">Search</button></form>`;

  return {
    ...ctx,
    content: (ctx.content || '') + tickerSearchContent
  };
};
