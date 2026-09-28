import React, { useState, useMemo } from 'react';
import { MarketAsset } from '../types/market';
import { Search, X, TrendingUp } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allAssets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allAssets,
  onSelectAsset,
}) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredAssets = useMemo(() => {
    return allAssets.filter((asset) => {
      const matchesQuery =
        asset.symbol.toLowerCase().includes(query.toLowerCase()) ||
        asset.name.toLowerCase().includes(query.toLowerCase()) ||
        (asset.subtitle && asset.subtitle.toLowerCase().includes(query.toLowerCase()));

      if (categoryFilter === 'all') return matchesQuery;
      if (categoryFilter === 'stocks') return matchesQuery && asset.category === 'stocks';
      if (categoryFilter === 'crypto') return matchesQuery && asset.category === 'crypto';
      if (categoryFilter === 'indices')
        return matchesQuery && (asset.category === 'indices' || asset.category === 'world_indices');
      if (categoryFilter === 'commodities') return matchesQuery && asset.category === 'commodities';
      return matchesQuery;
    });
  }, [allAssets, query, categoryFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-white dark:bg-[#1E222D] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-[85vh] mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2.5">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search symbols, companies, or crypto..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-[#131722] dark:text-white placeholder:text-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#2962FF] hover:underline shrink-0 ml-1 cursor-pointer"
            type="button"
          >
            Cancel
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-3.5 py-2 border-b border-gray-100 dark:border-gray-800 flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {['all', 'stocks', 'indices', 'crypto', 'commodities'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full capitalize font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-[#131722] dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-2 divide-y divide-gray-50 dark:divide-gray-800">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => {
              const isPositive = asset.changePercent >= 0;
              return (
                <div
                  key={asset.id}
                  onClick={() => {
                    onSelectAsset(asset);
                    onClose();
                  }}
                  className="py-2.5 px-3 flex items-center justify-between rounded-xl hover:bg-gray-50 dark:hover:bg-[#2A2E39] cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{ backgroundColor: asset.badge.bg, color: asset.badge.textColor }}
                      className="w-7 h-7 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0"
                    >
                      {asset.badge.text}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-[#131722] dark:text-white leading-tight">
                        {asset.symbol}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate max-w-[180px]">
                        {asset.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-sm text-[#131722] dark:text-white font-mono tabular-nums">
                      {asset.currencyPrefix}
                      {asset.price.toFixed(2)}
                    </div>
                    <div
                      className={`text-[11px] font-bold font-mono tabular-nums ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? `+${asset.changePercent.toFixed(2)}%` : `${asset.changePercent.toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-gray-400 text-sm">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
              <p>No symbols found matching "{query}"</p>
            </div>
          )}
        </div>

        {/* Quick Trending Searches footer */}
        <div className="p-3 bg-gray-50 dark:bg-gray-900/60 border-t border-gray-100 dark:border-gray-800 text-[11px]">
          <div className="text-gray-400 font-semibold mb-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Trending Searches
          </div>
          <div className="flex gap-2">
            {['NVDA', 'BTC / USD', 'S&P 500', 'AAPL'].map((sym) => (
              <button
                key={sym}
                onClick={() => setQuery(sym)}
                className="text-[#2962FF] hover:underline cursor-pointer"
                type="button"
              >
                {sym}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
