import type { StockData, RouteResponse } from '../shared/types';
import { generateHTMLPage } from '../shared/layout';
import { 
  formatPrice, 
  formatChange, 
  formatPercent, 
  formatVolume, 
  formatMarketCap,
  formatTimestamp 
} from '../shared/formatters';
import { fetchStockData } from '../impure/marketData';

function generateStockContent(stock: StockData): string {
  const lastUpdateStr = formatTimestamp(stock.lastUpdated);
  
  // Determine color based on change
  const changeColor = stock.change >= 0 ? 'green' : 'red';
  const changeStyle = `color: ${changeColor};`;
  
  let content = `${stock.symbol}
Last Updated: ${lastUpdateStr}

PRICE:     ${formatPrice(stock.price)}
CHANGE:    <span style="${changeStyle}">${formatChange(stock.change)}</span>
% CHANGE:  <span style="${changeStyle}">${formatPercent(stock.changePercent)}</span>
VOLUME:    ${formatVolume(stock.volume)}`;

  if (stock.dayLow && stock.dayHigh) {
    content += `\nDAY RANGE: ${stock.dayLow.toFixed(2)} - ${stock.dayHigh.toFixed(2)}`;
  }
  
  if (stock.marketCap) {
    content += `\nMKT CAP:   ${formatMarketCap(stock.marketCap)}`;
  }
  
  if (stock.pe) {
    content += `\nP/E:       ${stock.pe.toFixed(2)}`;
  }
  
  if (stock.fiftyTwoWeekLow && stock.fiftyTwoWeekHigh) {
    content += `\n52W RANGE: ${stock.fiftyTwoWeekLow.toFixed(2)} - ${stock.fiftyTwoWeekHigh.toFixed(2)}`;
  }

  return content;
}

export async function handleTickerRoute(ticker: string): Promise<RouteResponse> {
  // Validate ticker format
  if (!/^[A-Za-z]{1,5}$/.test(ticker)) {
    return {
      html: generateHTMLPage(
        'Error - PlaintextStocks',
        `ERROR: Invalid ticker format. Use /TICKER (e.g., /AAPL)`
      ),
      status: 400
    };
  }

  // Fetch stock data
  const stockData = await fetchStockData(ticker.toUpperCase());
  
  if (!stockData) {
    return {
      html: generateHTMLPage(
        'Error - PlaintextStocks',
        `ERROR: Unable to fetch data for ${ticker.toUpperCase()}`
      ),
      status: 404
    };
  }

  // Generate and return HTML
  return {
    html: generateHTMLPage(
      `${stockData.symbol} - PlaintextStocks`,
      generateStockContent(stockData)
    ),
    status: 200
  };
}