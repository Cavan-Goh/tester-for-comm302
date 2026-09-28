export type AssetCategory = 'overview' | 'indices' | 'stocks' | 'crypto' | 'futures' | 'forex' | 'bonds';

export type NavTab = 'markets' | 'news' | 'ideas' | 'watchlist' | 'more';

export type MoversTab = 'active' | 'gainers' | 'losers' | 'volatile';

export type Timeframe = '1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL';

export interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  subtitle?: string;
  category: 'indices' | 'world_indices' | 'stocks' | 'crypto' | 'commodities' | 'forex' | 'futures';
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  currencyPrefix?: string;
  volumeStr?: string;
  badge: {
    text: string;
    bg: string;
    textColor: string;
    isIcon?: 'nvidia' | 'apple' | 'amazon' | 'us_flag' | 'btc' | 'gold' | 'custom';
  };
  sparkline: number[]; // relative points 0-100 or price trend
  stats: {
    open: number;
    high: number;
    low: number;
    prevClose: number;
    volume: string;
    avgVolume: string;
    marketCap?: string;
    peRatio?: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekLow: number;
  };
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  summary: string;
  relatedSymbol?: string;
  sentiment: 'bullish' | 'neutral' | 'bearish';
  readTime: string;
}

export interface TradingIdea {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
    isPro?: boolean;
  };
  symbol: string;
  direction: 'LONG' | 'SHORT' | 'NEUTRAL';
  timeframe: string;
  timestamp: string;
  likes: number;
  comments: number;
  description: string;
  chartImageKey?: string;
  targetPrice?: number;
}

export interface PaperTrade {
  id: string;
  symbol: string;
  name: string;
  type: 'BUY' | 'SELL';
  shares: number;
  entryPrice: number;
  timestamp: number;
}
