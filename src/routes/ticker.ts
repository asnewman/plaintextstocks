import type { StockData, RouteResponse } from '../shared/types';
import { generateHTMLPage, type PageMetrics } from '../shared/layout';
import { 
  formatPrice, 
  formatChange, 
  formatPercent, 
  formatVolume, 
  formatMarketCap,
  formatTimestamp 
} from '../shared/formatters';
import { fetchStockData } from '../impure/marketData';

interface ChartOptions {
  intervalMinutes?: number;  // How many minutes between dots (default: 30)
  chartHeight?: number;       // Chart height in rows (default: 12)
  showBaseline?: boolean;     // Show baseline for previous close (default: true)
  chartTitle?: string;        // Title for the chart (default: "DAY CHART (30-MIN INTERVALS)")
  maxDataPoints?: number;     // Maximum number of data points to display (default: no limit)
  formatTime?: (date: Date) => string;  // Custom time formatter
}

function generateASCIIChart(
  prices: number[], 
  timestamps: number[], 
  previousClose: number,
  options: ChartOptions = {}
): string {
  if (!prices || prices.length === 0 || !timestamps || timestamps.length === 0) return '';
  
  // Apply default options
  const {
    intervalMinutes = 30,
    chartHeight = 12,
    showBaseline = true,
    chartTitle = `DAY CHART (${intervalMinutes}-MIN INTERVALS)`,
    maxDataPoints,
    formatTime = (date: Date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2, '0')}`;
    }
  } = options;
  
  // Calculate step based on data interval (assuming 5-min data for now, make this configurable later)
  const dataIntervalMinutes = 5; // This could be calculated from timestamps or passed as option
  const step = Math.max(1, Math.floor(intervalMinutes / dataIntervalMinutes));
  
  // Sample prices at specified intervals
  const sampledIntervals: { price: number; time: string }[] = [];
  
  for (let i = 0; i < prices.length && i < timestamps.length; i += step) {
    const price = prices[i];
    const timestamp = timestamps[i];
    if (price !== null && price !== undefined && timestamp !== undefined) {
      const date = new Date(timestamp * 1000);
      const timeStr = formatTime(date);
      sampledIntervals.push({ price, time: timeStr });
      
      // Limit data points if specified
      if (maxDataPoints && sampledIntervals.length >= maxDataPoints) break;
    }
  }
  
  if (sampledIntervals.length === 0) return '';
  
  // Find min and max for scaling
  const allPrices = sampledIntervals.map(d => d.price);
  const minPrice = Math.min(...allPrices, previousClose);
  const maxPrice = Math.max(...allPrices, previousClose);
  const priceRange = maxPrice - minPrice || 1;
  
  // Create the chart grid
  const chartWidth = sampledIntervals.length * 3; // 3 chars per time slot
  const chart: string[][] = [];
  for (let i = 0; i < chartHeight; i++) {
    chart.push(new Array(chartWidth).fill(' '));
  }
  
  // Plot the baseline (previous close) if enabled
  let adjustedBaselineY = -1;
  if (showBaseline) {
    const baselineY = Math.floor(((previousClose - minPrice) / priceRange) * (chartHeight - 1));
    adjustedBaselineY = chartHeight - 1 - baselineY;
    
    // Draw baseline with dashes
    for (let x = 0; x < chartWidth; x++) {
      const baselineRow = chart[adjustedBaselineY];
      if (adjustedBaselineY >= 0 && adjustedBaselineY < chartHeight && baselineRow) {
        baselineRow[x] = '-';
      }
    }
  }
  
  // Plot the prices as dots
  for (let i = 0; i < sampledIntervals.length; i++) {
    const interval = sampledIntervals[i];
    if (!interval) continue;
    
    const price = interval.price;
    const y = Math.floor(((price - minPrice) / priceRange) * (chartHeight - 1));
    const adjustedY = chartHeight - 1 - y;
    const x = i * 3 + 1; // Center the dot in its column
    
    if (adjustedY >= 0 && adjustedY < chartHeight && chart[adjustedY]) {
      // Determine color based on movement from previous dot
      let color = 'gray';
      if (i === 0) {
        // First dot - compare to previous close
        color = price >= previousClose ? 'green' : 'red';
      } else {
        // Compare to previous interval
        const prevInterval = sampledIntervals[i - 1];
        if (prevInterval) {
          const prevPrice = prevInterval.price;
          color = price >= prevPrice ? 'green' : 'red';
        }
      }
      const dot = '●';
      
      chart[adjustedY][x] = `<span style="color: ${color};">${dot}</span>`;
      
      // Clear the baseline under the dot for better visibility
      if (showBaseline && adjustedBaselineY >= 0 && adjustedBaselineY < chartHeight && 
          adjustedBaselineY === adjustedY) {
        const baselineRow = chart[adjustedBaselineY];
        if (baselineRow) {
          if (x - 1 >= 0) baselineRow[x - 1] = ' ';
          if (x + 1 < baselineRow.length) baselineRow[x + 1] = ' ';
        }
      }
    }
  }
  
  // Add price labels
  const topPrice = maxPrice.toFixed(2);
  const bottomPrice = minPrice.toFixed(2);
  const closePrice = previousClose.toFixed(2);
  
  // Convert chart to string with labels
  let chartStr = `\n\n${chartTitle}\n`;
  chartStr += '═'.repeat(chartWidth + 12) + '\n';
  
  for (let y = 0; y < chartHeight; y++) {
    let row = '';
    
    // Add price label for top, bottom, and baseline
    if (y === 0) {
      row = topPrice.padStart(8) + ' ┤';
    } else if (showBaseline && y === adjustedBaselineY) {
      row = closePrice.padStart(8) + ' ├';
    } else if (y === chartHeight - 1) {
      row = bottomPrice.padStart(8) + ' ┤';
    } else {
      row = '         │';
    }
    
    // Add the chart data
    const chartRow = chart[y];
    if (chartRow) {
      for (let x = 0; x < chartRow.length; x++) {
        const cell = chartRow[x];
        row += cell;
      }
    }
    
    chartStr += row + '\n';
  }
  
  // Add time axis
  chartStr += '         └';
  for (let i = 0; i < chartWidth; i++) {
    chartStr += '─';
  }
  chartStr += '\n          ';
  
  // Add time labels (first, middle, last)
  for (let i = 0; i < sampledIntervals.length; i++) {
    const interval = sampledIntervals[i];
    if (interval && (i === 0 || i === sampledIntervals.length - 1 || i === Math.floor(sampledIntervals.length / 2))) {
      chartStr += interval.time.padEnd(3);
    } else {
      chartStr += '   ';
    }
  }
  chartStr += '\n';
  
  return chartStr;
}

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

  // Add the ASCII chart if we have intraday data
  if (stock.intradayPrices && stock.intradayPrices.length > 0 && stock.intradayTimestamps) {
    const previousClose = stock.price - stock.change;
    content += generateASCIIChart(stock.intradayPrices, stock.intradayTimestamps, previousClose);
  }

  return content;
}

export async function handleTickerRoute(ticker: string): Promise<RouteResponse> {
  const startTime = Date.now();
  
  // Validate ticker format
  if (!/^[A-Za-z]{1,5}$/.test(ticker)) {
    const metrics: PageMetrics = { startTime };
    return {
      html: generateHTMLPage(
        'Error - PlaintextStocks',
        `ERROR: Invalid ticker format. Use /TICKER (e.g., /AAPL)`,
        true,
        metrics
      ),
      status: 400
    };
  }

  // Fetch stock data
  const stockData = await fetchStockData(ticker.toUpperCase());
  
  if (!stockData) {
    const metrics: PageMetrics = { startTime };
    return {
      html: generateHTMLPage(
        'Error - PlaintextStocks',
        `ERROR: Unable to fetch data for ${ticker.toUpperCase()}`,
        true,
        metrics
      ),
      status: 404
    };
  }

  // Generate and return HTML
  const metrics: PageMetrics = { startTime };
  return {
    html: generateHTMLPage(
      `${stockData.symbol} - PlaintextStocks`,
      generateStockContent(stockData),
      true,
      metrics
    ),
    status: 200
  };
}