import React, { useState } from 'react';
import { MarketAsset, MoversTab } from '../types/market';
import {
  MARKET_MOVERS_ACTIVE,
  MARKET_MOVERS_GAINERS,
  MARKET_MOVERS_LOSERS,
  MARKET_MOVERS_VOLATILE,
} from '../data/marketData';

interface MarketMoversProps {
  onSelect: (asset: MarketAsset) => void;
  onSeeAll?: () => void;
}

export const MarketMovers: React.FC<MarketMoversProps> = ({ onSelect, onSeeAll }) => {
  const [activeTab, setActiveTab] = useState<MoversTab>('active');

  const getMoversList = (): MarketAsset[] => {
    switch (activeTab) {
      case 'gainers':
        return MARKET_MOVERS_GAINERS;
      case 'losers':
        return MARKET_MOVERS_LOSERS;
      case 'volatile':
        return MARKET_MOVERS_VOLATILE;
      case 'active':
      default:
        return MARKET_MOVERS_ACTIVE;
    }
  };

  const movers = getMoversList();

  return (
    <section className="mt-6 px-4" data-purpose="market-movers-section">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[20px] font-bold text-[#131722] dark:text-white tracking-tight">
          Market movers
        </h2>
        <button
          onClick={onSeeAll}
          className="text-xs font-semibold text-[#2962FF] hover:underline cursor-pointer focus:outline-none"
          type="button"
        >
          See all
        </button>
      </div>

      {/* Segmented Tab Controls */}
      <div className="flex p-1 bg-[#F0F3FA] dark:bg-[#1E222D] rounded-xl mb-4 text-[13px] font-medium transition-colors">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-1.5 text-center rounded-lg font-semibold transition-all cursor-pointer ${
            activeTab === 'active'
              ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-white shadow-sm'
              : 'text-[#787B86] dark:text-gray-400 hover:text-[#131722] dark:hover:text-white'
          }`}
          type="button"
        >
          Most active
        </button>
        <button
          onClick={() => setActiveTab('gainers')}
          className={`flex-1 py-1.5 text-center rounded-lg font-semibold transition-all cursor-pointer ${
            activeTab === 'gainers'
              ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-white shadow-sm'
              : 'text-[#787B86] dark:text-gray-400 hover:text-[#131722] dark:hover:text-white'
          }`}
          type="button"
        >
          Gainers
        </button>
        <button
          onClick={() => setActiveTab('losers')}
          className={`flex-1 py-1.5 text-center rounded-lg font-semibold transition-all cursor-pointer ${
            activeTab === 'losers'
              ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-white shadow-sm'
              : 'text-[#787B86] dark:text-gray-400 hover:text-[#131722] dark:hover:text-white'
          }`}
          type="button"
        >
          Losers
        </button>
        <button
          onClick={() => setActiveTab('volatile')}
          className={`flex-1 py-1.5 text-center rounded-lg font-semibold transition-all cursor-pointer ${
            activeTab === 'volatile'
              ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-white shadow-sm'
              : 'text-[#787B86] dark:text-gray-400 hover:text-[#131722] dark:hover:text-white'
          }`}
          type="button"
        >
          Volatile
        </button>
      </div>

      {/* Movers Stock List */}
      <div className="divide-y divide-[#F0F3FA] dark:divide-gray-800">
        {movers.map((item) => {
          const isPositive = item.changePercent >= 0;

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#1E222D]/60 active:bg-gray-100 dark:active:bg-[#1E222D] rounded-xl px-1.5 transition-colors cursor-pointer select-none"
            >
              {/* Left Column: Icon + Ticker + Name */}
              <div className="flex items-center gap-3">
                <div
                  style={{ backgroundColor: item.badge.bg, color: item.badge.textColor }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-xs"
                >
                  {item.badge.text}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[15px] text-[#131722] dark:text-white leading-tight">
                    {item.symbol}
                  </div>
                  <div className="text-[12px] text-[#787B86] dark:text-gray-400 truncate max-w-[130px] sm:max-w-[200px]">
                    {item.name}
                  </div>
                </div>
              </div>

              {/* Right Column: Price + Volume + Change Pill */}
              <div className="text-right flex items-center gap-3">
                <div className="text-right">
                  <div className="font-bold text-[15px] text-[#131722] dark:text-white font-mono tabular-nums">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-[#9598A1] dark:text-gray-500 font-mono">
                    {item.volumeStr}
                  </div>
                </div>

                <span
                  className={`w-20 py-1.5 rounded-lg text-xs font-bold text-center block font-mono tabular-nums transition-transform active:scale-95 ${
                    isPositive
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#089981]'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-[#F23645]'
                  }`}
                >
                  {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
