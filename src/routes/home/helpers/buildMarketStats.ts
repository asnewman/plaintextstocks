import type { HomeContext } from './createHomeContext';

// Completely self-contained - no function calls
export const buildMarketStats = (ctx: HomeContext): HomeContext => {
  if (!ctx.marketData) {
    const errorContent = `

Market Overview:
----------------
• Unable to fetch market data at this time
• Please try again later`;

    return {
      ...ctx,
      content: (ctx.content || '') + errorContent
    };
  }

  const { sp500, nasdaq, dow, marketStatus } = ctx.marketData;

  // Format numbers with appropriate precision and color
  const formatPrice = (price: number): string => price.toFixed(2);
  const formatChangeWithColor = (change: number): string => {
    const sign = change >= 0 ? '+' : '';
    const changeColor = change >= 0 ? 'green' : 'red';
    const changeStyle = `color: ${changeColor};`;
    return `<span style="${changeStyle}">${sign}${change.toFixed(2)}</span>`;
  };
  const formatPercentWithColor = (percent: number): string => {
    const sign = percent >= 0 ? '+' : '';
    const changeColor = percent >= 0 ? 'green' : 'red';
    const changeStyle = `color: ${changeColor};`;
    return `<span style="${changeStyle}">${sign}${percent.toFixed(2)}%</span>`;
  };

  // Market status display
  const statusDisplay = {
    'OPEN': '🟢 OPEN',
    'CLOSED': '🔴 CLOSED',
    'PRE_MARKET': '🟡 PRE-MARKET',
    'AFTER_HOURS': '🟡 AFTER-HOURS'
  }[marketStatus] || '⚪ UNKNOWN';

  const marketStatsContent = `

Market Overview:
----------------
Market Status: ${statusDisplay}

${sp500.symbol}: ${formatPrice(sp500.price)}
  Change: ${formatChangeWithColor(sp500.change)} (${formatPercentWithColor(sp500.changePercent)})

${nasdaq.symbol}: ${formatPrice(nasdaq.price)}
  Change: ${formatChangeWithColor(nasdaq.change)} (${formatPercentWithColor(nasdaq.changePercent)})

${dow.symbol}: ${formatPrice(dow.price)}
  Change: ${formatChangeWithColor(dow.change)} (${formatPercentWithColor(dow.changePercent)})`;

  return {
    ...ctx,
    content: (ctx.content || '') + marketStatsContent
  };
};
