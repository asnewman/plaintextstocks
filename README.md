# PlaintextStocks

A minimalist, text-based stock market information website inspired by plaintextsports.com. Pure ASCII, no JavaScript, lightning fast.

## Features

- Plain text display with monospace font
- Real-time stock data
- No images, no CSS frameworks, no client-side JavaScript

## Prerequisites

- [Bun](https://bun.sh) runtime

## Installation

```bash
# Install Bun if you haven't already
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install
```

## Running the Server

```bash
# Start the server
bun start

# Or run in watch mode (auto-restart on file changes)
bun dev
```

The server will start on http://localhost:3456

## Usage

Navigate to stock pages by ticker symbol:
- http://localhost:3456/AAPL

## Data Source

Stock data is fetched from Yahoo Finance (free, no authentication required).
