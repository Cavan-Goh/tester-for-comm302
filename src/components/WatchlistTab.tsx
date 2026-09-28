import React, { useState } from 'react';
import { MarketAsset } from '../types/market';
import { Trash2, Plus, TrendingUp, TrendingDown, Star } from 'lucide-react';

interface WatchlistTabProps {
  watchlist: MarketAsset[];
  onRemove: (assetId: string) => void;
  onSelectAsset: (asset: MarketAsset) => void;
  onOpenSearch: () => void;
}

export const WatchlistTab: React.FC<WatchlistTabProps> = ({
  watchlist,
  onRemove,
  onSelectAsset,
  onOpenSearch,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const totalValue = watchlist.reduce((acc, item) => acc + item.price, 0);
  const avgChangePercent =
    watchlist.length > 0
      ? watchlist.reduce((acc, item) => acc + item.changePercent, 0) / watchlist.length
      : 0;

  const isNetPositive = avgChangePercent >= 0;

  const filteredItems = watchlist.filter((item) => {
    if (filterType === 'all') return true;
    if (filterType === 'stocks') return item.category === 'stocks';
    if (filterType === 'indices') return item.category === 'indices' || item.category === 'world_indices';
    if (filterType === 'crypto') return item.category === 'crypto';
    return true;
  });

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[24px] font-bold text-[#131722] dark:text-white tracking-tight">
            Watchlist
          </h2>
          <span className="text-xs text-gray-400 font-medium">
            {watchlist.length} {watchlist.length === 1 ? 'symbol' : 'symbols'} tracked
          </span>
        </div>
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2962FF] text-white text-xs font-semibold hover:bg-[#1e52e0] transition-colors cursor-pointer"
          type="button"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Symbol</span>
        </button>
      </div>

      {/* Summary Stat Card */}
      {watchlist.length > 0 && (
        <div className="p-4 bg-gradient-to-br from-gray-900 to-[#131722] text-white rounded-2xl shadow-md border border-gray-800">
          <span className="text-xs text-gray-400 font-medium">Watchlist Basket Index</span>
          <div className="text-2xl font-black font-mono mt-1">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold mt-1">
            <span
              className={`flex items-center font-mono ${
                isNetPositive ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {isNetPositive ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
              {isNetPositive ? `+${avgChangePercent.toFixed(2)}%` : `${avgChangePercent.toFixed(2)}%`} (Avg Today)
            </span>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      {watchlist.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar text-xs font-semibold">
          {['all', 'stocks', 'indices', 'crypto'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-3 py-1 rounded-full capitalize cursor-pointer transition-colors ${
                filterType === tab
                  ? 'bg-[#131722] dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Watchlist List */}
      {filteredItems.length > 0 ? (
        <div className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-[#1E222D] rounded-2xl border border-gray-100 dark:border-gray-800 p-2 shadow-xs">
          {filteredItems.map((asset) => {
            const isPositive = asset.changePercent >= 0;
            return (
              <div
                key={asset.id}
                onClick={() => onSelectAsset(asset)}
                className="py-3 px-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#2A2E39] rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span
                    style={{ backgroundColor: asset.badge.bg, color: asset.badge.textColor }}
                    className="w-8 h-8 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0"
                  >
                    {asset.badge.text}
                  </span>
                  <div>
                    <div className="font-bold text-sm text-[#131722] dark:text-white leading-tight">
                      {asset.symbol}
                    </div>
                    <div className="text-[11px] text-gray-400 truncate max-w-[120px] sm:max-w-[180px]">
                      {asset.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-sm text-[#131722] dark:text-white font-mono tabular-nums">
                      {asset.currencyPrefix}
                      {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-[11px] font-bold font-mono tabular-nums ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? `+${asset.changePercent.toFixed(2)}%` : `${asset.changePercent.toFixed(2)}%`}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(asset.id);
                    }}
                    className="p-1.5 text-gray-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Remove from Watchlist"
                    type="button"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-400 space-y-3 bg-white dark:bg-[#1E222D] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <Star className="w-10 h-10 mx-auto text-amber-400 stroke-[1.5]" />
          <h3 className="font-bold text-base text-[#131722] dark:text-white">
            Your Watchlist is empty
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Star symbols from the Markets tab or tap Add Symbol to build your custom portfolio monitor.
          </p>
          <button
            onClick={onOpenSearch}
            className="px-4 py-2 rounded-xl bg-[#2962FF] text-white text-xs font-semibold cursor-pointer shadow-sm"
            type="button"
          >
            Explore Markets Now
          </button>
        </div>
      )}
    </div>
  );
};
