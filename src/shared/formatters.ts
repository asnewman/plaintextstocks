export function formatPrice(price: number): string {
  return price.toFixed(2).padStart(10);
}

export function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `(${sign}${change.toFixed(2)})`.padStart(10);
}

export function formatPercent(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`.padStart(10);
}

export function formatVolume(volume: number): string {
  if (volume >= 1_000_000_000) {
    return `${(volume / 1_000_000_000).toFixed(1)}B`.padStart(10);
  } else if (volume >= 1_000_000) {
    return `${(volume / 1_000_000).toFixed(1)}M`.padStart(10);
  } else if (volume >= 1_000) {
    return `${(volume / 1_000).toFixed(1)}K`.padStart(10);
  }
  return volume.toString().padStart(10);
}

export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1_000_000_000_000) {
    return `${(marketCap / 1_000_000_000_000).toFixed(2)}T`.padStart(10);
  } else if (marketCap >= 1_000_000_000) {
    return `${(marketCap / 1_000_000_000).toFixed(2)}B`.padStart(10);
  } else if (marketCap >= 1_000_000) {
    return `${(marketCap / 1_000_000).toFixed(2)}M`.padStart(10);
  }
  return marketCap.toString().padStart(10);
}

export function formatTimestamp(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/New_York',
    hour12: false
  };
  return date.toLocaleString('en-US', options) + ' ET';
}