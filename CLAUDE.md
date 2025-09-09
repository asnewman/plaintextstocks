# PlaintextStocks - Project Standards

## Project Overview
A minimalist, text-based stock market information website inspired by plaintextsports.com. Focus on speed, simplicity, and information density without visual clutter.

## Core Design Principles

### 1. Text-First Interface
- **NO images, icons, or graphics** - pure text display
- Monospace font (preferably system default like Courier or Consolas)
- Black text on white background (#000 on #fff)
- No animations, transitions, or hover effects
- ASCII art/characters for visual separators only (e.g., pipes |, dashes -, plus +)

### 2. Information Hierarchy
- Stock ticker symbols in CAPS (e.g., AAPL, MSFT)
- Price changes in parentheses with + or - prefix
- Percentage changes shown with % symbol
- Use spacing and indentation for visual hierarchy, not colors or fonts

### 3. Layout Standards
```
TICKER  | PRICE   | CHANGE  | %CHG   | VOLUME
--------|---------|---------|--------|----------
AAPL    | 178.23  | (+2.45) | +1.39% | 52.3M
MSFT    | 415.67  | (-1.23) | -0.30% | 18.7M
```

### 4. Page Structure
- Minimal header with site name only
- No navigation menu - single page or minimal pages
- Footer with last update timestamp only

## Technical Standards

### Backend
- **Bun.sh** - runtime and package manager
- **TypeScript** - type-safe development
- **Full HTML responses** - server returns complete HTML pages, no JSON APIs
- **Pure function isolation** - separate pure functions from side effects

### Architecture Principles
- **Pure functions** - All business logic, calculations, and HTML generation should be pure
- **Impure boundary** - Isolate API calls, database access, and I/O in a clear boundary layer
- **Functional core, imperative shell** - Pure functional core with a thin imperative shell for side effects
- Example structure:
  ```
  /pure
    - formatters.ts (number formatting, string manipulation)
    - html.ts (HTML generation functions)
    - calculations.ts (price changes, percentages)
  /impure
    - marketData.ts (API calls to fetch stock data)
    - server.ts (HTTP server, routing)
  ```

### Frontend
- **Plain HTML** - no JavaScript
- **No frameworks** - vanilla HTML/CSS only
- **No build process** - server generates HTML directly
- CSS should be inline
- Page size target: < 50KB total

### Data Display
- Times in market timezone (ET for US markets)
- Numbers right-aligned in columns
- Use fixed decimal places (2 for prices, 2 for percentages)

### Performance
- Page load time: < 200ms
- No external fonts, analytics, or tracking
- No cookies or local storage

## Content Standards

### Data Points Per Stock (when implemented)
- Ticker symbol
- Current price
- Change from previous close
- Percentage change
- Volume
- Optional: Day range (L: 175.00 H: 180.00)

### Example Layout (target design)
```
PLAINTEXT STOCKS
================
Last Updated: 2024-01-09 15:32:41 ET

MARKETS
-------
S&P 500   4783.45  (+12.34)  +0.26%
DOW       37592.98 (-45.67)  -0.12%
NASDAQ    15002.34 (+89.12)  +0.60%

TOP GAINERS
-----------
NVDA      522.34   (+45.67)  +9.58%
AMD       145.23   (+12.34)  +9.30%
TSLA      238.45   (+18.90)  +8.61%

TOP LOSERS
----------
META      353.12   (-32.45)  -8.41%
GOOG      139.23   (-10.23)  -6.84%
AMZN      155.67   (-8.90)   -5.41%
```

## Accessibility
- Semantic HTML tags (header, main, section)
- Proper table markup for data tables

## Development Guidelines
- Keep it simple - resist feature creep
- Every byte counts - optimize for size
- No dependencies unless absolutely critical
- Test on slow connections and old browsers

## What NOT to Include
- Charts or graphs
- Company logos
- User accounts or authentication
- Comments or social features
- News feeds or articles
- Historical data beyond today
- Complex filtering or sorting
- Ads or monetization
- Cookie banners or popups
- JavaScript frameworks
- CSS animations
- Custom fonts
- Dark mode (users can use browser extensions)

## Inspiration
The goal is to create the stock market equivalent of:
- plaintextsports.com

Focus on delivering information as efficiently as possible with zero visual overhead.
